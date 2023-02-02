// 渲染进程工具文件
import { ipcRenderer } from "electron";

class utils {
  static log(k, v) {
    ipcRenderer.send('logger', k, v);
  }

  static set_win_state(arg) {
    ipcRenderer.send("win_task", arg);
  }

  static getDateTimeObj(date_ = Date.now()) {
    let date = new Date(date_);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
  }
}

export default utils;