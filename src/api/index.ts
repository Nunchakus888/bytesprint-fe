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
    EVALUATE: (params: any) => createRoute(`/project/evaluate`, params),
    PLANSUBMIT: (params: any) => createRoute(`/requirement/plan/submit`, params),
    PLAN_COMPLETE: (params: any) => createRoute(`/requirement/finish`, params),
    REQUIREMENT_SUBMIT: (params: any) => createRoute(`/requirement/submit`, params),
    PROJECT_SIGN: (params: any) => createRoute(`/project/sign`, params),
    PROJECT_ACCEPT: (params: any) => createRoute(`/project/accept`, params),
  },
  users: {
    LOGIN: `/passport/login`,
    SIG_STATUS: '/passport/sign' , // (params: any) =>createRoute(`/sign`, params),
    LOGOUT: (params?: any) =>createRoute(`/passport/logout`, params),
    USER_INFO: (params?: any) =>createRoute(`/user/info`, params),
    USER_UPDATE: `/user/update`,
    // LOGIN_MESSAGE: (params: any) =>createRoute(`/user/info`, params),
  },
  
  bidorder: {
    BID_ORDERS: (params: any) => createRoute(`/api/v1/bid-orders`, params),
  },

  positions: {
    LIST_ENGINEER: (params: any) => createRoute(`/position/list/engineer`, params),
  }
};

export default API_ROUTERS;
