<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container class="r-container">
        <common-header />
        <common-tab />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab.vue";
export default defineComponent({
  components: { CommonHeader, CommonAside, CommonTab },
});
</script>

 <style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.r-container {
  flex-direction: column;
}
.el-main {
  background-color: #eee;
}
</style>
