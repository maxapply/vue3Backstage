import Mock from 'mockjs'
import permissionApi from './mockData/permission'
import homeApi from './mockData/home'
import userApi from './mockData/user'

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
Mock.mock('/home/tableData', homeApi.getHomeData)
Mock.mock(/user\/getUser/, userApi.getUserList)
Mock.mock(/user\/addUser/, userApi.createUser)
Mock.mock(/user\/editUser/, userApi.updateUser)
Mock.mock(/user\/delUser/, userApi.deleteUser)


