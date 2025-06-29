const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('../database/db');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            devTools: true,
            preload: path.resolve(__dirname, "./preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    console.log("Preload path:", path.join(__dirname, "preload.js"));

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

// Example: handle a DB request from React
ipcMain.handle('add-form', async (formData, client_id) => {
    return db.addForm(formData, client_id);
});
ipcMain.handle('add-client', async (client_name) => {
    return db.addClient(client_name);
});
ipcMain.handle('get-form-by-id', async (form_id) => {
    return db.getFormById(form_id);
});
ipcMain.handle('get-client-by-name', async (client_name) => {
    return db.getClientByName(client_name);
});
ipcMain.handle('get-clients', async () => {
    return db.getClients();
});


