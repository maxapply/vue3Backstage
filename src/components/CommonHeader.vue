<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <el-button size="default" plain @click="handelCollapse">
        <el-icon :size="15">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc('photo')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handeLoginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue-demi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    let store = useStore();
    const router = useRouter();
    const tags = store.state.tabsList;
    const getImgSrc = (user: string) => {
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
    };
    let handelCollapse = () => {
      store.commit("updateIsCollapse");
    };
    const current = computed(() => {
      return store.state.currentMenu;
    });
    const handeLoginout = () => {
      ElMessageBox.confirm("你确定要退出吗?")
        .then(() => {
          store.commit("cleanMenu");
          store.commit("clearToken");
          console.log(666);
          router.push({
            name: "login",
          });
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      // imgSrc,
      getImgSrc,
      handelCollapse,
      current,
      handeLoginout,
      tags,
    };
  },
});
</script>
<style lang="less" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #333;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  .bread :deep(span) {
    color: #fff;
    cursor: pointer;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>