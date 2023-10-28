const axios = require("axios");
const { Notification } = require("electron");
const path = require("path");

function getCurrentHourMinutes() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

function pushNotification(title, mantra) {
  new Notification({
    title: title,
    body: mantra,
    icon: path.join(__dirname, "../public/assets/img/logo.svg"),
  }).show();
}

const searchMantrasByDisplayTime = () => {
  pushNotification("teste", "mantra de test");
  let displayTime = getCurrentHourMinutes();
  axios
    .post("http://localhost:4350/mantras/search/displayTime", { displayTime })
    .then((response) => {
      if (response.status == 200) {
        if (response.data) {
          alert('t: ', response.data.mantraTitle);
          pushNotification(response.data.mantraTitle, response.data.mantraText);
        }
      }
    })
    .catch((error) => {
      // Tratamento de erros
      if (error.response) {
        // O servidor retornou um status de resposta diferente de 2xx
        console.error("Erro de resposta do servidor:", error.response.data);
      } else if (error.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        console.error(
          "Sem resposta do servidor. Verifique a conexão ou a URL da API."
        );
      } else {
        // Um erro ocorreu durante a configuração da solicitação
        console.error("Erro ao configurar a solicitação:", error.message);
      }
    });
};

const searchMantrasByPlayOnStartup = () => {
  axios
    .get("http://localhost:4350/mantras/search/playOnStartup")
    .then((response) => {
      if (response.status == 200) {
        if (response.data) {
          pushNotification(response.data.mantraTitle, response.data.mantraText);
        }
      }
    })
    .catch((error) => {
      if (error.response) {
        // O servidor retornou um status de resposta diferente de 2xx
        console.error("Erro de resposta do servidor:", error.response.data);
      } else if (error.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        console.error(
          "Sem resposta do servidor. Verifique a conexão ou a URL da API."
        );
      } else {
        // Um erro ocorreu durante a configuração da solicitação
        console.error("Erro ao configurar a solicitação:", error.message);
      }
    });
};

module.exports = {
  searchMantrasByDisplayTime,
  searchMantrasByPlayOnStartup
}
