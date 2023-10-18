import React from 'react';
import Mantra from './Mantra';
import { NavLink } from 'react-router-dom';

const Mantras = () => {
    return (
        <main className='container m-center-auto main-container'>
            <NavLink to="/new">
                <button className='btn-00'>Criar Mantra</button>
            </NavLink>
            <div className='mantra-container d-flex flex-wrap '>
                <Mantra title="Título do meu mantra" text="Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="00:10" active={0} />
                <Mantra title="Título do meu mantra 2" text="2Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={1} />
                <Mantra title="Título do meu mantra 3" text="3Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={0} />
                <Mantra title="Título do meu mantra 4" text="4Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={1} />
                <Mantra title="Título do meu mantra 4" text="4Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={1} />
                <Mantra title="Título do meu mantra" text="Hoje será ddddddddddddddddddddddddddddddddum dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="00:10" active={0} />
                <Mantra title="Título do meu mantra 2" text="2Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={1} />
                <Mantra title="Título do meu mantra 2" text="2Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={1} />
                <Mantra title="Título do meu mantra 2" text="2Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={1} />
                <Mantra title="Título do meu mantra 3" text="3Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={0} />
                <Mantra title="Título do meu mantra 4" text="4Hoje será um dia. Estou sã e salvo. Tudo está bem. Tenho gratidão" time="10:10" active={1} />
            </div>
        </main>
    );
}

export default Mantras;