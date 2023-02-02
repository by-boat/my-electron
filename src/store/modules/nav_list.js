const state = () => ({
  nav_list: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      title: '首页',
      path: '/home',
      component: () => import('views/Home.vue'),
    },
    {
      title: 'page1',
      path: '/page1',
      component: () => import('views/page1.vue'),
    },
    {
      title: 'page2',
      path: '/page2',
      component: () => import('views/page2.vue'),
    },
    {
      title: 'page3',
      path: '/page3',
      component: () => import('views/page3.vue'),
    },
  ]
})

const getters = {
  navs(state) {
    return state.nav_list
  }
}

const mutations = {

}

const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations,
};