<template>
  <div class="index-manager-box">
    <div class="index-manager-title">
      <span class="index-manager-title-text">APP</span>
      <el-button type="success" @click="handleAppEdit(null, null, 'AppCreate')"
        >新建APP</el-button
      >
    </div>
    <!-- APP列表 -->
    <el-table
      :data="appList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="iconType" label="图标" width="100" />
      <el-table-column prop="iconType" label="图标预览" width="90">
        <template #default="scope">
          <el-icon :size="32">
            <component :is="scope.row.iconType" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="href" label="链接" width="280" />
      <!-- <el-table-column prop="uuid" label="UUID" width="200" /> -->
      <el-table-column label="显示的用户组" width="200">
        <template #default="scope">
          <el-checkbox-group
            v-model="scope.row.groupDataName"
            @change="handleAppGroupDataChange(scope.row)"
          >
            <el-checkbox
              v-for="item in userGroupList"
              v-bind:key="item.uuid"
              :label="item.groupName"
            />
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleAppEdit(scope.$index, scope.row, 'AppEdit')"
            >编辑</el-button
          >
          <el-popconfirm
            title="确认删除？（此操作无法恢复）"
            confirm-button-type="danger"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleAppDelete(scope.$index, scope.row, 'APP')"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="index-manager-title">
      <span class="index-manager-title-text">标签</span>
      <el-button type="success" @click="handleAppEdit(null, null, 'CategoryTypeCreate')"
        >新建标签类</el-button
      >
    </div>
    <!-- 标签列表 -->
    <el-table
      :data="categoryList"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'category', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name, categoryName" label="名称" width="180">
        <template #default="scope">
          {{ scope.row.categoryName ? scope.row.categoryName : scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="iconType" label="图标" width="100" />
      <el-table-column prop="iconType" label="图标预览" width="90">
        <template #default="scope">
          <el-icon :size="32">
            <component :is="scope.row.iconType" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="href" label="链接" width="280" />
      <!-- <el-table-column prop="uuid" label="UUID" width="200" /> -->
      <el-table-column label="显示的用户组" width="200">
        <template #default="scope">
          <el-checkbox-group
            v-model="scope.row.groupDataName"
            @change="handleCategoryGroupDataChange(scope.row)"
          >
            <el-checkbox
              v-for="item in userGroupList"
              v-bind:key="item.uuid"
              :label="item.groupName"
            />
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            v-if="scope.row.categoryName"
            size="small"
            type="success"
            @click="
              handleAppEdit(null, { categoryTypeUUID: scope.row.uuid }, 'CategoryCreate')
            "
          >
            新建子标签
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleAppEdit(scope.$index, scope.row, 'CategoryEdit')"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确认删除？（此操作无法恢复）"
            confirm-button-type="danger"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="
              handleAppDelete(
                scope.$index,
                scope.row,
                scope.row.categoryName ? 'CATEGORYTYPE' : 'CATEGORY'
              )
            "
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isShowEditPanel" :title="editPanelTitle" width="80%">
      <el-form v-if="editPanelType == 'App'" :model="editAppForm" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="editAppForm.name" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input @click="dialogVisible = true" v-model="editAppForm.iconType">
          </el-input>
          <el-dialog
            v-model="dialogVisible"
            title="请选择图标"
            width="80%"
            :before-close="handleClose"
          >
            <div style="display: flex; flex-wrap: wrap">
              <div
                v-for="(name, index) in icons"
                :index="index"
                :key="index"
                style="cursor: pointer; padding: 1rem"
                :class="editAppForm.iconType === name ? 'red' : ''"
                @click="handleIconSelect(name)"
              >
                <component :is="name" style="width: 1.5rem; height: 1.5rem"> </component>
              </div>
            </div>
          </el-dialog>
        </el-form-item>
        <el-form-item label="图标预览">
          <el-icon :size="24">
            <component :is="editAppForm.iconType" />
          </el-icon>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="editAppForm.href" />
        </el-form-item>
        <el-button size="small" type="primary" @click="handleEditConfirm">
          保存
        </el-button>
      </el-form>

      <el-form
        v-if="editPanelType == 'Category'"
        :model="editCategoryForm"
        label-width="120px"
      >
        <el-form-item label="名称">
          <el-input v-model="editCategoryForm.name" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input @click="dialogVisible = true" v-model="editCategoryForm.iconType">
          </el-input>
          <el-dialog
            v-model="dialogVisible"
            title="请选择图标"
            width="80%"
            :before-close="handleClose"
          >
            <div style="display: flex; flex-wrap: wrap">
              <div
                v-for="(name, index) in icons"
                :index="index"
                :key="index"
                style="cursor: pointer; padding: 1rem"
                :class="editCategoryForm.iconType === name ? 'red' : ''"
                @click="handleIconSelect(name)"
              >
                <component :is="name" style="width: 1.5rem; height: 1.5rem"> </component>
              </div>
            </div>
          </el-dialog>
        </el-form-item>
        <el-form-item label="图标预览">
          <el-icon :size="24">
            <component :is="editCategoryForm.iconType" />
          </el-icon>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="editCategoryForm.href" />
        </el-form-item>
        <el-form-item label="标签分类" v-if="editPanelType == 'Category'">
          <el-select
            v-model="editCategoryForm.categoryTypeUUID"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in categoryTypeList"
              :key="item.uuid"
              :label="item.categoryName"
              :value="item.uuid"
            />
          </el-select>
        </el-form-item>
        <el-button size="small" type="primary" @click="handleEditConfirm">
          保存
        </el-button>
      </el-form>

      <el-form
        v-if="editPanelType == 'CategoryType'"
        :model="editCategoryTypeForm"
        label-width="120px"
      >
        <el-form-item label="名称">
          <el-input v-model="editCategoryTypeForm.categoryName" />
        </el-form-item>
        <el-button size="small" type="primary" @click="handleEditConfirm">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import {
  apiGetAllDataList,
  apiModifyApp,
  apiModifyCategoryType,
  apiModifyCategory,
  modifyAppGroupData,
  modifyCategoryGroupData,
  apideleteAppOrCategoryData,
} from "@/apis/data";
import { apiGetUserGroupList } from "@/apis/user";
import {
  AppInfo,
  CategoryInfo,
  CategoryItem,
  ApiModifyCategoryInfo,
  UserGroupItem,
  CategoryTypeListItem,
} from "@/models/linkModel";
import {
  ClientAppInfo,
  ClientCategoryItem,
  ClientCategoryInfo,
} from "@/models/dataModel";
import * as ElIcons from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "IndexManager",
  components: { ...ElIcons },
  setup(props, ctx) {
    const getData = () => {
      let icons = [];
      for (const name in ElIcons) {
        icons.push(name);
      }
      return icons;
    };
    const data = reactive({
      icons: getData(),
      dialogVisible: false as boolean,
      appList: [] as Array<ClientAppInfo>,
      categoryList: [] as Array<ClientCategoryInfo>,
      isShowEditPanel: false as boolean,
      editPanelTitle: "" as string,
      editPanelType: "" as string,
      editAppForm: {} as ClientAppInfo,
      editCategoryForm: {} as ClientCategoryItem,
      editCategoryTypeForm: {} as ClientCategoryInfo,
      categoryTypeList: [] as Array<CategoryTypeListItem>,
      userGroupList: [] as Array<UserGroupItem>,
    });

    const getDataList = () => {
      apiGetAllDataList().then((res) => {
        console.log(res);
        data.appList = [];
        // APP数据
        res.data.app.forEach((item: AppInfo) => {
          const tempGroupDataName = [] as Array<string>;
          item.groupData?.forEach((strGroupUUID) => {
            const tempGroupData = data.userGroupList.find(
              (groupData) => groupData.uuid == strGroupUUID
            );
            if (tempGroupData) {
              tempGroupDataName.push(tempGroupData.groupName);
            }
          });
          data.appList.push({ ...item, groupDataName: tempGroupDataName });
        });
        // 书签数据
        data.categoryList = [];
        res.data.category.forEach((item: CategoryInfo) => {
          const tempGroupDataName = [] as Array<string>;
          item.groupData?.forEach((strGroupUUID) => {
            const tempGroupData = data.userGroupList.find(
              (groupData) => groupData.uuid == strGroupUUID
            );
            if (tempGroupData) {
              tempGroupDataName.push(tempGroupData.groupName);
            }
          });
          const tempCategroyChildrenList = [] as Array<ClientCategoryItem>;
          item.category?.forEach((categroyChild: CategoryItem) => {
            const tempChildGroupDataName = [] as Array<string>;
            categroyChild.groupData?.forEach((strGroupUUID) => {
              const tempGroupData = data.userGroupList.find(
                (groupData) => groupData.uuid == strGroupUUID
              );
              if (tempGroupData) {
                tempChildGroupDataName.push(tempGroupData.groupName);
              }
            });
            tempCategroyChildrenList.push({
              ...categroyChild,
              groupDataName: tempChildGroupDataName,
            });
          });
          data.categoryList.push({
            ...item,
            category: tempCategroyChildrenList,
            groupDataName: tempGroupDataName,
          });
        });

        data.categoryTypeList = [];
        res.data.category.forEach((item: CategoryTypeListItem) => {
          data.categoryTypeList.push({
            uuid: item.uuid,
            categoryName: item.categoryName,
          });
        });
      });
    };
    const getUserGroupData = async () => {
      apiGetUserGroupList().then((res) => {
        data.userGroupList = res.data;
      });
    };

    const initData = () => {
      getUserGroupData().then(() => {
        getDataList();
      });
    };

    initData();

    const handleAppEdit = (index: any, row: any, editType: string) => {
      console.log(index, row);
      switch (editType) {
        case "AppEdit":
          data.editPanelTitle = "编辑APP";
          data.editPanelType = "App";
          data.editAppForm = { ...row };
          break;
        case "CategoryEdit":
          if (row.categoryName) {
            data.editCategoryTypeForm = { ...row };
            data.editPanelTitle = "编辑标签类";
            data.editPanelType = "CategoryType";
          } else {
            data.editPanelTitle = "编辑标签";
            data.editPanelType = "Category";
            data.editCategoryForm = { ...row };
          }
          break;
        case "AppCreate":
          data.editPanelTitle = "新建APP";
          data.editPanelType = "App";
          data.editAppForm = {
            name: "",
            href: "",
            iconType: "",
          };
          break;
        case "CategoryCreate":
          data.editPanelTitle = "新建标签";
          data.editPanelType = "Category";
          data.editCategoryForm = {
            name: "",
            href: "",
            iconType: "",
            categoryTypeUUID: row.categoryTypeUUID,
          };
          break;
        case "CategoryTypeCreate":
          data.editPanelTitle = "新建标签类";
          data.editPanelType = "CategoryType";
          data.editCategoryTypeForm = {
            categoryName: "",
          };
          break;
        default:
          break;
      }
      data.isShowEditPanel = true;
    };
    const handleAppDelete = (index: any, row: any, type: string) => {
      apideleteAppOrCategoryData({ uuid: row.uuid, type: type }).then((res) => {
        if (res.status == 1) {
          ElNotification({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
          getDataList();
        }
      });
    };

    const handleClose = () => {
      data.dialogVisible = false;
    };
    const handleIconSelect = (name: string) => {
      switch (data.editPanelType) {
        case "App":
          data.editAppForm.iconType = name;
          break;
        case "Category":
          data.editCategoryForm.iconType = name;
          break;
        default:
          break;
      }

      handleClose();
    };

    const handleEditConfirm = () => {
      const tempCategoryTypeData: ApiModifyCategoryInfo = {
        uuid: data.editCategoryTypeForm.uuid,
        categoryName: data.editCategoryTypeForm.categoryName,
      };
      switch (data.editPanelType) {
        case "App":
          apiModifyApp(data.editAppForm).then((res) => {
            console.log(res);
            if (res.status == 1) {
              getDataList();
              ElNotification({
                title: "成功",
                message: "新建/修改APP数据成功",
                type: "success",
              });
              data.isShowEditPanel = false;
            }
          });
          break;

        case "Category":
          apiModifyCategory(data.editCategoryForm).then((res) => {
            if (res.status == 1) {
              getDataList();
              ElNotification({
                title: "成功",
                message: "新建/修改APP数据成功",
                type: "success",
              });
              data.isShowEditPanel = false;
            }
          });
          break;

        case "CategoryType":
          apiModifyCategoryType(tempCategoryTypeData).then((res) => {
            console.log(res);
            if (res.status == 1) {
              getDataList();
              ElNotification({
                title: "成功",
                message: "新建/修改APP数据成功",
                type: "success",
              });
              data.isShowEditPanel = false;
            }
          });
          break;
        default:
          break;
      }
    };
    const groupDataIDTogroupDataName = computed(() => {
      return (groupData: Array<string>) => {
        const arrGroupDataName = [] as Array<string>;
        groupData?.forEach((item) => {
          data.userGroupList.forEach((userGroup) => {
            if (userGroup.uuid == item) {
              arrGroupDataName.push(userGroup.groupName);
            }
          });
        });
        return arrGroupDataName;
      };
    });
    const handleAppGroupDataChange = (value: ClientAppInfo) => {
      console.log(value);
      value.groupData = [];
      value.groupDataName?.forEach((groupName: string) => {
        const tempUUID = data.userGroupList.find((item) => item.groupName == groupName)
          ?.uuid;
        if (tempUUID) {
          value.groupData?.push(tempUUID);
        }
      });
      if (value.uuid) {
        modifyAppGroupData({
          uuid: value.uuid,
          groupData: value.groupData,
        }).then((res) => {
          if (res.status == 1) {
            getDataList();
            ElNotification({
              title: "成功",
              message: "修改APP显示用户组成功",
              type: "success",
            });
          }
        });
      }
    };

    const handleCategoryGroupDataChange = (
      value: ClientCategoryInfo | ClientCategoryItem
    ) => {
      console.log(value);
      value.groupData = [];
      value.groupDataName?.forEach((groupName: string) => {
        const tempUUID = data.userGroupList.find((item) => item.groupName == groupName)
          ?.uuid;
        if (tempUUID) {
          value.groupData?.push(tempUUID);
        }
      });
      if (value.uuid) {
        modifyCategoryGroupData({
          uuid: value.uuid,
          groupData: value.groupData,
        }).then((res) => {
          if (res.status == 1) {
            getDataList();
            ElNotification({
              title: "成功",
              message: "修改标签显示用户组成功",
              type: "success",
            });
          }
        });
      }
    };

    return {
      ...toRefs(data),
      initData,
      handleAppEdit,
      handleAppDelete,
      handleClose,
      handleIconSelect,
      handleEditConfirm,
      groupDataIDTogroupDataName,
      handleAppGroupDataChange,
      handleCategoryGroupDataChange,
    };
  },
});
</script>

<style scoped>
.index-manager-box {
  width: 100vw;
  height: 100vh;
  padding: 80px 30px 0 30px;
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
