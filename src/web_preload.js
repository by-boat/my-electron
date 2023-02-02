/** 
 * 监听渲染进程调用主进程事件
 */
const fs = require('fs');
const path = require('path');
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

  ipcMain.on('logger', function (event, k, v) {
    k = k + '-- > %s';
    logger.info(k, v);
  });

  ipcMain.on('get_todo_list', (e) => {
    let data = [];
    try {
      data = fs.readFileSync(path.join('D:/electron-app/todolist.json'), 'utf-8');
    } catch (error) {
    }
    e.returnValue = data;
  });

  ipcMain.on('set_todo_list', (e, new_list) => {
    fs.mkdir('D:/electron-app/', (err) => {
      fs.writeFile(path.join('D:/electron-app/todolist.json'), JSON.stringify(new_list), (err) => {
        if (err) {
          return e.returnValue = 'fail';
        }
        e.returnValue = 'success';
      });
    })
  })

}
module.exports = add_browser_event_listener


