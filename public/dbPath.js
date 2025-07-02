const path = require("path");
const fs = require("fs");
const { app } = require("electron");
const isDev = require("electron-is-dev");

let dbPath;

const userDataPath = app.getPath("userData");
dbPath = path.join(userDataPath, "crescent_pod.db");

if (isDev) {
    // In dev: copy the DB only if needed
    const devSource = path.resolve(__dirname, "../database/crescent_pod.db");
    if (!fs.existsSync(dbPath)) {
        fs.copyFileSync(devSource, dbPath);
        console.log("✅ Copied DB to userDataPath (dev):", dbPath);
    } else {
        console.log("✅ Using existing DB in userDataPath (dev):", dbPath);
    }
} else {
    const prodSource = path.join(process.resourcesPath, "database", "crescent_pod.db");
    if (!fs.existsSync(dbPath)) {
        fs.copyFileSync(prodSource, dbPath);
        console.log("✅ Copied DB to userDataPath (prod):", dbPath);
    }
}

module.exports = { dbPath };
