
import React from 'react';
const ModalDelete = () => {
    return (
        <div className='modal-delete d-flex align-items-center justify-content-center'>
            <div className="modal-inner">
                <img src="/assets/img/alert-circle.svg" alt="alert circle" />
                <p className="modal-inner-title">Apagar o mantra!</p>
                <p className="modal-inner-text">Tem certeza de que deseja excluir este matra? Essa ação não pode ser desfeita.</p>
                <div className='d-flex justify-content-between'>
                    <button onClick={(e)=>{e.target.parentElement.parentElement.parentElement.classList.remove('open')}}>cancelar</button>
                    <button className='delete-mantra-btn'>Apagar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalDelete;