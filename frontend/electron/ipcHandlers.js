// ipcHandlers.js
const { ipcMain,Notification } = require('electron');
const makeConnection = require('../db/db');
let db;

function initIPC() {
  db = makeConnection();

  ipcMain.handle('get-all-mantras', async () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Mantras';
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error('Erro ao buscar mantras:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });

  ipcMain.handle('insert-mantra', async (event, mantra) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Mantras (mantraTitle, mantraText, isActive, playOnStartup, displayTime) VALUES (?, ?, ?, ?, ?)`;
      db.run(sql, [mantra.mantraTitle, mantra.mantraText, mantra.isActive, mantra.playOnStartup, mantra.displayTime], function (err) {
        if (err) {
          console.error('Erro ao inserir mantra:', err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  });

  ipcMain.handle('edit-mantra', async (event, mantraData) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Mantras SET mantraTitle = ?, mantraText = ?, isActive = ?, playOnStartup = ?, displayTime = ? WHERE mantraID = ?`;
      db.run(sql, [mantraData.mantraTitle, mantraData.mantraText, mantraData.isActive, mantraData.playOnStartup, mantraData.displayTime, mantraData.mantraID], function (err) {
        if (err) {
          console.error('Erro ao atualizar mantra:', err);
          reject(err);
        } else {
          resolve(this.changes); // Número de linhas afetadas
        }
      });
    });
  });

  ipcMain.handle('delete-mantra', async (event, id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM Mantras WHERE mantraID = ?`;
      db.run(sql, id, function (err) {
        if (err) {
          console.error('Erro ao excluir mantra:', err);
          reject(err);
        } else {
          resolve(this.changes); // Número de linhas afetadas
        }
      });
    });
  });

  ipcMain.handle('update-visible-mantra', async (event, { mantraId, isActive }) => {
    const sql = `UPDATE Mantras SET isActive = ? WHERE mantraId = ?`;
  
    return new Promise((resolve, reject) => {
      db.run(sql, [isActive, mantraId], function (err) {
        if (err) {
          console.error('Erro ao atualizar o mantra:', err);
          return reject(new Error(`Erro ao atualizar o status do mantra: ${err.message}`));
        }
  
        if (this.changes === 0) {
          return reject(new Error(`Mantra com id:${mantraId} não encontrado.`));
        }
  
        resolve({ message: `Mantra com id:${mantraId} atualizado com sucesso para ${isActive}` });
      });
    });
  });
  

  ipcMain.handle('get-mantra', async (event, id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM Mantras WHERE mantraID = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          console.error('Erro ao buscar mantra:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });

  ipcMain.on('notify', (event, { title, body }) => {
    new Notification({ title, body }).show();
  })
}

module.exports = {initIPC,db};