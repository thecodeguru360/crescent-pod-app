const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require("electron-is-dev");
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Fix 1: Properly require the database module with .js extension
const dbModules = require(isDev
    ? path.join(__dirname, "../database/db.js")
    : path.join(__dirname, "db.js")); // In production, db.js should be in the same directory

// Fix 2: Handle database path more robustly
let dbPath;
if (isDev) {
    dbPath = path.resolve(__dirname, "../database/crescent_pod.db");
} else {
    dbPath = path.join(app.getPath("userData"), "crescent_pod.db");

    // Copy default database if it doesn't exist
    if (!fs.existsSync(dbPath)) {
        try {
            // Try multiple possible locations for the default database
            const possiblePaths = [
                path.join(process.resourcesPath, "database/crescent_pod.db"),
                path.join(__dirname, "crescent_pod.db"),
                path.join(process.resourcesPath, "crescent_pod.db")
            ];

            let defaultDbPath = null;
            for (const possiblePath of possiblePaths) {
                if (fs.existsSync(possiblePath)) {
                    defaultDbPath = possiblePath;
                    break;
                }
            }

            if (defaultDbPath) {
                fs.copyFileSync(defaultDbPath, dbPath);
                console.log("✅ Copied default DB to userData folder:", dbPath);
            } else {
                console.log("📝 No default database found, will create new one at:", dbPath);
                // The database will be created when first accessed
            }
        } catch (err) {
            console.error("❌ Failed to copy DB:", err);
        }
    }
}

console.log("Database path:", dbPath);
console.log("isDev:", isDev);
console.log("__dirname:", __dirname);

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

    if (isDev) {
        win.webContents.openDevTools();
    }

    console.log("Preload path:", path.join(__dirname, "preload.js"));

    win.loadURL(isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`);
}

app.whenReady().then(createWindow);

// IPC Handlers
ipcMain.handle('add-form', async (event, formData) => {
    try {
        return await dbModules.addForm(formData);
    } catch (error) {
        console.error('Error adding form:', error);
        throw error;
    }
});

ipcMain.handle('add-client', async (event, client_name) => {
    try {
        return await dbModules.addClient(client_name);
    } catch (error) {
        console.error('Error adding client:', error);
        throw error;
    }
});

ipcMain.handle('get-recent-forms', async (event) => {
    try {
        return await dbModules.getRecentForms();
    } catch (error) {
        console.error('Error getting recent forms:', error);
        throw error;
    }
});

ipcMain.handle('get-form-by-id', async (event, form_id) => {
    try {
        return await dbModules.getFormById(form_id);
    } catch (error) {
        console.error('Error getting form by ID:', error);
        throw error;
    }
});

ipcMain.handle('get-form-by-date', async (event, date) => {
    try {
        return await dbModules.getFormByDate(date);
    } catch (error) {
        console.error('Error getting form by date:', error);
        throw error;
    }
});

ipcMain.handle('get-form-by-client-id', async (event, client_id) => {
    try {
        return await dbModules.getFormByClientId(client_id);
    } catch (error) {
        console.error('Error getting form by client ID:', error);
        throw error;
    }
});

ipcMain.handle('get-client-by-name', async (event, client_name) => {
    try {
        return await dbModules.getClientByName(client_name);
    } catch (error) {
        console.error('Error getting client by name:', error);
        throw error;
    }
});

ipcMain.handle('get-clients', async () => {
    try {
        return await dbModules.getClients();
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
});

// Import / Export section
ipcMain.handle('export-sql', async () => {
    const { filePath, canceled } = await dialog.showSaveDialog({
        defaultPath: 'crescent_pod_backup_' + new Date().toISOString().replace(/[:.]/g, '-') + '.sql',
        filters: [{ name: 'SQL Dump', extensions: ['sql'] }],
    });

    if (canceled || !filePath) return { status: 'cancelled' };

    const db = new sqlite3.Database(dbPath);
    const dumpLines = [];

    console.log("DB path for export:", dbPath);

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", (err, tables) => {
                if (err) {
                    console.error("Failed to read tables:", err.message);
                    db.close();
                    return reject({ status: 'error', message: 'Failed to read tables' });
                }

                if (!tables.length) {
                    try {
                        fs.writeFileSync(filePath, '-- Empty database\n', 'utf-8');
                        db.close();
                        return resolve({ status: 'success', message: 'Empty DB exported' });
                    } catch (writeErr) {
                        console.error("Write error:", writeErr);
                        db.close();
                        return reject({ status: 'error', message: 'Failed to write file' });
                    }
                }

                let tableIndex = 0;

                const processNextTable = () => {
                    if (tableIndex >= tables.length) {
                        try {
                            fs.writeFileSync(filePath, dumpLines.join('\n'), 'utf-8');
                            db.close();
                            console.log("Export complete:", filePath);
                            return resolve({ status: 'success', message: 'SQL export complete' });
                        } catch (err) {
                            console.error("Failed to write SQL file:", err);
                            db.close();
                            return reject({ status: 'error', message: 'Could not save SQL file' });
                        }
                    }

                    const table = tables[tableIndex];
                    const safeCreate = table.sql.replace(
                        /^CREATE TABLE/i,
                        'CREATE TABLE IF NOT EXISTS'
                    );
                    dumpLines.push(`${safeCreate};`);

                    db.all(`SELECT * FROM ${table.name}`, (err, rows) => {
                        if (!err && rows.length > 0) {
                            rows.forEach((row) => {
                                const keys = Object.keys(row).map(k => `"${k}"`).join(', ');
                                const values = Object.values(row)
                                    .map(v => (v === null ? 'NULL' : `'${v.toString().replace(/'/g, "''")}'`))
                                    .join(', ');
                                dumpLines.push(`INSERT INTO ${table.name} (${keys}) VALUES (${values});`);
                            });
                        }

                        tableIndex++;
                        processNextTable();
                    });
                };

                processNextTable();
            });
        });
    });
});

