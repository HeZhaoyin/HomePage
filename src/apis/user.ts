// 导入axios实例
import httpRequest from "@/request/index";
import { UserGroupItem } from "@/models/linkModel";
import {
  ApiDeleteUserModel,
  ApiModifyUserData,
  ApiModifyUserGroupData,
} from "@/models/apiModel";

// 定义接口的传参
interface UserInfoParam {
  userName: string;
  userPassword: string;
  userGroupUUID: string;
}

interface LoginUserModel {
  userName: string;
  userPassword: string;
}

// 登录
export function apiCheckIsLogin() {
  return httpRequest({
    url: "/user/checkIsLogin",
    method: "Get",
  });
}

// 登录
export function apiLogin(param: LoginUserModel) {
  return httpRequest({
    url: "/user/login",
    method: "Post",
    data: param,
  });
}

// 获取用户列表
export function apiGetUserList() {
  return httpRequest({
    url: "/getUserList",
    method: "Get",
  });
}

// 注册
export function apiRegisterUser(param: UserInfoParam) {
  return httpRequest({
    url: "/user/registerUser",
    method: "Post",
    data: param,
  });
}

// 获取用户组列表
export function apiGetUserGroupList() {
  return httpRequest({
    url: "/getUserGroupList",
    method: "Get",
  });
}

// 创建用户组
export function apiCreateUserGroup(param: UserGroupItem) {
  return httpRequest({
    url: "/createUserGroup",
    method: "Post",
    data: param,
  });
}

// 删除用户
export function apiDeleteUser(param: ApiDeleteUserModel) {
  return httpRequest({
    url: "/user/deleteUser",
    method: "Post",
    data: param,
  });
}

// 删除用户组
export function apiDeleteUserGroup(param: ApiDeleteUserModel) {
  return httpRequest({
    url: "/user/deleteUserGroup",
    method: "Post",
    data: param,
  });
}

// 编辑用户
export function apiModifyUser(param: ApiModifyUserData) {
  return httpRequest({
    url: "/user/modifyUser",
    method: "Post",
    data: param,
  });
}

// 编辑用户组
export function apiModifyUserGroup(param: ApiModifyUserGroupData) {
  return httpRequest({
    url: "/user/modifyUserGroup",
    method: "Post",
    data: param,
  });
}
