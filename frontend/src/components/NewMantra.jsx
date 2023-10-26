import React from 'react';
import Header from "./Header";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const NewMantra = () => {
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:4350/mantra/insert/';
    const handleSubmit = async (e) => {
        e.preventDefault();

        let mantraTitle = document.getElementById('mantra-title').value,
            mantraText = document.getElementById('mantra-text').value,
            displayTime = document.getElementById('time').value,
            checkIsActive = document.getElementById('is-active'),
            checkPlayOnStartup = document.getElementById('play-on-startup');
        let isActive = checkIsActive.checked ? 1 : 0;
        let playOnStartup = checkPlayOnStartup.checked ? 1 : 0;

        const checkDuplicateDisplayTime = () => {
            const baseUrl = 'http://localhost:4350/mantra/check/duplicate/displaytime';

            return axios.post(baseUrl, { displayTime })
                .then((response) => {
                    if (response.status === 200) {
                        return true;
                    } else if (response.status === 400) {
                        return false;
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error('Erro de resposta do servidor:', error.response.data);
                    } else if (error.request) {
                        console.error('Sem resposta do servidor. Verifique a conexão ou a URL da API.');
                    } else {
                        console.error('Erro ao configurar a solicitação:', error.message);
                    }
                    return false;
                });
        };

        if (await checkDuplicateDisplayTime()) {
            let promise = axios.post(baseUrl, {
                mantraTitle,
                mantraText,
                displayTime,
                isActive,
                playOnStartup,
            }).then((response) => {
                if (response.status == 200) {
                    navigate('/');
                }
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

            toast.promise(promise, {
                loading: 'Carregando...',
                success: 'Mantra cadastrado com sucesso',
                error: 'Erro ao cadastrar um mantra',
                duration: 5000

            });
        } else {
            toast.error('Horário já em uso, escolha outro', {
                duration: 8000
            });
            
        }

    }

    return (
        <>
            <Header />
            <div className="container m-center-auto">
                <NavLink to="/">
                    <button className='btn-01'>voltar</button>
                </NavLink>
                <div className='form-mantra'>
                    <h3>Crie seu próximo Mantra</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-item">
                            <label htmlFor="mantra-title">Título do seu Mantra</label>
                            <input type="text" placeholder='Título do seu Mantra' id='mantra-title' required />
                        </div>
                        <div className="form-item">
                            <label htmlFor="mantra-text">O Mantra em Si</label>
                            <textarea name="" required placeholder='O seu mantra' id="mantra-text"></textarea>
                        </div>
                        <div className="form-item d-flex align-items-center">
                            <label>
                                <input type="checkbox" className='d-none' id='play-on-startup' defaultChecked />
                                <div className="check d-flex align-items-center"></div>
                            </label>
                            <p>Tocar o mantra quando o computador iniciar.</p>
                        </div>
                        <div className="form-item d-flex align-items-center">
                            <label>
                                <input type="checkbox" className='d-none' id='is-active' />
                                <div className="check d-flex align-items-center"></div>
                            </label>
                            <p>Desabilitar/habilitar a exibição do mantra.</p>
                        </div>
                        <div className="form-item">
                            <label htmlFor="time">Horário para tocar a 🔔 notificação </label>
                            <input type="time" id='time' required />
                        </div>
                        <button className='btn-00'>Inserir Mantra</button>
                    </form>
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default NewMantra;