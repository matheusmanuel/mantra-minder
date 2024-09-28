import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editMantra, getMantra } from "../services/mantrasService";

const UpdateMantra = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  let [MantraData, setMantraData] = useState({
    mantraTitle: "",
    mantraText: "",
    isActive: 0,
    playOnStartup: 0,
    displayTime: "",
    mantraID: undefined,
  });

  const [mantraTitleOriginal, setMantraTitleOriginal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let promise = editMantra(MantraData).then((response)=>{
        if(response.status === 200) {
            navigate('/');
        }
    },((error)=>{
        console.error('Error ao cadastrar um mantra: ', error);
        toast.error('Erro ao cadastrar um mantra');
    }))

    toast.promise(promise, {
      loading: "Carregando...",
      success: "Mantra editado",
      error: "Erro ao editar um mantra",
    });
  };

  useEffect(() => {

   getMantra(id).then((response)=>{
    if (response.status == 204) {
        navigate("/");
      } else if(response.status === 200){
        setMantraData(response.data);
        setIsCheckedPlayOnStartup(response.data.playOnStartup === 1);
        setIsCheckedActive(response.data.isActive === 1);
        setMantraTitleOriginal(response.data.mantraTitle);
      }else{
        console.log("Erro ao buscar os dados do mantra: ");
      }
   },(error) => {
    console.log("Erro ao buscar os dados do mantra:", error);
  });

  }, [id]);

  const [isCheckedPlayOnStartup, setIsCheckedPlayOnStartup] = useState();
  const [isCheckedIsActive, setIsCheckedActive] = useState();

  const handleCheckboxChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.checked ? 1 : 0;

    if (targetName === "playOnStartup") {
      setIsCheckedPlayOnStartup(event.target.checked);
      setMantraData((mantra) => ({
        ...mantra,
        playOnStartup: targetValue,
      }));
    } else if (targetName === "isActive") {
      setIsCheckedActive(event.target.checked);
      setMantraData((mantra) => ({
        ...mantra,
        isActive: targetValue,
      }));
    }
  };

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMantraData({ ...MantraData, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="container m-center-auto">
        <NavLink to="/">
          <button className="btn-01">voltar</button>
        </NavLink>
        <div className="form-mantra">
          <h3>Editar o mantra ‘{mantraTitleOriginal}’</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <label htmlFor="mantra-title">Título do seu Mantra</label>
              <input
                type="text"
                placeholder="Título do seu Mantra"
                id="mantra-title"
                name="mantraTitle"
                value={MantraData.mantraTitle}
                onChange={handleChangeInput}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="mantra-text">O Mantra em Si</label>
              <textarea
                name="mantraText"
                onChange={handleChangeInput}
                placeholder="O seu mantra"
                id="mantra-text"
                value={MantraData.mantraText}
                required
              ></textarea>
            </div>
            <div className="form-item d-flex align-items-center">
              <label>
                <input
                  type="checkbox"
                  className="d-none"
                  id="playOnStartup"
                  name="playOnStartup"
                  checked={isCheckedPlayOnStartup}
                  onChange={handleCheckboxChange}
                />
                <div className="check d-flex align-items-center"></div>
              </label>
              <p>Tocar o mantra quando o computador iniciar.</p>
            </div>
            <div className="form-item d-flex align-items-center">
              <label>
                <input
                  type="checkbox"
                  className="d-none"
                  id="IsActive"
                  name="isActive"
                  checked={isCheckedIsActive}
                  onChange={handleCheckboxChange}
                />
                <div className="check d-flex align-items-center"></div>
              </label>
              <p>Exibir o mantra.</p>
            </div>
            <div className="form-item">
              <label htmlFor="time">
                Hora do dia para tocar a 🔔 notificação{" "}
              </label>
              <input
                name="displayTime"
                type="time"
                id="time"
                value={MantraData.displayTime}
                onChange={handleChangeInput}
                required
              />
            </div>
            <button className="btn-00">Salvar o Mantra</button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default UpdateMantra;
