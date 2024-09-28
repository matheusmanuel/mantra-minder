import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { deleteMantra, updateVisibleMantra } from "../services/mantrasService";

const Mantra = (props) => {
  const allConfigBox = document.querySelectorAll(".config-box");

  document.body.addEventListener("click", (e) => {
    let configBoxImg = e.target.classList.contains("config-icon")
      ? e.target
      : "";

    if (!(e.target == configBoxImg)) {
      allConfigBox.forEach((configBox) => {
        configBox.classList.remove("open");
      });
    }
  });

  const handleVisibleConfigBox = (e) => {
    e.target.classList.toggle('rotate');
    let configBox = e.target.parentElement.querySelector(".config-box");

    allConfigBox.forEach((configBoxs) => {
      configBoxs == configBox ? "" : configBoxs.classList.remove("open");
    });

    configBox.classList.toggle("open");
  };

  const handleDeleteMantra = (e) => {
    let modalDelete = document.querySelector(".modal-delete");
    modalDelete.classList.add("open");
    let delteteMantraBtn = document.querySelector(".delete-mantra-btn");
    let id = e.target.getAttribute("id");

    delteteMantraBtn.addEventListener("click", () => {
      if (id) {
        deleteMantra(id).then((status) => {
          if (status === 200) {
            window.location.reload(false);
            modalDelete.classList.remove("open");
          }
        });
      }
    });
  };

  const handleVisibleMantra = (e) => {
    let id = e.target.id;
    let newIsActive = e.target.checked ? 1 : 0;
   
    let promise = updateVisibleMantra(id, newIsActive).then((status) => {
        if (status === 200) {
          console.log("status alterado");
        } else {
          toast.error("Erro ao editar o status do mantra");
        }
    });

    toast.promise(promise, {
      loading: "Carregando...",
      success: "status alterado com sucesso",
      error: "Erro ao editar o status do mantra",
    });
  };

  return (
    <div className="mantra">
      <p className="mantra-title">{props.title}</p>
      <p className="mantra-text">{props.text}</p>
      <div className="mantra-footer d-flex align-items-center ">
        <div className="config">
          <img
            src="/assets/img/settings.svg"
            className="config-icon"
            onClick={handleVisibleConfigBox}
            alt="setting"
          />
          <div className="config-box">
            <div
              className="d-flex align-items-center justify-content-center"
              id={props.id}
              onClick={handleDeleteMantra}
            >
              apagar
            </div>
            <Link to={`/update/${props.id}`}>
              <div className="d-flex align-items-center justify-content-center">
                editar
              </div>
            </Link>
          </div>
        </div>
        <label>
          <input
            type="checkbox"
            onClick={handleVisibleMantra}
            className="d-none"
            id={props.id}
            defaultChecked={props.active == 0 ? "" : "checked"}
          />
          <div className="check d-flex align-items-center"></div>
        </label>
        <div className="time d-flex">
          <img src="/assets/img/timer.svg" alt="time" />
          <p>{props.time}</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Mantra;
