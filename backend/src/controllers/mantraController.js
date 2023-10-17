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
    db.run(
      sql,
      [
        mantra.mantraTitle,
        mantra.mantraText,
        mantra.isActive,
        mantra.playOnStartup,
        mantra.displayTime,
      ],
      async function (error) {
        if (error) {
          console.log(
            "erro[sql] na hora de cadastrar um mantra: ",
            error.message
          );
          res
            .status(500)
            .json({ msg: `Erro ao inserir um mantra: ${error.message}` });
          return false;
        } else {
          console.log(`Mantra cadastrado com sucesss: ${this.lastID}`);
          res
            .status(200)
            .json({ msg: `Mantra cadastrado com sucesso: ${this.lastID}` });
        }
      }
    );
  } catch (error) {
    console.error("Houve um erro ao inserir um mantra: ", error);
    res.status(500).json({ msg: `Erro ao inserir um mantra: ${error}` });
  }
}

function updateMantra(req, res) {
  try {
    let mantra = req.body;
    let sql = `UPDATE Mantras SET mantraTitle = ?, mantraText = ?, isActive = ?, playOnStartup = ?, displayTime = ? WHERE mantraID = ?`;

    db.run(
      sql,
      [
        mantra.mantraTitle,
        mantra.mantraText,
        mantra.isActive,
        mantra.playOnStartup,
        mantra.displayTime,
        mantra.mantraID,
      ],
      async function (error) {
        if (error) {
          res.status(500).json({
            msg: `[sql]Houve um erro ao editar o mantra: ${error.message}`,
          });
          console.log(
            "[sql]Houve um erro ao editar o mantra cmd: ",
            error.message
          );
          return false;
        } else {
          res.status(200).json({
            msg: `O mantra com id: ${mantra.mantraID} foi editado com sucesso`,
          });
          console.log(
            `O mantra com id: ${mantra.mantraID} foi editado com sucesso`
          );
        }
      }
    );
  } catch (error) {
    console.error("Houve um erro ao editar um mantra: ", error);
    res.status(500).json({ msg: `Erro ao editar um mantra: ${error}` });
  }
}

function getAllMantras(req, res) {
  try {
    let sql = `SELECT * FROM Mantras`;
    db.all(sql, async (error, rows) => {
      if (error) {
        console.error(`erro ao buscar todos os mantras: ${error.message}`);
        res
          .status(500)
          .json({ msg: `erro ao buscar todos os mantras: ${error.message}` });
      } else if (rows) {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
    console.error(`Erro ao mostrar todos os mantra vt: `, error);
    res
      .status(500)
      .json({ msg: `erro ao mostrar todos os mantra vt ${error}` });
  }
}


module.exports = {
  insertMantra,
  updateMantra,
  getAllMantras,
};
