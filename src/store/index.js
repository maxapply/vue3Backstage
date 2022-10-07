import { createStore } from 'vuex';
import Cookie from 'js-cookie'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        menu: [],
        token: ''
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name === 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
                localStorage.setItem('tabsList', JSON.stringify(state.tabsList))
            }
        },
        closeTab(state, val) {
            var res = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(res, 1)
            localStorage.setItem('tabsList', JSON.stringify(state.tabsList))
        },
        setMenu(state, val) {
            state.menu = val;
            localStorage.setItem('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            if (!localStorage.getItem('menu')) {
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu;
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        item.component = () => import(url)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = () => import(url)
                    menuArray.push(item)
                }

            });
            menuArray.forEach((item) => {
                router.addRoute('home1', item)
            })


        },
        cleanMenu(statr) {
            statr.menu = []
            localStorage.removeItem('menu')
            localStorage.removeItem('tabsList')
        },
        setToken(state, val) {
            state.token = val;
            Cookie.set('token', val)
        },
        clearToken(statr) {
            statr.token = ''
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        },
        getTabList(state) {
            state.tabsList = JSON.parse(localStorage.getItem('tabsList')) || state.tabsList
        },
        setCurrentMenu(state, val) {
            state.currentMenu = val
            if (val.name === 'home') {
                state.currentMenu = null
                localStorage.setItem('currentMenu', JSON.stringify(''))
            } else {
                localStorage.setItem('currentMenu', JSON.stringify(val))
            }
        },
        getCurrentMenu(state) {
            state.currentMenu = JSON.parse(localStorage.getItem('currentMenu')) || state.currentMenu
        }

    }
})