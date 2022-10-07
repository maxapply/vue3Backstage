/* 
 * 环境配置
*/
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/9687d9ec3a1d68cc46b8cf757b25474d/api'
    },
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/9687d9ec3a1d68cc46b8cf757b25474d/api'
    },
    pro: {
        baseApi: '//future.com/api',
        mockApi: 'https://www.fastmock.site/mock/9687d9ec3a1d68cc46b8cf757b25474d/api'
    },

}
export default {
    env,
    mock: true,
    ...EnvConfig[env]

}