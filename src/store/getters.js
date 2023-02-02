import { toRaw } from 'vue'

export default {
    // 用户信息
    userInfo: state => {
        const { sUserId, sUserName } = state.user;
        return { sUserId, sUserName }
    },
    // 菜单是否展开
    menuCollapse: (state) => state.menu.collapse,
    menuList: (state) => toRaw(state.menu.menuList),
}