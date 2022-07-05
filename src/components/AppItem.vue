<template>
  <div class="app-item-box">
    <div class="app-item-left">
      <el-icon :size="32">
        <component :is="appData?.iconType" />
      </el-icon>
    </div>

    <div class="app-item-right">
      <span class="app-title">
        {{ appData?.name }}
      </span>
      <span class="app-right-bottom">点击跳转</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { AppInfo } from "@/models/linkModel";

export default defineComponent({
  name: "AppItem",
  props: {
    appData: {
      type: Object as PropType<AppInfo>,
      require: true,
    },
  },
  setup() {
    const data = reactive({});

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.app-item-box {
  width: 170px;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 0 5px;
}
.app-item-box:hover {
  background: rgb(198, 197, 193);
  border-radius: 5px;
}
.app-item-left {
  color: #4c432e;
  margin-right: 2px;
}
.app-item-right {
  width: 84%;
  display: flex;
  flex-direction: column;
}
.app-title {
  font-size: 1em;
  font-weight: 500;
  margin-bottom: -4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.app-right-bottom {
  color: #aa9a73;
  font-weight: 400;
  font-size: 0.8em;
  opacity: 1;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
</style>
