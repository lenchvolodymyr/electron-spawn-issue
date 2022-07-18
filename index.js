const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;

ipcMain.on('new-process', () => {
    let log = path.join(__dirname, 'out.log')
    let out = fs.openSync(log, 'a')
    let err = fs.openSync(log, 'a')
    const args = ['./index.js'];

    const subprocess = spawn(process.execPath, args, {
        detached: true,
        stdio: [ 'ignore', out, err ],
    });

    subprocess.unref();
});

app.requestSingleInstanceLock();

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadURL(`file://${__dirname}/app.html`);
    win.show();
    win.maximize();
    win.openDevTools();
});

