window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getAllMantras: () => ipcRenderer.invoke('get-all-mantras'),
  insertMantra: (mantra) => ipcRenderer.invoke('insert-mantra', mantra),
  editMantra: (mantraData) => ipcRenderer.invoke('edit-mantra', mantraData),
  deleteMantra: (id) => ipcRenderer.invoke('delete-mantra', id),
  getMantra: (id) => ipcRenderer.invoke('get-mantra', id),
  updateVisibleMantra: (mantraData) => ipcRenderer.invoke('update-visible-mantra', mantraData), 
});