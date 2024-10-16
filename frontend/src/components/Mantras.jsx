import { useEffect, useState } from "react";
import Mantra from "./Mantra";
import { NavLink } from "react-router-dom";

const Mantras = () => {
  const [mantras, setMantras] = useState(null);

  useEffect(() => {
    const fetchMantrasAndSetup = async () => {
      const fetchedMantras = await window.electron.getAllMantras();
      setMantras(fetchedMantras); 
    };

    fetchMantrasAndSetup();
  }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez

  return (
    <main className="container m-center-auto main-container">
      <NavLink to="/new">
        <button className="btn-00">Criar Mantra</button>
      </NavLink>
      <div className="mantra-container d-flex flex-wrap">
        {mantras &&
          mantras.map((mantra, index) => (
            <Mantra
              key={index}
              id={mantra.mantraID}
              title={mantra.mantraTitle}
              text={mantra.mantraText}
              time={mantra.displayTime}
              active={mantra.isActive}
            />
          ))}
      </div>
    </main>
  );
};

export default Mantras;
