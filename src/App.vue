<template>
  <div class="home-page-box">
    <transition name="fade-in" mode="out-in">
      <login-main
        v-if="isShowLoginPage"
        @login-result="OnLoginResult"
        @login-close="OnLoginClose"
      ></login-main>
    </transition>

    <div class="search-box">
      <input
        type="text"
        class="search-input"
        v-model="searchText"
        @input="searchChange"
        @blur="searchBlur"
        placeholder="搜索"
      />
      <div class="search-icon">
        <el-icon :size="22"><Search /></el-icon>
      </div>
      <el-scrollbar class="search-result-box" :always="true" v-show="isSearching">
        <span class="search-result-null-text" v-if="isSearchNoResult">无结果</span>
        <search-result-item
          v-else
          v-for="(item, index) in searchResultList"
          v-bind:key="index"
          :result-data="item"
          @click="resultClick(item)"
        ></search-result-item>
      </el-scrollbar>
    </div>

    <div class="title-box">
      <div class="title-box-left">
        <div class="time-box">{{ timeStr }}</div>
        <div class="title-name">
          {{ title }}
        </div>
      </div>
      <div class="title-box-right">
        <el-button
          type="primary"
          v-if="!isLogin"
          round
          plain
          @click="isShowLoginPage = true"
          >登录</el-button
        >
        <el-button type="primary" v-else round plain @click="OnLoginoutBtnClick"
          >注销</el-button
        >
      </div>
    </div>

    <div class="app-box">
      <div class="app-box-title">应用</div>
      <div class="app-list-box">
        <app-item
          @click="appClick(item)"
          v-for="(item, index) in appList"
          :app-data="item"
          v-bind:key="index"
        ></app-item>
      </div>
    </div>

    <div class="bookmark-box">
      <div class="bookmark-box-title">书签</div>
      <div class="bookmark-main">
        <bookmark-category
          v-for="(item, index) in categoryList"
          v-bind:key="index"
          :category-info="item"
        ></bookmark-category>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import AppItem from "@/components/AppItem.vue";
import BookmarkCategory from "@/components/BookmarkCategory.vue";
import SearchResultItem from "@/components/SearchResultItem.vue";
import LoginMain from "@/components/LoginMain.vue";
import { AppInfo, CategoryInfo, CategoryItem } from "@/models/linkModel";
import { apiGetDataList, apiGetDataListWithToken } from "@/apis/data";
import { formatDate } from "@/utils/DateFormat";

