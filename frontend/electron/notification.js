/* eslint-disable no-undef */
const notifier = require("node-notifier");
const path = require("path");
const makeConnection = require("../db/db");
let db;
let shownMantraIds = [];

// Função que envia uma notificação
function sendNotification(mantraTitle, mantraText) {
  notifier.notify({
    title: mantraTitle,
    message: mantraText,
    icon: path.join(__dirname, "logo.ico"),
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

function filterMantrasByDisplayTime(displayTime, mantras) {
  return mantras.filter(
    (mantra) => mantra.displayTime === displayTime && mantra.isActive === 1
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
setInterval(getMantras, 1000);