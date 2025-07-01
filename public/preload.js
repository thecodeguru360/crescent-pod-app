const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getFormById: (form_id) => ipcRenderer.invoke("get-form-by-id", form_id),
    getFormByDate: (date) => ipcRenderer.invoke("get-form-by-date", date),
    getFormByClientId: (client_id) => ipcRenderer.invoke("get-form-by-client-id", client_id),
    getRecentForms: () => ipcRenderer.invoke("get-recent-forms"),
    addForm: (formData) => ipcRenderer.invoke("add-form", formData),
    addClient: (client_name) => ipcRenderer.invoke("add-client", client_name),
    getClientByName: (client_name) => ipcRenderer.invoke("get-client-by-name", client_name),
    getClients: () => ipcRenderer.invoke("get-clients"),
    exportSQL: () => ipcRenderer.invoke('export-sql'),
    importSQL: () => ipcRenderer.invoke('import-sql'),
});

