import React, { useEffect, useState } from 'react';
import Mantra from './Mantra';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://localhost:4350/mantras';

const Mantras = () => {
    const [post, setpost] = useState(null);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setpost(response.data);
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
    }, []);

    console.log(post);

    return (
        <main className='container m-center-auto main-container'>
            <NavLink to="/new">
                <button className='btn-00'>Criar Mantra</button>
            </NavLink>
            <div className='mantra-container d-flex flex-wrap '>
                {post && post.map((mantra, index) => (
                    <Mantra key={index} id={mantra.mantraID} title={mantra.mantraTitle} text={mantra.mantraText} time={mantra.displayTime} active={mantra.isActive} />
                ))}
            </div>
        </main>
    );
}

export default Mantras;