export type RouteQuery = Record<string, string | number | boolean | undefined>;

export const stringifyQuery = (query: RouteQuery | undefined) => {
  if (!query) {
    return "";
  }

  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined)
  ) as Record<string, string>;

  return new URLSearchParams(filteredQuery).toString();
};

const createRoute = (path: string, query?: RouteQuery) => {
  if (!query) {
    return path;
  }
  return `${path}?${stringifyQuery(query)}`;
};

type EthAddress = `0x${string}` | undefined;

const API_ROUTERS = {
  tasks: {
    TASKS_LIST: (params: any) => createRoute(`/project/list`, params),
    TASKS_DETAIL: (params: any) => createRoute(`/project/detail`, params),
  },
  users: {
    LOGIN: (params: any) => createRoute(`/user/info`, params),
    SIG_STATUS: (params: any) =>createRoute(`/user/info`, params), 
    LOGIN_MESSAGE: (params: any) =>createRoute(`/user/info`, params),
  },
  
  bidorder: {
    BID_ORDERS: (params: any) => createRoute(`/api/v1/bid-orders`, params),
  },
};

export default API_ROUTERS;
