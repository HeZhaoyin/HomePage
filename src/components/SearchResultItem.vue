<template>
  <div class="result-box">{{ resultData?.name }} : {{ resultData?.href }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { AppInfo, CategoryItem } from "@/models/linkModel";

export default defineComponent({
  name: "SearchResultItem",
  props: {
    resultData: {
      type: Object as PropType<AppInfo | CategoryItem>,
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
.result-box {
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
</style>
