interface ClientAppInfo {
  uuid?: string;
  name: string;
  href: string;
  iconType: string;
  groupData?: Array<string>;
  groupDataName?: Array<string>;
}

interface ClientCategoryItem {
  uuid?: string;
  name: string;
  href: string;
  iconType: string;
  categoryTypeUUID: string;
  groupData?: Array<string>;
  groupDataName?: Array<string>;
}

interface ClientCategoryInfo {
  uuid?: string;
  categoryName: string;
  category?: Array<ClientCategoryItem>;
  groupData?: Array<string>;
  groupDataName?: Array<string>;
}

export { ClientAppInfo, ClientCategoryItem, ClientCategoryInfo };
