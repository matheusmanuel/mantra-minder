import React from 'react';
import Header from "./Header";
import { NavLink } from 'react-router-dom';
const UpdateMantra = () => {
    return (
        <>
            <Header />
            <div className="container m-center-auto">
                <NavLink to="/">
                    <button className='btn-01'>voltar</button>
                </NavLink>
                <div className='form-mantra'>
                    <h3>Editar o mantra ‘Plenitude financeira’</h3>
                    <form>
                        <div className="form-item">
                            <label htmlFor="mantra-title">Título do seu Mantra</label>
                            <input type="text" placeholder='Título do seu Mantra' id='mantra-title' value='Plenitude financeira' required/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="mantra-text">O Mantra em Si</label>
                            <textarea name="" required placeholder='O seu mantra' id="mantra-text" value='Minhas finanças são um reflexo da minha clareza mental. Eu tomo decisões sábias e mantenho meu equilíbrio financeiro.'></textarea>
                        </div>
                        <div className="form-item d-flex align-items-center">
                            <label>
                                <input type="checkbox" className='d-none' />
                                <div className="check d-flex align-items-center"></div>
                            </label>
                            <p>Tocar o mantra quando o computador iniciar.</p>
                        </div>
                        <div className="form-item d-flex align-items-center">
                            <label>
                                <input type="checkbox" className='d-none' defaultChecked/>
                                <div className="check d-flex align-items-center"></div>
                            </label>
                            <p>Desabilitar/habilitar a exibição do mantra.</p>
                        </div>
                        <div className="form-item">
                            <label htmlFor="time">Hora do dia para tocar a 🔔 notificação </label>
                            <input type="time" id='time'value='22:01'  required/>
                        </div>
                        <button className='btn-00'>Salvar o Mantra</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateMantra;