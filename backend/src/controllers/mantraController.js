const db = require("../db/db");

/*
 1 - cadastrar um mantra.
 2 - ver um mantra.
 3 - editar um mantra.
 4 - apagar um mantra. 
*/

function insertMantra(req, res) {
  try {
    let mantra = req.body;
    let sql = `INSERT INTO Mantras (mantraTitle, mantraText, isActive, playOnStartup, displayTime)
        VALUES (?,?,?,?,?);`;
    db.run(sql, [
      mantra.mantraTitle,
      mantra.mantraText,
      mantra.isActive,
      mantra.playOnStartup,
      mantra.displayTime,
    ], async function(error){
        if(error){
            console.log("erro[sql] na hora de cadastrar um mantra: ",error.message);
            res.status(500).json({msg: `Erro ao inserir um mantra: ${error.message}`});
            return false;
        }else{
            console.log(`Mantra cadastrado com sucesss: ${this.lastID}`);
            res.status(200).json({msg: `Mantra cadastrado com sucesso: ${this.lastID}`});
        }
    });
  } catch (error) {
    console.error("Houve um erro ao inserir um mantra: ", error);
    res.status(500).json({ msg: `Erro ao inserir um mantra: ${error}` });
  }
}

module.exports = {
    insertMantra,
}