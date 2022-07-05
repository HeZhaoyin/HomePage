<template>
  <div>
    <login-main v-if="isShowLoginMain" @login-result="adminLoginResult"></login-main>
    <div v-else>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-box"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="1">标签管理</el-menu-item>
        <el-menu-item index="2">用户管理</el-menu-item>
        <el-button type="danger" class="logout-btn" @click="OnLogoutAccount"
          >注销账户</el-button
        >
      </el-menu>
      <index-manager ref="indexManagerRef" v-show="activeIndex == '1'"></index-manager>
      <user-manager
        @refreshIndexData="refreshIndexData"
        v-show="activeIndex == '2'"
      ></user-manager>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs } from "vue";
import LoginMain from "@/components/LoginMain.vue";
import IndexManager from "@/adminPages/IndexManager.vue";
import UserManager from "@/adminPages/UserManager.vue";
import { apiCheckIsLogin } from "@/apis/user";

export default defineComponent({
  name: "AdminPage",
  components: {
    LoginMain,
    IndexManager,
    UserManager,
  },
  setup() {
    const data = reactive({
      isShowLoginMain: false as boolean,
      activeIndex: "1" as string,
    });

    onBeforeMount(() => {
      apiCheckIsLogin().then(
        (res) => {
          console.log("thisis check login");
          console.log(res);
        },
        () => {
          console.log("thisis check login error");
          data.isShowLoginMain = true;
        }
      );
    });

    const indexManagerRef = ref();

    const adminLoginResult = () => {
      data.isShowLoginMain = false;
    };
    const handleSelect = (index: string) => {
      console.log(index);
      data.activeIndex = index;
    };
    const OnLogoutAccount = () => {
      localStorage.removeItem("token");
      location.reload();
    };

    const refreshIndexData = () => {
      indexManagerRef.value.initData();
    };

    return {
      indexManagerRef,
      ...toRefs(data),
      adminLoginResult,
      handleSelect,
      OnLogoutAccount,
      refreshIndexData,
    };
  },
});
</script>

<style>
body {
  margin: 0;
  font-size: 14px;
  background-color: #f8f6f1;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.el-menu-box {
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
}
</style>
<style scoped>
.logout-btn {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