ipcMain.handle('import-sql', async () => {
    const { filePaths, canceled } = await dialog.showOpenDialog({
        filters: [{ name: 'SQL Dump', extensions: ['sql'] }],
        properties: ['openFile'],
    });

    if (canceled || !filePaths.length) return { status: 'cancelled' };

    try {
        const sqlScript = fs.readFileSync(filePaths[0], 'utf-8');
        const db = new sqlite3.Database(dbPath);

        // Extract all table names from CREATE TABLE statements
        const tableMatches = [...sqlScript.matchAll(/CREATE TABLE IF NOT EXISTS ["`]?(.*?)["`]?[\s(]/gi)];
        const tableNames = tableMatches.map(match => match[1]);

        console.log("Importing tables:", tableNames);

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("PRAGMA foreign_keys = OFF;");
                db.run("BEGIN TRANSACTION;");

                // Step 1: Delete from all tables first
                for (const tableName of tableNames) {
                    db.run(`DELETE FROM "${tableName}";`, (err) => {
                        if (err) console.warn(`Warning: Failed to delete from ${tableName}`, err.message);
                    });
                }

                // Step 2: Run the full SQL dump
                db.exec(sqlScript, (err) => {
                    if (err) {
                        console.error("Import failed:", err);
                        db.run("ROLLBACK;");
                        db.close();
                        return reject({ status: 'error', message: 'SQL import failed' });
                    }

                    db.run("COMMIT;");
                    db.run("PRAGMA foreign_keys = ON;");
                    db.close();
                    console.log("SQL import complete");
                    return resolve({ status: 'success', message: 'SQL import complete' });
                });
            });
        });
    } catch (error) {
        console.error("Error reading SQL file:", error);
        return { status: 'error', message: 'Could not read SQL file' };
    }
});

// Handle app quit
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});