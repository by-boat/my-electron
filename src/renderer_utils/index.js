// 渲染进程工具文件
import { ipcRenderer } from "electron";
import { createApp } from 'vue'
import { ElButton, ElDialog } from 'element-plus'

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

  static showDialog() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const dialogBox = {
      props: {},
      data() {
        return {
          dialogVisible: true
        }
      },
      render: (ctx) => {
        const { $data, $props } = ctx
        const { dialogVisible } = $data

        return (
          <ElDialog v-model={dialogVisible} title="添加待办事项" width="600px" center>
            <ElButton type="primary" onClick={() => {
              app.unmount();
              div.remove()
            }}>按钮</ElButton>
          </ElDialog>
        )
      }
    }
    const app = createApp(dialogBox);
    app.mount(div)
  }
}

export default utils;