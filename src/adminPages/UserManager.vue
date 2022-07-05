<template>
  <div class="user-manager-box">
    <div class="index-manager-title">
      <span class="index-manager-title-text">用户列表</span>
      <el-button type="primary" @click="createUserClick">新增用户</el-button>
    </div>
    <el-table :data="userList" style="width: 100%; margin-bottom: 20px">
      <el-table-column prop="uuid" label="UUID" width="200" />
      <el-table-column prop="userName" label="用户名" width="150" />
      <el-table-column prop="password" label="用户密码" width="120" />
      <el-table-column label="用户组" width="90">
        <template #default="scope">
          <el-tag>{{ getUserGroupNameByUUID(scope.row.userGroupUUID) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="OnEditUserClick(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确认删除？（此操作无法恢复）"
            confirm-button-type="danger"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="OnDeleteUserClick(scope.row)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isShowEditUser" :title="userFormTitle" width="80%">
      <el-form label-position="top" :model="userForm" label-width="120px">
        <el-form-item label="用户名：">
          <el-input v-model="userForm.userName" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="userForm.userPassword" />
        </el-form-item>
        <el-form-item label="用户组：">
          <el-select
            v-model="userForm.userGroupUUID"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in userGroupList"
              :key="item.uuid"
              :label="item.groupName"
              :value="item.uuid"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="index-manager-title">
      <span class="index-manager-title-text">用户组列表</span>
      <el-button type="primary" @click="createUserGroupClick">新增用户组</el-button>
    </div>
    <el-table :data="userGroupList" style="width: 100%; margin-bottom: 20px">
      <el-table-column prop="uuid" label="UUID" width="200" />
      <el-table-column prop="groupName" label="用户名" width="150" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="OnEditUserGroupClick(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确认删除？（此操作无法恢复）"
            confirm-button-type="danger"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="OnDeleteUserGroupClick(scope.row)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isShowEditUserGroup" :title="userGroupFormTitle" width="80%">
      <el-form label-position="top" :model="userGroupForm" label-width="120px">
        <el-form-item label="用户组名：">
          <el-input v-model="userGroupForm.groupName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitUserGroup">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import {
  apiGetUserList,
  apiRegisterUser,
  apiGetUserGroupList,
  apiCreateUserGroup,
  apiDeleteUser,
  apiDeleteUserGroup,
  apiModifyUser,
  apiModifyUserGroup,
} from "../apis/user";
import { UserGroupItem } from "../models/linkModel";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "UserManager",
  emits: ["refreshIndexData"],
  setup(props, ctx) {
    const data = reactive({
      userList: [],
      userGroupList: [] as Array<UserGroupItem>,
      isShowEditUser: false,
      isShowEditUserGroup: false,
      userFormType: "" as string,
      userFormTitle: computed(() => {
        switch (data.userFormType) {
          case "Create":
            return "创建用户";
          case "Modify":
            return "编辑用户";
          default:
            return "";
        }
      }),
      userForm: {
        uuid: "" as string,
        userName: "" as string,
        userPassword: "" as string,
        userGroupUUID: "" as string,
      },
      userGroupFormType: "" as string,
      userGroupFormTitle: computed(() => {
        switch (data.userGroupFormType) {
          case "Create":
            return "创建用户组";
          case "Modify":
            return "编辑用户组";
          default:
            return "";
        }
      }),
      userGroupForm: {
        uuid: "",
        groupName: "",
      },
    });

    const initData = () => {
      apiGetUserGroupList().then((res) => {
        data.userGroupList = res.data;
        apiGetUserList().then((res) => {
          data.userList = res.data;
        });
      });
    };
    initData();

    const OnEditUserClick = (value: any) => {
      console.log("编辑用户");
      console.log(value);
      data.userFormType = "Modify";
      data.isShowEditUser = true;
      data.userForm = {
        uuid: value.uuid,
        userName: value.userName,
        userPassword: "",
        userGroupUUID: value.userGroupUUID,
      };
    };
    const OnDeleteUserClick = (value: any) => {
      apiDeleteUser({ uuid: value.uuid }).then((res) => {
        if (res.status == 1) {
          ElNotification({
            title: "成功",
            message: "删除用户成功",
            type: "success",
          });
          initData();
        }
      });
    };
    const OnEditUserGroupClick = (value: UserGroupItem) => {
      console.log("编辑用户组");
      console.log(value);
      data.isShowEditUserGroup = true;
      data.userGroupFormType = "Modify";
      if (value.uuid) {
        data.userGroupForm = {
          uuid: value.uuid,
          groupName: value.groupName,
        };
      }
    };
    const OnDeleteUserGroupClick = (value: UserGroupItem) => {
      console.log("删除用户组");
      console.log(value);
      if (value.uuid) {
        apiDeleteUserGroup({ uuid: value.uuid }).then((res) => {
          if (res.status == 1) {
            ElNotification({
              title: "成功",
              message: "删除用户组",
              type: "success",
            });
            initData();
          } else {
            ElNotification({
              title: "错误",
              message: res.statusText,
              type: "error",
            });
          }
          ctx.emit("refreshIndexData");
        });
      }
    };
    const createUserClick = () => {
      console.log("创建用户");
      data.isShowEditUser = true;
      data.userFormType = "Create";
      data.userForm = {
        uuid: "",
        userName: "",
        userPassword: "",
        userGroupUUID: "",
      };
    };
    const createUserGroupClick = () => {
      data.isShowEditUserGroup = true;
      data.userGroupFormType = "Create";
      data.userGroupForm = {
        uuid: "",
        groupName: "",
      };
    };
    const onSubmit = () => {
      console.log("提交");
      switch (data.userFormType) {
        case "Create":
          apiRegisterUser({
            userName: data.userForm.userName,
            userPassword: data.userForm.userPassword,
            userGroupUUID: data.userForm.userGroupUUID,
          }).then((res) => {
            console.log(res);
            if (res.status == 200) {
              ElNotification({
                title: "成功",
                message: "新建用户成功",
                type: "success",
              });
              initData();
              data.isShowEditUser = false;
            } else {
              ElNotification({
                title: "错误",
                message: res.statusText,
                type: "error",
              });
            }
          });
          break;
        case "Modify":
          apiModifyUser(data.userForm).then((res) => {
            if (res.status == 1) {
              ElNotification({
                title: "成功",
                message: "编辑用户成功",
                type: "success",
              });
              initData();
              data.isShowEditUser = false;
            }
          });
          break;
        default:
          break;
      }
    };
    const onSubmitUserGroup = () => {
      switch (data.userGroupFormType) {
        case "Create":
          apiCreateUserGroup({ groupName: data.userGroupForm.groupName }).then((res) => {
            console.log(res);
            if (res.status == 1) {
              ElNotification({
                title: "成功",
                message: "新建用户组成功",
                type: "success",
              });
              initData();
              data.isShowEditUserGroup = false;
            }
          });
          break;
        case "Modify":
          apiModifyUserGroup(data.userGroupForm).then((res) => {
            if (res.status == 1) {
              ElNotification({
                title: "成功",
                message: "修改用户组成功",
                type: "success",
              });
              initData();
              data.isShowEditUserGroup = false;
            }
          });
          break;
        default:
          break;
      }
      ctx.emit("refreshIndexData");
    };
    const getUserGroupNameByUUID = computed(() => {
      return (uuid: string) => {
        const groupItem = data.userGroupList.find((item) => item.uuid == uuid);
        return groupItem?.groupName;
      };
    });

    return {
      ...toRefs(data),
      OnEditUserClick,
      OnDeleteUserClick,
      OnEditUserGroupClick,
      OnDeleteUserGroupClick,
      createUserClick,
      onSubmit,
      createUserGroupClick,
      onSubmitUserGroup,
      getUserGroupNameByUUID,
    };
  },
});
</script>

<style scoped>
.user-manager-box {
  width: 100vw;
  height: 100vh;
  padding: 80px 30px 0 30px;
}

.edit-user-bg {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.edit-user-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  border: 2px solid skyblue;
  background: white;
  box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.5);
  padding: 10px 30px;
}
.index-manager-title {
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.index-manager-title-text {
  margin-right: 10px;
}
</style>
