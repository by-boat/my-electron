/** 
 * 监听渲染进程调用主进程事件
 */

const { ipcMain } = require('electron');
const logger = require('./utils/log_utls');

function add_browser_event_listener(win) {
  ipcMain.on('win_task', function (event, arg) {
    switch (arg) {
      case 'close':
        win.destroy();
        break;
      case 'min':
        win.minimize();
        break;
      case 'max':
        win.isMaximized() ? win.unmaximize() : win.maximize();
        break;
    }
  });
}
module.exports = add_browser_event_listener


