interface AppInfo {
  uuid?: string;
  name: string;
  href: string;
  iconType: string;
  groupData?: Array<string>;
}

interface CategoryItem {
  uuid?: string;
  name: string;
  href: string;
  iconType: string;
  categoryTypeUUID: string;
  groupData?: Array<string>;
}

interface CategoryInfo {
  uuid?: string;
  categoryName: string;
  category?: Array<CategoryItem>;
  groupData?: Array<string>;
}

interface ApiModifyCategoryInfo {
  uuid?: string;
  categoryName: string;
}

interface CategoryTypeListItem {
  uuid: string;
  categoryName: string;
}

interface UserGroupItem {
  uuid?: string;
  groupName: string;
}

export {
  AppInfo,
  CategoryItem,
  CategoryInfo,
  ApiModifyCategoryInfo,
  CategoryTypeListItem,
  UserGroupItem,
};
