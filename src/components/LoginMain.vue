<template>
  <div class="login-box" @click="OnLoginBoxClick">
    <div
      class="login-main"
      ref="LoginMain"
      :class="isLoginLoading ? 'login-loading' : ''"
    >
      <transition name="zoom" mode="out-in">
        <div class="login-main-input-box" v-if="!isLoginSuccess">
          <div class="login-title">账号登录</div>
          <el-input
            prefix-icon="User"
            class="login-input"
            v-model="username"
            placeholder="用户名"
          />
          <el-input
            prefix-icon="Lock"
            class="login-input"
            v-model="password"
            type="password"
            placeholder="密码"
            show-password
          />
          <el-button class="login-btn" type="primary" @click="goLogin" round plain
            >登录</el-button
          >
        </div>

        <div class="login-main-success-box" v-else>
          <span class="login-success-title">登录成功</span>
          <span class="login-success-welcome">欢迎回来</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from "vue";
import { apiLogin } from "@/apis/user";
import { ElLoading, ElMessage } from "element-plus";

export default defineComponent({
  name: "LoginMain",
  emits: ["loginResult", "loginClose"],
  setup(props, { emit }) {
    const data = reactive({
      username: "" as string,
      password: "" as string,
      isLoginLoading: false as boolean,
      isLoginSuccess: false as boolean,
    });

    let LoginMain: HTMLElement;
    onMounted(() => {
      LoginMain = getCurrentInstance()?.refs.LoginMain as HTMLElement;
      console.log(LoginMain);
    });

    const goLogin = () => {
      if (data.username == "" || data.password == "") {
        ElMessage({
          message: "请输入账号与密码",
          type: "warning",
          duration: 1500,
        });
        return;
      }

      data.isLoginLoading = true;
      const loading = ElLoading.service({
        lock: true,
        text: "登录中",
        background: "rgba(0, 0, 0, 0.7)",
      });

      apiLogin({ userName: data.username, userPassword: data.password }).then((res) => {
        console.log(res);

        if (res.status == 200) {
          setTimeout(() => {
            loading.close();
            data.isLoginLoading = false;
            setTimeout(() => {
              ElMessage({
                message: "登陆成功",
                type: "success",
                duration: 1500,
              });
              data.isLoginSuccess = true;
              setTimeout(() => {
                emit("loginResult");
              }, 1000);
            }, 500);
          }, 1000);

          localStorage.setItem("token", res.data.token);
        } else {
          setTimeout(() => {
            loading.close();
            data.isLoginLoading = false;
            ElMessage({
              message: "账号或密码错误",
              type: "warning",
              duration: 1500,
            });
          }, 500);
        }
      });
    };

    const OnLoginBoxClick = (event: MouseEvent) => {
      console.log(event);
      if (LoginMain && !LoginMain.contains(event.target as HTMLElement)) {
        emit("loginClose");
      }
    };

    return {
      ...toRefs(data),
      goLogin,
      OnLoginBoxClick,
    };
  },
});
</script>

<style scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(248, 246, 241, 0.97);
  z-index: 9;
  -webkit-perspective: 800px;
  perspective: 800px;
}
.login-main {
  position: absolute;
  left: 50%;
  top: 40%;
  width: 300px;
  height: 360px;
  -webkit-transition-timing-function: cubic-bezier(0.68, -0.25, 0.265, 0.85);
  -webkit-transition-property: -webkit-transform, opacity, box-shadow, top, left;
  transition-property: transform, opacity, box-shadow, top, left;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transform-origin: 161px 100%;
  -ms-transform-origin: 161px 100%;
  transform-origin: 161px 100%;
  -webkit-transform: translate(-50%, -50%) rotateX(0deg);
  transform: translate(-50%, -50%) rotateX(0deg);
  background: #35394a;
  background: -webkit-gradient(
    linear,
    left bottom,
    right top,
    color-stop(0%, #35394a),
    color-stop(100%, #1f222e)
  );
  background: -webkit-linear-gradient(45deg, #35394a 0%, #1f222e 100%);
  background: linear-gradient(45deg, #35394a 0%, #1f222e 100%);
  padding: 50px 0px;
  box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.login-main-input-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.login-main.login-loading {
  box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
  opacity: 0.6 !important;
  pointer-events: none;
  -webkit-transform: translate(-50%, -50%) rotateX(70deg);
  transform: translate(-50%, -50%) rotateX(70deg);
}
.login-title {
  color: #afb1be;
  font-size: 20px;
  margin-bottom: 30px;
  text-align: start;
  padding-left: 40px;
}
.login-input {
  background: #32364a;
  border-top: 2px solid #393d52;
  border-bottom: 2px solid #393d52;
  padding: 0 25px;
}
.login-input :deep(.el-input__wrapper) {
  background: #32364a;
  box-shadow: none;
}
.login-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}
.login-input :deep(input) {
  background: #32364a;
  color: #afb1be;
}
.login-btn {
  width: 100px;
  height: 36px;
  margin-top: 40px;
  margin-left: 35px;
}
.login-main-success-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 50px;
}
.login-success-title {
  font-size: 20px;
  margin: 20px 0;
  color: #d5d8e2;
}
.login-success-welcome {
  font-size: 14px;
  color: #5b5e6f;
  margin-bottom: 40px;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.42, 0, 0.34, 1.55);
}
.zoom-enter,
.zoom-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.zoom-enter-to,
.zoom-leave {
  transform: translateX(0);
  opacity: 1;
}
</style>
