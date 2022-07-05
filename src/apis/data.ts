// 导入axios实例
import httpRequest from "@/request/index";
import {
  AppInfo,
  ApiModifyCategoryInfo,
  CategoryItem,
} from "@/models/linkModel";
import { ApiModifyGroupData, ApiModifyAppGroupData } from "@/models/apiModel";

// 获取标签列表
export function apiGetDataList() {
  return httpRequest({
    url: "/getDataList",
    method: "Get",
  });
}

// 当存在Token时获取数据列表
export function apiGetDataListWithToken() {
  return httpRequest({
    url: "/getDataListWithToken",
    method: "Get",
  });
}

// 获取所有标签列表
export function apiGetAllDataList() {
  return httpRequest({
    url: "/getAllDataList",
    method: "Get",
  });
}

// 新增/修改APP
export function apiModifyApp(param: AppInfo) {
  return httpRequest({
    url: "/modifyApp",
    method: "Post",
    data: param,
  });
}

// 删除APP
export function apideleteAppOrCategoryData(param: ApiModifyAppGroupData) {
  return httpRequest({
    url: "/deleteAppOrCategoryData",
    method: "Post",
    data: param,
  });
}

// 修改APP显示的用户组
export function modifyAppGroupData(param: ApiModifyGroupData) {
  return httpRequest({
    url: "/modifyAppGroupData",
    method: "Post",
    data: param,
  });
}

// 修改书签显示的用户组
export function modifyCategoryGroupData(param: ApiModifyGroupData) {
  return httpRequest({
    url: "/modifyCategoryGroupData",
    method: "Post",
    data: param,
  });
}

// 修改书签
export function apiModifyCategory(param: CategoryItem) {
  return httpRequest({
    url: "modifyCategory",
    method: "Post",
    data: param,
  });
}

// 修改书签组
export function apiModifyCategoryType(param: ApiModifyCategoryInfo) {
  return httpRequest({
    url: "/modifyCategoryType",
    method: "Post",
    data: param,
  });
}
