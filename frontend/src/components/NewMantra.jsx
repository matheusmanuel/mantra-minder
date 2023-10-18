import React from 'react';
import Header from "./Header";
import { NavLink } from 'react-router-dom';
const NewMantra = () => {
    return (
        <>
            <Header />
            <div className="container m-center-auto">
                <NavLink to="/">
                    <button className='btn-01'>voltar</button>
                </NavLink>
                <div className='form-mantra'>
                    <h3>Crie seu próximo Mantra</h3>
                    <form>
                        <div className="form-item">
                            <label htmlFor="mantra-title">Título do seu Mantra</label>
                            <input type="text" placeholder='Título do seu Mantra' id='mantra-title' required/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="mantra-text">O Mantra em Si</label>
                            <textarea name="" required placeholder='O seu mantra' id="mantra-text"></textarea>
                        </div>
                        <div className="form-item d-flex align-items-center">
                            <label>
                                <input type="checkbox" className='d-none' defaultChecked/>
                                <div className="check d-flex align-items-center"></div>
                            </label>
                            <p>Tocar o mantra quando o computador iniciar.</p>
                        </div>
                        <div className="form-item d-flex align-items-center">
                            <label>
                                <input type="checkbox" className='d-none' />
                                <div className="check d-flex align-items-center"></div>
                            </label>
                            <p>Desabilitar/habilitar a exibição do mantra.</p>
                        </div>
                        <div className="form-item">
                            <label htmlFor="time">Hora do dia para tocar a 🔔 notificação </label>
                            <input type="time" id='time' required/>
                        </div>
                        <button className='btn-00'>Inserir Mantra</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewMantra;