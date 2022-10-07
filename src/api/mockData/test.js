import Mock from "mockjs"
let data = Mock.mock({
    //生成10条数据，数组形式
    "data|10": [
        {
            "shopId|+1": 1, //生成id，自增1
            "shopName": "@cname", //生成姓名(这里生成的是中文名称)
            "shopImg": "@Image('100*40','#c33','#ffffff','商品')", //生成随机图片(大小/背景色/字体颜色/文字信息),打印的是图片地址
            "shopVolume|30-1000": 30, //随机生成30至1000的数字(价格)
            "shopAddress": "@county(true)", //随机生成地址
            "shopDate": "@date('yyyy-MM-dd')", //随机生成yyyy-MM-dd格式的日期
            "shopPhone": /^1(5|3|7|8)[0-9]{9}$/, //随机生成电话号码
            "shopStart|1-5": "★", //随机生成1至5个指定的图形(★)
        },
    ],
});




export default {
    getUserData: () => {
        return {
            code: 200,
            data: data
        }
    }
}