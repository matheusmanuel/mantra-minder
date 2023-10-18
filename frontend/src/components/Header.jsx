import React from 'react';

const Header = () => {
    return (
        <header className='container-header m-center-auto d-flex justify-content-between'>
            <div className='logo d-flex align-items-center'>
                <img src='/assets/img/logo.svg' width='94px'/> 
                <p>Mantra Minder -Afirmações para a Alma</p>
            </div>
            <div className='copy'>
                <p>Desenvolvido com 💖 por <a target='_blank' href="https://matheusmanuel.netlify.app">Matheus Manuel</a></p>
                <div className='links d-flex align-items-center justify-content-end'>
                    <a target='_blank' href="https://youtube.com/matheusmanuel/">
                        <img src="/assets/img/youtube.svg" alt="youtube" />
                    </a>
                    <a target='_blank' href="https://github.com/matheusmanuel/">
                        <img src="/assets/img/github.svg" alt="github" />
                    </a>
                    <a target='_blank' href="https://instagram.com/matheusmanuel/">
                        <img src="/assets/img/instagram.svg" alt="instagram" />
                    </a>
                    <a target='_blank' href="https://matheusmanuel.netlify.app">
                        <img src="/assets/img/globo.svg" alt="website" />
                    </a>
                </div>
            </div>
        </header>
    );
}
 
export default Header;