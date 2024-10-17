import React from 'react';
import Header from "./Header";
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const NewMantra = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        let mantraTitle = document.getElementById('mantra-title').value;
        let mantraText = document.getElementById('mantra-text').value;
        let displayTime = document.getElementById('time').value;
        let checkIsActive = document.getElementById('is-active');
        let checkPlayOnStartup = document.getElementById('play-on-startup');
        
        let isActive = checkIsActive.checked ? 1 : 0;
        let playOnStartup = checkPlayOnStartup.checked ? 1 : 0;
      
        // Usando a nova função do Electron
        const promise = window.electron.insertMantra({
            mantraTitle,
            mantraText,
            displayTime,
            isActive,
            playOnStartup
        }).then((response) => {
            console.log('response: ', response);
            if (response) {
                navigate('/'); 
            }
        }).catch((error) => {
            console.error('Error ao cadastrar um mantra: ', error);
            toast.error('Erro ao cadastrar um mantra');
        });
      
        toast.promise(promise, {
            loading: 'Carregando...',
            success: 'Mantra cadastrado com sucesso',
            error: 'Erro ao cadastrar um mantra',
            duration: 5000
        });
    };


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
                            <p>Tocar o mantra quando o Aplicativo iniciar.</p>
                        </div>
                        <div className="form-item d-flex align-items-center">
                            <label>
                                <input type="checkbox" className='d-none' id='is-active' />
                                <div className="check d-flex align-items-center"></div>
                            </label>
                            <p>Habilitar a exibição do mantra.</p>
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
    )
}

export default NewMantra;