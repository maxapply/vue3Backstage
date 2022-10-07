<template>
  <div class="tags">
    <el-tag
      v-for="(v, i) in tags"
      :key="i"
      :closable="v.name !== 'home'"
      :effect="$route.name == v.name ? 'dark' : 'plain'"
      :disable-transitions="false"
      @click="changeMenu(v)"
      @close="handleClose(v, i)"
      >{{ v.label }}</el-tag
    >
  </div>
</template>

<script lang="ts" >
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const tags = store.state.tabsList;
    const changeMenu = (item) => {
      router.push({
        name: item.name,
      });
      store.commit("setCurrentMenu", item);
    };

    const handleClose = (tag, index) => {
      let length = tags.length - 1;
      store.commit("closeTab", tag);
      store.commit("setCurrentMenu", tag);

      if (tag.name !== route.name) {
        return;
      }

      if (index === length) {
        router.push({
          name: tags[index - 1].name,
        });

        store.commit("setCurrentMenu", tags[index - 1]);
      } else {
        router.push({
          name: tags[index].name,
        });
        store.commit("setCurrentMenu", tags[index]);
      }
    };

    return {
      tags,
      changeMenu,
      handleClose,
    };
  },
};
</script>
<style lang="less" scoped>
.tags {
  padding: 20px 20px 0;
  background-color: #eee;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>