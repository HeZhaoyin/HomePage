<template>
  <div class="bookmark-item-box" @click="bookmarkItemClick">
    <div class="bookmark-item-icon">
      <el-icon :size="20">
        <component :is="itemData?.iconType" />
      </el-icon>
    </div>
    <div class="bookmark-item-name">
      {{ itemData?.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { CategoryItem } from "@/models/linkModel";

export default defineComponent({
  name: "BookmarkItem",
  props: {
    itemData: {
      type: Object as PropType<CategoryItem>,
      require: true,
    },
  },
  setup(props) {
    const data = reactive({});

    const bookmarkItemClick = () => {
      window.open(props.itemData?.href);
    };

    return {
      ...toRefs(data),
      bookmarkItemClick,
    };
  },
});
</script>

<style scoped>
.bookmark-item-box {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.bookmark-item-box:hover {
  transform: translateX(10px);
  transition-duration: 200ms;
}
.bookmark-item-box:hover .bookmark-item-name {
  text-decoration: underline;
}
.bookmark-item-icon {
  color: #4c432e;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bookmark-item-name {
  margin-left: 4px;
  color: #4c432e;
  line-height: 2;
  transition: all 0.25s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
