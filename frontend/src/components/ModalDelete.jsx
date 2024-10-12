import React from "react";
const ModalDelete = () => {
  return (
    <div className="modal-delete d-flex align-items-center justify-content-center">
      <div className="modal-inner">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="alert-circle">
            <path
              id="Icon"
              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="#D92D20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        <p className="modal-inner-title">Apagar o mantra!</p>
        <p className="modal-inner-text">
          Tem certeza de que deseja excluir este matra? Essa ação não pode ser
          desfeita.
        </p>
        <div className="d-flex justify-content-between">
          <button
            onClick={(e) => {
              e.target.parentElement.parentElement.parentElement.classList.remove(
                "open"
              );
            }}
          >
            cancelar
          </button>
          <button className="delete-mantra-btn">Apagar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
