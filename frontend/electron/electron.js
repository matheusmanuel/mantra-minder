/* eslint-disable no-undef */
const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
require('./notification');
const isDev = process.env.IS_DEV == "true" ? true : false;
const { initIPC, db } = require("./ipcHandlers");

let mainWindow;
let tray;

function createWindow() {
  initIPC();

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, "../logo.ico"),
  });
  mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // Open the DevTools.

  if (isDev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:4351");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide(); // Esconde a janela em vez de fechá-la
    }
  });

   // Configurar o tray icon (ícone na bandeja)
   tray = new Tray(path.join(__dirname, '../logo.ico')); // Escolha seu ícone aqui
 
   const contextMenu = Menu.buildFromTemplate([
     { label: 'Mostrar Mantra Minder', click: () => mainWindow.show() },
     { label: 'Sair', click: () => {
       app.isQuitting = true;
       app.quit();
     }},
   ]);
   tray.setContextMenu(contextMenu);
   tray.setToolTip('Mantra Minder está rodando');
}


app.on('ready', () => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (db) db.close();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
