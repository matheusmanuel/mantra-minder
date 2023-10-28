const path = require("path");
const { app, BrowserWindow, shell } = require("electron");
const isDev = process.env.IS_DEV == "true" ? true : false;

require("../../backend/src/index.js");
const pushNotificationMantras = require("../src/scripts/pushNotificationMantras.js");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  mainWindow.maximize();
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();
  setInterval(pushNotificationMantras.searchMantrasByDisplayTime, 60000);
  pushNotificationMantras.searchMantrasByPlayOnStartup();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
