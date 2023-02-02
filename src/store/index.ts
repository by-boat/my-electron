import { createStore, createLogger } from 'vuex';
import nav_store from './modules/nav_list.js';

const store = createStore({
  modules: { nav_store },
  getters: {
    nav_list: (state: any) => state.nav_store.nav_list
  }
  // strict: import.meta.env.DEV,
  // plugins: import.meta.env.DEV ? [createLogger()] : []
})

export default store