const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const pathFileDB = path.join(__dirname, "db_mantras.db");

function makeConnection() {
  if (fs.existsSync(pathFileDB)) {
    return new sqlite3.Database(pathFileDB);
  } else {
    //Banco de dados não existe
    // Criando um bd
    const db = new sqlite3.Database(pathFileDB, async function (error) {
      if (error) {
        console.error("erro não criação do banco: ", error);
        return false;
      }
      await createTablesInDatabase(db);
    });
  }
}
// db = banco de dados do mantra
function createTablesInDatabase(db) {
  try {
    db.exec(`
    CREATE TABLE IF NOT EXISTS Mantras (
      mantraID INTEGER UNIQUE,
      mantraTitle VARCHAR(255) NOT NULL,
      mantraText TEXT NOT NULL,
      isActive BOOLEAN NOT NULL,
      playOnStartup BOOLEAN NOT NULL,
      displayTime VARCHAR(20) NOT NULL,
      PRIMARY KEY ("mantraID" AUTOINCREMENT)
  );`);
  } catch (error) {
    console.error("Erro ao criar a tabela mantra: ", error);
  }
}

module.exports = makeConnection();
