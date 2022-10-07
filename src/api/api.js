/*
 * 整个项目的api管理
*/

import request from "./request";
export default {
    getTableData(params) {
        return request({
            url: '/home/tableData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getCountData(params) {
        return request({
            url: '/home/getCountData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getEcharts(params) {
        return request({
            url: '/home/getChartData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getUserDataApi(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            data: params,
            mock: false
        })
    },
    addUser(params) {
        return request({
            url: '/user/addUser',
            method: 'post',
            data: params,
            mock: false
        })
    },
    editUser(params) {
        return request({
            url: '/user/editUser',
            method: 'post',
            data: params,
            mock: false
        })
    },
    deleteUser(params) {
        return request({
            url: '/user/delUser',
            method: 'get',
            data: params,
            mock: false
        })
    },
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            data: params,
            mock: false
        })
    }

}