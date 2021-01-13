const path = require('path');

const {
  app
} = require('electron');

const {
  BrowserWindow,
  setVibrancy
} = require("electron-acrylic-window");

let vibrancyOp = {
  theme: 'dark',
  effect: 'acrylic',
  useCustomWindowRefreshMethod: true,
  disableOnBlur: true,
  debug: false
};

global.dataDir = app.getPath('userData');

if (process.argv) {
  global.args = process.argv;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
    vibrancy: vibrancyOp,
    icon: path.join(__dirname, 'assets/icons/64x64.png')
  });
  // win.setMenu(null);
  win.setResizable(false);
  win.loadFile('index.html');
  win.show();
  win.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('ready', () => {
  if (BrowserWindow.getAllWindows().length == 0) {
    createWindow()
  }
});