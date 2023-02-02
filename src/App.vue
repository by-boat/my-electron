<template>
  <div class="header">
    <el-menu
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      :collapse-transition="false"
      active-text-color="#ffd04b"
      :default-active="curRoute"
    >
      <el-menu-item
        v-for="{ path, title } in nav_list"
        :index="path"
        :key="path"
        >{{ title }}</el-menu-item
      >
    </el-menu>
    <div class="menu">
      <p @click="reload">刷新</p>
      <p @click="set_win_state('min')">最小化</p>
      <p @click="set_win_state('max')">放大</p>
      <p @click="set_win_state('close')">关闭</p>
    </div>
  </div>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const store = useStore();
const router = useRouter();
const nav_list = computed(() => store.getters.nav_list);
const curRoute = computed(() => {
  const { currentRoute } = router;
  let { path } = currentRoute.value;
  // 防止刷新的时候高亮条闪烁;
  path = path == "/" ? null : path;
  return path;
});

function set_win_state(arg) {
  ipcRenderer.send("win_task", arg);
  console.log("run", arg);
}

function reload() {
  location.reload();
}
</script>

<style scoped>
.header {
  position: relative;
  /* 设置可拖拽桌面应用 */
  -webkit-app-region: drag;
}
.el-menu-demo * {
  -webkit-app-region: no-drag;
}
.menu {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 111;
  display: flex;
  color: #fff;
  height: 100%;
  align-items: center;
}

.menu p {
  padding: 0 15px;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
</style>
