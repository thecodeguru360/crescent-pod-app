const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getFormById: (form_id) => ipcRenderer.invoke("get-form-by-id", form_id),
    addForm: (formData) => ipcRenderer.invoke("add-form", formData),
    addClient: (client_name) => ipcRenderer.invoke("add-client", client_name),
    getClientByName: (client_name) => ipcRenderer.invoke("get-client-by-name", client_name),
    getClients: () => ipcRenderer.invoke("get-clients"),
});

