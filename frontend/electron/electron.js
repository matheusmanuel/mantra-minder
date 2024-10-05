/* eslint-disable no-undef */
const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = process.env.IS_DEV == "true" ? true : false;

const { initIPC, db } = require("./ipcHandlers");

let mainWindow;

function createWindow() {
  initIPC();

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, "logo.ico"),
  });
  mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  console.log(isDev);
  if (isDev) {
    mainWindow.loadURL("http://localhost:4351");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  const win = createWindow();
});

app.on("window-all-closed", function () {
  if (db) db.close();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
