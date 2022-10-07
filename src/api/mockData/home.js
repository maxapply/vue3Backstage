export default {
    getHomeData: () => {
        return {
            code: 200,
            data: {
                tableData: [
                    { name: "oppo", todayBuy: 500, monthBuy: 3500, totalBuy: 22000 },
                    { name: "vivo", todayBuy: 300, monthBuy: 2400, totalBuy: 32000 },
                    { name: "apple", todayBuy: 800, monthBuy: 3800, totalBuy: 42000 },
                    { name: "小米", todayBuy: 300, monthBuy: 2000, totalBuy: 34000 },
                    { name: "魅族", todayBuy: 350, monthBuy: 3000, totalBuy: 22000 },
                    { name: "三星", todayBuy: 400, monthBuy: 3500, totalBuy: 32000 },
                ]
            }
        }
    }
}