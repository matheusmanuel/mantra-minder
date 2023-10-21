import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Mantra = (props) => {
    const allConfigBox = document.querySelectorAll('.config-box');

    document.body.addEventListener('click', (e) => {
        let configBoxImg = e.target.classList.contains('config-icon')?e.target:'';

        if (!(e.target == configBoxImg)) {
            allConfigBox.forEach((configBox) => {
                configBox.classList.remove('open');
            });
        }
    });

    const handleVisibleConfigBox = (e) => {
        let configBox = e.target.parentElement.querySelector('.config-box');

        allConfigBox.forEach((configBoxs) => {
            configBoxs == configBox ? '' : configBoxs.classList.remove('open');
        });

        configBox.classList.toggle('open');
    }

    const handleDeleteMantra = (e) => {
        let modalDelete = document.querySelector('.modal-delete');
        modalDelete.classList.add('open');
        let delteteMantraBtn = document.querySelector('.delete-mantra-btn');
        let id = e.target.getAttribute('id');

        delteteMantraBtn.addEventListener('click', () => {
            if (id) {
                const BASE_URL_D = 'http://localhost:4350/mantra';
                axios.post(BASE_URL_D, {'mantraID':parseInt(id)}).then(response => {
                    if (response.status === 200) {
                        window.location.reload(false);
                        modalDelete.classList.remove('open');
                    }
                }).catch((error) => {
                    // Tratamentos de erros
                    if (error.response) {
                        console.error('Erro de resposta do servidor: ', error.response.data);
                    } else if (error.request) {
                        console.error('Sem resposta do servidor. Verifique a conexão ou a URL da API.');
                    } else {
                        console.error('Erro ao configurar a solicitação:', error.message);
                    }
                })
            }
        });
    }

    return (
        <div className='mantra'>
            <p className="mantra-title">{props.title}</p>
            <p className="mantra-text">{props.text}</p>
            <div className="mantra-footer d-flex align-items-center ">
                <div className='config'>
                    <img src="/assets/img/settings.svg" className='config-icon' onClick={handleVisibleConfigBox} alt="setting" />
                    <div className='config-box'>
                        <div className='d-flex align-items-center justify-content-center' id={props.id} onClick={handleDeleteMantra}>apagar</div>
                        <Link to={`/update/${props.id}`}><div className='d-flex align-items-center justify-content-center'>editar</div></Link>
                    </div>
                </div>
                <label>
                    <input type="checkbox" className='d-none' defaultChecked={props.active == 0 ? '' : 'checked'} />
                    <div className="check d-flex align-items-center"></div>
                </label>
                <div className='time d-flex'>
                    <img src="/assets/img/timer.svg" alt="time" />
                    <p>{props.time}</p>
                </div>
            </div>
        </div>
    );
}

export default Mantra;