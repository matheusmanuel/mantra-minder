/* eslint-disable no-undef */
const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const AutoLaunch = require('auto-launch');
const isDev = process.env.IS_DEV == "true" ? true : false;
const { initIPC, db } = require("./ipcHandlers");

let mainWindow;
let tray;

function createWindow() {
  initIPC();

  mainWindow = new BrowserWindow({
    width: 1080,
    height: 610,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, "../logo.ico"),
  });
  // mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:4351");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    addInSheelApps();
  }

  mainWindow.on("close", (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Configurar o tray icon (ícone na bandeja)
  tray = new Tray(path.join(__dirname, "logo.ico"));

  const contextMenu = Menu.buildFromTemplate([
    { label: "Mostrar Mantra Minder", click: () => mainWindow.show() },
    {
      label: "Sair",
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Mantra Minder está rodando");
}

function addInSheelApps(){
  const mantraMinderAutoLauncher = new AutoLaunch({
    name: 'Mantra Minder',
    path: app.getPath('exe'),
  });
  
  mantraMinderAutoLauncher.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
      mantraMinderAutoLauncher.enable();
    }
  });
}

app.on("ready", () => {
  createWindow();
  
  if (process.platform === 'win32') {
    app.setLoginItemSettings({
      openAtLogin: true, // Inicia com o sistema
      openAsHidden: true // Inicia escondido
    });
  }

  require("./notification");
});

app.on("window-all-closed", function () {
  if (db) db.close();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});