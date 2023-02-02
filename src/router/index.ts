import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  ...store.getters.nav_list,
]

const router = createRouter({
  // 使用hash路由不然打包刷新就会丢失页面
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
