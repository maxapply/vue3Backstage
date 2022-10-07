<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '65px'">
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3>{{ $store.state.isCollapse ? "后台管理" : "后台" }}</h3>
      <el-menu-item
        :index="v.path"
        v-for="(v, i) in noChildren()"
        :key="i"
        @click="clickMenu(v)"
      >
        <component class="icons" :is="v.icon"></component>
        <span>{{ v.label }}</span>
      </el-menu-item>
      <el-sub-menu :index="v.path" v-for="(v, i) in hasChildren()" :key="i">
        <template #title>
          <component class="icons" :is="v.icon"></component>
          <span>{{ v.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subV.path"
            v-for="(subV, subI) in v.children"
            :key="subI"
            @click="clickMenu(subV)"
          >
            <component class="icons" :is="subV.icon"></component>
            <span>{{ subV.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" >
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const list = [];
    const asyncList = store.state.menu;
    const noChildren = function () {
      return asyncList.filter((v) => !v.children);
    };
    const hasChildren = function () {
      return asyncList.filter((v) => v.children);
    };
    const clickMenu = (v) => {
      router.push({
        name: v.name,
      });
      store.commit("selectMenu", v);
      store.commit("setCurrentMenu", v);
    };
    return {
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
};
</script>
<style lang="less" scoped>
.el-menu {
  height: 100%;
  border-right: none;
  h3 {
    line-height: 60px;
    color: #fff;
    text-align: center;
  }
}
.icons {
  width: 18px;
  height: 18px;
}
</style>