export default defineComponent({
  name: "App",
  components: { AppItem, BookmarkCategory, SearchResultItem, LoginMain },
  setup() {
    const data = reactive({
      timeStr: formatDate(new Date(), "yyyy年MM月dd日 星期D hh:mm:ss") as string,
      title: "导航页" as string,
      appList: [] as Array<AppInfo>,
      categoryList: [] as Array<CategoryInfo>,
      searchText: "" as string,
      isSearching: false as boolean,
      isSearchNoResult: true as boolean,
      searchResultList: [] as Array<AppInfo | CategoryItem>,
      isShowLoginPage: false as boolean,
      isLogin: (localStorage.getItem("token") ? true : false) as boolean,
    });

    setInterval(() => {
      data.timeStr = formatDate(new Date(), "yyyy年MM月dd日 星期D hh:mm:ss");
    }, 1000);

    const appClick = (item: AppInfo) => {
      window.open(item.href);
    };

    const searchByKeyWord = (key: string) => {
      data.appList.forEach((item: AppInfo) => {
        if (
          item.name.toLowerCase().indexOf(key.toLowerCase(), 0) != -1 ||
          item.href.toLowerCase().indexOf(key.toLowerCase(), 0) != -1
        ) {
          data.searchResultList.push(item);
        }
      });

      data.categoryList.forEach((category: CategoryInfo) => {
        category.category?.forEach((item: CategoryItem) => {
          if (
            item.name.toLowerCase().indexOf(key.toLowerCase(), 0) != -1 ||
            item.href.toLowerCase().indexOf(key.toLowerCase(), 0) != -1
          ) {
            data.searchResultList.push(item);
          }
        });
      });
    };

    const searchChange = () => {
      data.searchResultList = [];
      searchByKeyWord(data.searchText);
      if (data.searchText == "") {
        data.isSearching = false;
        return;
      }
      data.isSearching = true;
      if (data.searchResultList.length == 0) {
        data.isSearchNoResult = true;
      } else {
        data.isSearchNoResult = false;
      }
    };
    const searchBlur = () => {
      setTimeout(() => {
        data.searchText = "";
        data.isSearching = false;
      }, 100);
    };
    const resultClick = (item: CategoryItem | AppInfo) => {
      // window.location.href = item.href;
      window.open(item.href);
    };

    // data.appList = ;
    // data.categoryList =
    const GetDataList = () => {
      if (localStorage.getItem("token")) {
        apiGetDataListWithToken().then((res) => {
          data.appList = res.data.app;
          data.categoryList = res.data.category;
        });
      } else {
        apiGetDataList().then((res) => {
          console.log(res);
          data.appList = res.data.app;
          data.categoryList = res.data.category;
        });
      }
    };
    GetDataList();

    const OnLoginResult = () => {
      data.isShowLoginPage = false;
      data.isLogin = true;
      GetDataList();
    };
    const OnLoginClose = () => {
      data.isShowLoginPage = false;
    };

    document.title = data.title;

    const OnLoginoutBtnClick = () => {
      localStorage.removeItem("token");
      data.isLogin = false;
      GetDataList();
    };

    return {
      ...toRefs(data),
      appClick,
      searchChange,
      searchBlur,
      resultClick,
      OnLoginResult,
      OnLoginClose,
      OnLoginoutBtnClick,
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

@media (max-width: 1200px) {
  .home-page-box {
    width: 90%;
    margin: 0 auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 20px;
    user-select: none;
  }
}

@media (min-width: 1201px) {
  .home-page-box {
    width: 90%;
    margin: 0 auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 50px 250px;
    user-select: none;
  }
}

.search-box {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
  color: #aa9a73;
}

.search-input {
  width: 100%;
  padding: 10px 0 10px 40px;
  color: #4c432e;
  font-size: 20px;
  background-color: transparent;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid #aa9a73;
  opacity: 0.5;
  transition: all 0.2s;
  outline: none;
}
.search-input:focus {
  padding-left: 0;
}
.search-input:focus + .search-icon {
  -webkit-animation: searchmove 0.5s 1; /* Chrome, Safari, Opera */
  animation: searchmove 0.5s 1;
  animation-fill-mode: forwards;
}
@-webkit-keyframes searchmove {
  from {
    left: 0;
    transform: translate(0, -50%);
  }
  to {
    left: 100%;
    transform: translate(-100%, -50%);
  }
}

/* Standard syntax */
@keyframes searchmove {
  from {
    left: 0;
    transform: translate(0, -50%);
  }
  to {
    left: 100%;
    transform: translate(-100%, -50%);
  }
}

.search-result-box {
  width: 100%;
  height: 200px;
  background: rgba(235, 235, 235, 1);
  position: absolute;
  right: 0;
  z-index: 99;
}
.search-result-null-text {
  font-size: 20px;
  color: black;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.title-box-left {
}
.title-box-right {
  display: flex;
}

.time-box {
  color: #4c432e;
  text-align: left;
  font-weight: 300;
}
.title-name {
  font-weight: 700;
  font-size: 4em;
  text-align: left;
  color: #4c432e;
}
.weather-logo {
  width: 40px;
  height: 40px;
}
.weather-info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #4c432e;
  font-weight: 300;
  text-transform: uppercase;
}

.app-box {
  margin: 2rem 0;
}
.app-box-title {
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
  color: #4c432e;
}
.app-list-box {
  display: flex;
  flex-wrap: wrap;
}

.bookmark-box {
}
.bookmark-box-title {
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
  color: #4c432e;
}
.bookmark-main {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.3s cubic-bezier(0.42, 0, 0.34, 1.55);
}
.fade-in-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}
.fade-in-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.fade-in-enter-to,
.fade-in-leave {
  transform: translateX(0);
  opacity: 1;
}
</style>
