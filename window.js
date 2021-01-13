const {
  remote
} = require('electron');
console.log(remote);
let d = document;
d.getElementById("min-button").addEventListener('click', (e) => {
  remote.BrowserWindow.getFocusedWindow().minimize();
})
d.getElementById("close-button").addEventListener('click', (e) => {
  remote.BrowserWindow.getFocusedWindow().close();
})