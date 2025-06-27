const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('../database/db');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
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
ipcMain.handle('get-notes', async () => {
    return db.getAllNotes();
});
