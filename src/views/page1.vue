<template>
  <div>
    <div class="top">
      <div class="title">todo MVC</div>
      <el-button class="btn" type="success" plain @click="dialogVisible = true">添加待办事项</el-button>
    </div>
    <el-table style="width: 800px; margin: 30px auto" border :data="todo_list">
      <el-table-column prop="time" label="创建日期"></el-table-column>
      <el-table-column prop="name" label="任务名称"></el-table-column>
      <el-table-column prop="done" label="是否完成">
        <template #default="{ row }">
          <el-tag :type="row.done ? 'success' : 'danger'">
            {{ row.done ? "已完成" : "未完成" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="small" type="primary" plain v-if="!row.done" @click="complete(row)">
            去完成
          </el-button>
          <el-button size="small" type="danger" @click="del(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <p>总待办数：<span>{{ totle }}</span></p>
      <p>已完成数：<span>{{ dones }}</span></p>
    </div>
    <el-dialog v-model="dialogVisible" title="添加待办事项" width="600px" center>
      <el-form :model="ruleForm" :rules="rules" ref="form">
        <el-form-item label="name" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="time" prop="time">
          <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="请选择一个时间" />
        </el-form-item>
      </el-form>
      <el-button type="success" @click="submit()">确定</el-button>
      <el-button type="danger" @click="dialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, reactive, computed, ref } from 'vue';
import utils from '../renderer_utils'
import { ipcRenderer } from "electron";

function getDateTimeObj() { }

const dialogVisible = ref(false);
const form: any = ref(null);
const todo_list: { value: Array<Record<string, any>> } = ref([]);

const ruleForm = reactive({
  name: '',
  time: Date.now(),
})

const rules = reactive({
  name: [
    { required: true, message: '请输入待办事项名', trigger: 'blur' },
  ],
})

const totle = computed(() => todo_list.value.length);
const dones = computed(() => todo_list.value.filter(({ done }) => done).length);

function complete(row) {
  const arr = JSON.parse(JSON.stringify(todo_list.value));
  for (let i = 0; i < arr.length; i++) {
    const info = arr[i];
    if (info.name === row.name) {
      info.done = true
      break;
    }
  }
  const data = ipcRenderer.sendSync('set_todo_list', arr);
  console.log(data)
  if (data === 'success') {
    get_user_todo_list()
  }
}

function del(row) {
  const arr = JSON.parse(JSON.stringify(todo_list.value));
  for (let i = 0; i < arr.length; i++) {
    const info = arr[i];
    if (info.name === row.name) {
      arr.splice(i, 1);
      break;
    }
  }
  const data = ipcRenderer.sendSync('set_todo_list', arr);
  console.log('run3', data)
  if (data === 'success') {
    get_user_todo_list()
  }
}

function get_user_todo_list() {
  const data = ipcRenderer.sendSync('get_todo_list');
  todo_list.value = [...JSON.parse(data)];
}

function submit() {
  form?.value?.validate((valid, fields) => {
    if (valid) {
      const arr = JSON.parse(JSON.stringify(todo_list.value));
      arr.push({ name: ruleForm.name, done: false, time: utils.getDateTimeObj(ruleForm.time) })
      const data = ipcRenderer.sendSync('set_todo_list', arr);
      if (data === 'success') {
        get_user_todo_list()
        dialogVisible.value = false;
        resetForm()
      }
    }
  })
}

function resetForm() {
  form?.value?.resetFields()
}

onMounted(() => {
  get_user_todo_list()
})
</script>

<style scoped lang="less">
.top {
  margin: auto;
  margin-top: 50px;
  text-align: center;
  width: 800px;

  .title {
    font-size: 28px;
    font-weight: bold;
  }

  .btn {
    margin-top: 30px;
  }
}

.box {
  width: 600px;
  height: auto;
  margin: 30px auto;
  border: 1px solid #ccc;
}

.clear {
  clear: both;
}

.footer {
  width: 800px;
  margin: auto;
  display: flex;

  span {
    font-size: 22px;
    font-weight: bold;
    color: pink;
  }

  p:nth-of-type(2) {
    margin-left: 25px;
  }
}
</style>
