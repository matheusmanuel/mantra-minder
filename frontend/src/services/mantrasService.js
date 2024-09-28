import axios from "axios";
import { environment } from "../environments/environments";

function getAllMantras() {
  const baseURL = `${environment.apiUrl}/mantras`;

  return axios
    .get(baseURL)
    .then((response) => {
      return response.data;
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
}

const editMantra = function (MantraData) {
  const baseURL = `${environment.apiUrl}/mantra/update/`;

  return axios
    .put(baseURL, MantraData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Erro ao atualizar o mantra:", error);
    });
};

const insertMantra = function (mantra) {
  const baseURL = `${environment.apiUrl}/mantra/insert/`;

  return axios
    .post(baseURL, mantra)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // Tratamentos de erros
      if (error.response) {
        console.error("Erro de resposta do servidor: ", error.response.data);
      } else if (error.request) {
        console.error(
          "Sem resposta do servidor. Verifique a conexão ou a URL da API."
        );
      } else {
        console.error("Erro ao configurar a solicitação:", error.message);
      }
    });
};
const updateVisibleMantra = function (id, newIsActive) {
  const baseURL = `${environment.apiUrl}/mantra/a/${id}`;
  return axios
    .post(baseURL, { isActive: newIsActive })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      if (error.response) {
        console.error("Erro de resposta do servidor: ", error.response.data);
      } else if (error.request) {
        console.error(
          "Sem resposta do servidor. Verifique a conexão ou a URL da API."
        );
      } else {
        console.error("Erro ao configurar a solicitação:", error.message);
      }
    });
};

const deleteMantra = function (id) {
  const baseURL = `${environment.apiUrl}/mantra`;

  return axios
    .post(baseURL, { mantraID: parseInt(id) })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      // Tratamentos de erros
      if (error.response) {
        console.error("Erro de resposta do servidor: ", error.response.data);
      } else if (error.request) {
        console.error(
          "Sem resposta do servidor. Verifique a conexão ou a URL da API."
        );
      } else {
        console.error("Erro ao configurar a solicitação:", error.message);
      }
    });
};

const getMantra = function (id) {
  const baseURL = `${environment.apiUrl}/mantra/${id}`;
  return axios.get(baseURL).then(
    (response) => {
      return response;
    },
    (err) => {
      console.error("Erro ao buscar o mantra: ", err);
      return null;
    }
  );
};

export {
  getAllMantras,
  deleteMantra,
  editMantra,
  updateVisibleMantra,
  insertMantra,
  getMantra,
};
