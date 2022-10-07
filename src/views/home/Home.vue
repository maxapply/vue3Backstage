<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/photo.png" alt="" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-10-2</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(v, i) in tableLabel"
            :key="i"
            :prop="i"
            :label="v"
          ></el-table-column>
        </el-table> </el-card
    ></el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="(v, i) in countDate"
          :key="i"
        >
          <component
            class="icons"
            :is="v.icon"
            :style="{ background: v.color }"
          ></component>
          <div class="details">
            <p class="num">￥{{ v.value }}</p>
            <p class="txt">{{ v.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card style="height: 330px">
        <div class="" ref="echart" style="height: 330px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div class="" ref="userEchart" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div class="" ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    let tableData = ref([]);
    let countDate = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "本日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };
    const getTableList = async () => {
      const res = await proxy.$api.getTableData();
      tableData.value = res;
    };
    const getCountDatas = async () => {
      const res = await proxy.$api.getCountData();
      countDate.value = res;
    };
    const getEcharts = async () => {
      const result = await proxy.$api.getEcharts();
      let res = result.orderData;
      let userRes = result.userData;
      let videoRes = result.videData;
      orderData.xData = res.data;
      const keyArray = Object.keys(res.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: res.data.map((item) => item[key]),
          type: "line",
        });
      });
      orderData.series = series;
      xOptions.xAxis.data = res.date;
      xOptions.series = series;

      // 折现图
      let hEcharts = echarts.init(proxy.$refs["echart"]);
      hEcharts.setOption(xOptions);
      // 柱状图
      userData.xData = userRes.map((item) => item.data);
      userData.series = [
        {
          name: "新增用户",
          data: userRes.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userRes.map((item) => item.active),
          type: "bar",
        },
      ];

      xOptions.xAxis.data = userData.date;
      xOptions.series = userData.series;
      let uEcharts = echarts.init(proxy.$refs["userEchart"]);
      uEcharts.setOption(xOptions);

      // 饼状图
      videoData.series = {
        type: "pie",
        data: videoRes,
      };
      pieOptions.series = videoData.series;

      let vEcharts = echarts.init(proxy.$refs["videoEchart"]);
      vEcharts.setOption(pieOptions);
    };

    let xOptions = reactive({
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      tooptip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: [],
        axisLine: {
          linerStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          linerStyle: {
            color: "#17b3a3",
          },
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      tooltip: {
        trigger: "axis",
      },
    });
    let orderData = reactive({
      xData: [],
      series: [],
    });
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      collor: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      series: [],
    });
    onMounted(() => {
      getTableList();
      getCountDatas();
      getEcharts();
    });
    return {
      tableData,
      tableLabel,
      countDate,
      xOptions,
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 20px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .details {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-card {
      flex: 1;
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>