interface LoginResult {
  code: number;
  result: boolean;
  token: string;
}

interface ApiModifyGroupData {
  uuid: string;
  groupData?: Array<string>;
}

interface ApiModifyAppGroupData {
  uuid: string;
  type: string;
}

interface ApiDeleteUserModel {
  uuid: string;
}

interface ApiModifyUserData {
  uuid: string;
  userName: string;
  userPassword: string;
  userGroupUUID: string;
}

interface ApiModifyUserGroupData {
  uuid: string;
  groupName: string;
}

export {
  LoginResult,
  ApiModifyGroupData,
  ApiModifyAppGroupData,
  ApiDeleteUserModel,
  ApiModifyUserData,
  ApiModifyUserGroupData,
};
