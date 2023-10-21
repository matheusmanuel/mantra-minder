const db = require("../db/db");

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

function deleteMantra(req, res) {
  try {
    let sql = `DELETE FROM Mantras WHERE mantraID = ?`;
    let id = req.body.mantraID;

    db.run(sql, [id], function (error) {
      if (error) {
        console.error("erro ao deletar um mantra: ", error.message);
        res
          .status(500)
          .json({ msg: `erro ao deletar um mantra: ${error.message}` });
      } else {
        console.log(`O mantra com ${id} foi apagado com sucesso!`);
        res
          .status(200)
          .json({ msg: `O mantra com ${id} foi apagado com sucesso!` });
      }
    });
  } catch (error) {
    console.error(`Erro ao deletar um mantra vt: ${error.message}`);
    res.status(500).json({ msg: `erro ao deletar um mantra vt: ${error}` });
  }
}

function getMantra(req, res) {
  try {
    let { id } = req.params;
    let sql = "SELECT * FROM Mantras WHERE mantraID = ?";
    db.get(sql, [id], (error, row) => {
      if (error) {
        return res.status(500).json({ msg: "Erro interno no servidor" });
      }
      if (!row) {
        return res.status(404).json({ msg: "Mantra não encontrado" });
      }
      return res.status(200).json(row);
    });
  } catch (error) {
    console.error(`Erro ao buscar um mantra vt: ${error.message}`);
    res.status(500).json({ msg: `erro ao buscar um mantra vt: ${error}` });
  }
}
function updateActiveMantra(req, res) {
  const mantraId = req.params.id;
  const newIsActive = req.body.isActive;

  // Atualize o mantra no banco de dados
  const sql = `UPDATE Mantras SET isActive = ? WHERE mantraId = ?`;
  db.run(sql, [newIsActive, mantraId], function (err) {
    if (err) {
      return res.status(500).json({ error: `Erro ao atualizar o status do mantra ${err}` });
    }

    return res.json({ message: `Mantra com id:${mantraId} atualizado com sucesso para ${newIsActive}` });
  });
}
module.exports = {
  insertMantra,
  updateMantra,
  getAllMantras,
  deleteMantra,
  getMantra,
  updateActiveMantra,
};
