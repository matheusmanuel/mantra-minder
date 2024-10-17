/* eslint-disable no-undef */
const { app } = require("electron");
const makeConnection = require("../db/db");
const notifier = require("node-notifier");
const path = require("path");
let db;
let shownMantraIds = [];

const iconPath = app.isPackaged
  ? path.join(process.resourcesPath, "logo.ico")
  : path.join(__dirname, "logo.ico");

// Função que envia uma notificação
function sendNotification(mantraTitle, mantraText) {
  notifier.notify({
    title: mantraTitle,
    message: mantraText,
    icon: iconPath,
    sound: true,
    wait: true,
  });
}

async function getAllMantras() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Mantras";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Erro ao buscar mantras:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function getMantras() {
  db = makeConnection();
  let mantras = await getAllMantras();
  let mantrasByDisplayTime = filterMantrasByDisplayTime(getHour(), mantras);
  if (mantrasByDisplayTime.length > 0) {
    mantrasByDisplayTime.forEach((mantra) => {
      if (!isMantraIdDisplayed(shownMantraIds, mantra.mantraID)) {
        sendNotification(mantra.mantraTitle,mantra.mantraText);
        shownMantraIds.push(mantra.mantraID);
      }
    });
  }
}

async function getMantrasByPlayOnStartup() {
  db = makeConnection();
  let mantras = await getAllMantras();
  let mantrasByPlayOnStartup = filterMantrasByPlayOnStartup(mantras);
  if (mantrasByPlayOnStartup.length > 0) {
    mantrasByPlayOnStartup.forEach((mantra) => {
      if (!isMantraIdDisplayed(shownMantraIds, mantra.mantraID)) {
        sendNotification(mantra.mantraTitle,mantra.mantraText);
      }
    });
  }
}

function filterMantrasByDisplayTime(displayTime, mantras) {
  return mantras.filter(
    (mantra) => mantra.displayTime === displayTime && mantra.isActive === 1
  );
}

function filterMantrasByPlayOnStartup (mantras) {
  return mantras.filter(
    (mantra) => mantra.playOnStartup === 1 && mantra.isActive === 1
  );
}


// Se algum mantra com o mesmo id foi exibido, retorna true, caso contrário, false.
function isMantraIdDisplayed(mantraIds, id) {
  let mantras = mantraIds.filter((mantraId) => mantraId == id);
  if (mantras.length > 0) {
    return true;
  } else {
    return false;
  }
}

function getHour() {
  let today = new Date();
  let hours = String(today.getHours()).padStart(2, "0");
  let minutes = String(today.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

sendNotification("Mantra Minder","Hora de praticar seu mantra!");
getMantras();
getMantrasByPlayOnStartup();
setInterval(getMantras, 1000);