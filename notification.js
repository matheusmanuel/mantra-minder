const notifier = require("node-notifier");
const path = require("path");
require("./backend/src/index.js");
const axios = require("axios");
const API_URL = "http://localhost:4350";
let mantras = [],
  shownMantraIds = [];

// Função que envia uma notificação
function sendNotification(mantra) {
  notifier.notify({
    title: "Mantra Minder",
    message: mantra,
    icon: path.join(__dirname, "icon.png"),
    sound: true,
    // wait: true, // Manter a notificação até que seja fechada manualmente
  });
}

function getAllmantras() {
  axios
    .get(`${API_URL}/mantras`)
    .then((response) => {
      mantras = response.data;
      // console.log('minutes: ', getHour());
      let mantrasByDisplayTime = filterMantrasByDisplayTime(getHour(), mantras);

      if (mantrasByDisplayTime.length > 0) {
        mantrasByDisplayTime.forEach((mantra) => {
          if (!isMantraIdDisplayed(shownMantraIds, mantra.mantraID)) {
            sendNotification(mantra.mantraText);
            shownMantraIds.push(mantra.mantraID);
          }
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar todos os mantras: ", error);
    });
}

// Exemplo de uso
sendNotification("Hora de praticar seu mantra!");
getAllmantras();

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

setInterval(getAllmantras, 1000);