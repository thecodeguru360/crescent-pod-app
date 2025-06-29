const { contextBridge, ipcRenderer } = require("electron");



console.log("Preload script is executing");

contextBridge.exposeInMainWorld("api", {
    getFormById: (form_id) => ipcRenderer.invoke("get-form-by-id"),
    addForm: (formData, client_id) => ipcRenderer.invoke("add-form"),
    addClient: (client_name) => ipcRenderer.invoke("add-client"),
    getClientByName: (client_name) => ipcRenderer.invoke("get-client-by-name"),
    getClients: () => ipcRenderer.invoke("get-clients"),
});

