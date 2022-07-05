<template>
  <div class="category-box">
    <div class="category-title">{{ categoryInfo?.categoryName }}</div>
    <div class="category-item-list">
      <bookmark-item
        v-for="item in categoryInfo?.category"
        v-bind:key="item.uuid"
        :item-data="item"
      ></bookmark-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import BookmarkItem from "@/components/BookmarkItem.vue";
import { CategoryInfo } from "@/models/linkModel";

export default defineComponent({
  name: "BookmarkCategory",
  components: { BookmarkItem },
  props: {
    categoryInfo: {
      type: Object as PropType<CategoryInfo>,
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
.category-box {
  width: 150px;
  margin-right: 5px;
  margin-bottom: 10px;
}
.category-title {
  text-transform: uppercase;
  color: #aa9a73;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 10px;
}
.category-item-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
