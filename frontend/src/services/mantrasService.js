import axios from "axios"
import { environment } from '../environments/environments';

function getAllMantras() {
    const baseURL = `${environment.apiUrl}/mantras`;

    return axios.get(baseURL).then((response) => {
        return response.data;
    }).catch((error) => {
        // Tratamento de erros
        if (error.response) {
            // O servidor retornou um status de resposta diferente de 2xx
            console.error('Erro de resposta do servidor:', error.response.data);
        } else if (error.request) {
            // A solicitação foi feita, mas não houve resposta do servidor
            console.error('Sem resposta do servidor. Verifique a conexão ou a URL da API.');
        } else {
            // Um erro ocorreu durante a configuração da solicitação
            console.error('Erro ao configurar a solicitação:', error.message);
        }
    });
}

const editMantra = function(){

}

const deleteMantra = function(){

}

export {
    getAllMantras,
    deleteMantra,
    editMantra
}