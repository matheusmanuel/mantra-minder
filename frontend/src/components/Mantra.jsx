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
    e.target.classList.toggle("rotate");
    let configBox = e.target.parentElement.querySelector(".config-box");

    allConfigBox.forEach((configBoxs) => {
      configBoxs == configBox ? "" : configBoxs.classList.remove("open");
    });

    configBox.classList.toggle("open");
  };

  const handleDeleteMantra = (e) => {
    let modalDelete = document.querySelector(".modal-delete");
    modalDelete.classList.add("open");
    let deleteMantraBtn = document.querySelector(".delete-mantra-btn");
    let id = e.target.getAttribute("id");
  
    deleteMantraBtn.addEventListener("click", async () => {
      if (id) {
        try {
          const status = await window.electron.deleteMantra(id); // Usando a função exposta
  
          if (status) {
            window.location.reload(false);
            modalDelete.classList.remove("open");
          }
        } catch (error) {
          console.error("Erro ao deletar o mantra: ", error);
          toast.error("Erro ao deletar o mantra");
        }
      }
    });
  };

  const handleVisibleMantra = (e) => {
    let id = e.target.id;
    let newIsActive = e.target.checked ? 1 : 0;
  
    const promise = window.electron.updateVisibleMantra({ mantraId: id, isActive: newIsActive }) // Usando a função exposta
      .then((status) => {
        if (status) {
          // console.log("status alterado");
        } else {
          toast.error("Erro ao editar o status do mantra");
        }
      })
      .catch((error) => {
        console.error("Erro ao editar o status do mantra: ", error);
        toast.error("Erro ao editar o status do mantra");
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
          <svg
            className="config-icon"
            onClick={handleVisibleConfigBox}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="fi:settings" clip-path="url(#clip0_29_692)">
              <path
                id="Vector"
                d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                stroke="#2B2B2C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M14.55 11.25C14.4502 11.4762 14.4204 11.7271 14.4645 11.9704C14.5086 12.2137 14.6246 12.4382 14.7975 12.615L14.8425 12.66C14.982 12.7993 15.0926 12.9647 15.1681 13.1468C15.2436 13.3289 15.2824 13.5241 15.2824 13.7213C15.2824 13.9184 15.2436 14.1136 15.1681 14.2957C15.0926 14.4778 14.982 14.6432 14.8425 14.7825C14.7032 14.922 14.5378 15.0326 14.3557 15.1081C14.1736 15.1836 13.9784 15.2224 13.7812 15.2224C13.5841 15.2224 13.3889 15.1836 13.2068 15.1081C13.0247 15.0326 12.8593 14.922 12.72 14.7825L12.675 14.7375C12.4982 14.5646 12.2737 14.4486 12.0304 14.4045C11.7871 14.3604 11.5362 14.3902 11.31 14.49C11.0882 14.5851 10.899 14.7429 10.7657 14.9442C10.6325 15.1454 10.561 15.3812 10.56 15.6225V15.75C10.56 16.1478 10.402 16.5294 10.1207 16.8107C9.83936 17.092 9.45782 17.25 9.06 17.25C8.66218 17.25 8.28064 17.092 7.99934 16.8107C7.71804 16.5294 7.56 16.1478 7.56 15.75V15.6825C7.55419 15.4343 7.47384 15.1935 7.32938 14.9915C7.18493 14.7896 6.98305 14.6357 6.75 14.55C6.52379 14.4502 6.27286 14.4204 6.02956 14.4645C5.78626 14.5086 5.56176 14.6246 5.385 14.7975L5.34 14.8425C5.20069 14.982 5.03526 15.0926 4.85316 15.1681C4.67106 15.2436 4.47587 15.2824 4.27875 15.2824C4.08163 15.2824 3.88644 15.2436 3.70434 15.1681C3.52224 15.0926 3.35681 14.982 3.2175 14.8425C3.07804 14.7032 2.9674 14.5378 2.89191 14.3557C2.81642 14.1736 2.77757 13.9784 2.77757 13.7812C2.77757 13.5841 2.81642 13.3889 2.89191 13.2068C2.9674 13.0247 3.07804 12.8593 3.2175 12.72L3.2625 12.675C3.4354 12.4982 3.55139 12.2737 3.5955 12.0304C3.63962 11.7871 3.60984 11.5362 3.51 11.31C3.41493 11.0882 3.25707 10.899 3.05585 10.7657C2.85463 10.6325 2.61884 10.561 2.3775 10.56H2.25C1.85218 10.56 1.47064 10.402 1.18934 10.1207C0.908035 9.83936 0.75 9.45782 0.75 9.06C0.75 8.66218 0.908035 8.28064 1.18934 7.99934C1.47064 7.71804 1.85218 7.56 2.25 7.56H2.3175C2.56575 7.55419 2.8065 7.47384 3.00847 7.32938C3.21045 7.18493 3.36429 6.98305 3.45 6.75C3.54984 6.52379 3.57962 6.27286 3.5355 6.02956C3.49139 5.78626 3.3754 5.56176 3.2025 5.385L3.1575 5.34C3.01804 5.20069 2.9074 5.03526 2.83191 4.85316C2.75642 4.67106 2.71757 4.47587 2.71757 4.27875C2.71757 4.08163 2.75642 3.88644 2.83191 3.70434C2.9074 3.52224 3.01804 3.35681 3.1575 3.2175C3.29681 3.07804 3.46224 2.9674 3.64434 2.89191C3.82644 2.81642 4.02163 2.77757 4.21875 2.77757C4.41587 2.77757 4.61106 2.81642 4.79316 2.89191C4.97526 2.9674 5.14069 3.07804 5.28 3.2175L5.325 3.2625C5.50176 3.4354 5.72626 3.55139 5.96956 3.5955C6.21285 3.63962 6.46379 3.60984 6.69 3.51H6.75C6.97183 3.41493 7.16101 3.25707 7.29427 3.05585C7.42753 2.85463 7.49904 2.61884 7.5 2.3775V2.25C7.5 1.85218 7.65804 1.47064 7.93934 1.18934C8.22064 0.908035 8.60218 0.75 9 0.75C9.39782 0.75 9.77936 0.908035 10.0607 1.18934C10.342 1.47064 10.5 1.85218 10.5 2.25V2.3175C10.501 2.55884 10.5725 2.79463 10.7057 2.99585C10.839 3.19707 11.0282 3.35493 11.25 3.45C11.4762 3.54984 11.7271 3.57962 11.9704 3.5355C12.2137 3.49139 12.4382 3.3754 12.615 3.2025L12.66 3.1575C12.7993 3.01804 12.9647 2.9074 13.1468 2.83191C13.3289 2.75642 13.5241 2.71757 13.7213 2.71757C13.9184 2.71757 14.1136 2.75642 14.2957 2.83191C14.4778 2.9074 14.6432 3.01804 14.7825 3.1575C14.922 3.29681 15.0326 3.46224 15.1081 3.64434C15.1836 3.82644 15.2224 4.02163 15.2224 4.21875C15.2224 4.41587 15.1836 4.61106 15.1081 4.79316C15.0326 4.97526 14.922 5.14069 14.7825 5.28L14.7375 5.325C14.5646 5.50176 14.4486 5.72626 14.4045 5.96956C14.3604 6.21285 14.3902 6.46379 14.49 6.69V6.75C14.5851 6.97183 14.7429 7.16101 14.9442 7.29427C15.1454 7.42753 15.3812 7.49904 15.6225 7.5H15.75C16.1478 7.5 16.5294 7.65804 16.8107 7.93934C17.092 8.22064 17.25 8.60218 17.25 9C17.25 9.39782 17.092 9.77936 16.8107 10.0607C16.5294 10.342 16.1478 10.5 15.75 10.5H15.6825C15.4412 10.501 15.2054 10.5725 15.0042 10.7057C14.8029 10.839 14.6451 11.0282 14.55 11.25V11.25Z"
                stroke="#2B2B2C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29_692">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

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
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Timer">
              <path
                id="Vector"
                d="M9 2.8125C7.66498 2.8125 6.35994 3.20838 5.2499 3.95008C4.13987 4.69178 3.27471 5.74599 2.76382 6.97939C2.25292 8.21279 2.11925 9.56999 2.3797 10.8794C2.64015 12.1887 3.28303 13.3915 4.22703 14.3355C5.17104 15.2795 6.37377 15.9223 7.68314 16.1828C8.99252 16.4433 10.3497 16.3096 11.5831 15.7987C12.8165 15.2878 13.8707 14.4226 14.6124 13.3126C15.3541 12.2026 15.75 10.8975 15.75 9.5625C15.748 7.77292 15.0361 6.05722 13.7707 4.79179C12.5053 3.52636 10.7896 2.81455 9 2.8125ZM9 15.1875C7.88748 15.1875 6.79995 14.8576 5.87492 14.2395C4.94989 13.6214 4.22892 12.7429 3.80318 11.7151C3.37744 10.6873 3.26604 9.55626 3.48309 8.46512C3.70013 7.37397 4.23586 6.37169 5.02253 5.58502C5.8092 4.79835 6.81148 4.26262 7.90262 4.04558C8.99376 3.82854 10.1248 3.93993 11.1526 4.36568C12.1804 4.79142 13.0589 5.51239 13.677 6.43742C14.2951 7.36244 14.625 8.44998 14.625 9.5625C14.6233 11.0538 14.0302 12.4836 12.9756 13.5381C11.9211 14.5927 10.4913 15.1858 9 15.1875ZM12.2105 6.35203C12.2628 6.40427 12.3043 6.46631 12.3326 6.5346C12.3609 6.60288 12.3754 6.67608 12.3754 6.75C12.3754 6.82392 12.3609 6.89712 12.3326 6.9654C12.3043 7.03369 12.2628 7.09573 12.2105 7.14797L9.39797 9.96047C9.34571 10.0127 9.28367 10.0542 9.21538 10.0825C9.1471 10.1108 9.07391 10.1253 9 10.1253C8.92609 10.1253 8.85291 10.1108 8.78462 10.0825C8.71634 10.0542 8.6543 10.0127 8.60203 9.96047C8.54977 9.90821 8.50832 9.84616 8.48003 9.77788C8.45175 9.7096 8.43719 9.63641 8.43719 9.5625C8.43719 9.48859 8.45175 9.4154 8.48003 9.34712C8.50832 9.27884 8.54977 9.21679 8.60203 9.16453L11.4145 6.35203C11.4668 6.29973 11.5288 6.25824 11.5971 6.22994C11.6654 6.20163 11.7386 6.18706 11.8125 6.18706C11.8864 6.18706 11.9596 6.20163 12.0279 6.22994C12.0962 6.25824 12.1582 6.29973 12.2105 6.35203ZM6.75 1.125C6.75 0.975816 6.80927 0.832742 6.91476 0.727252C7.02024 0.621763 7.16332 0.5625 7.3125 0.5625H10.6875C10.8367 0.5625 10.9798 0.621763 11.0853 0.727252C11.1907 0.832742 11.25 0.975816 11.25 1.125C11.25 1.27418 11.1907 1.41726 11.0853 1.52275C10.9798 1.62824 10.8367 1.6875 10.6875 1.6875H7.3125C7.16332 1.6875 7.02024 1.62824 6.91476 1.52275C6.80927 1.41726 6.75 1.27418 6.75 1.125Z"
                fill="black"
              />
            </g>
          </svg>
          <p>{props.time}</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Mantra;
