export type RouteQuery = Record<string, string | number | boolean | undefined>;

export const stringifyQuery = (query: RouteQuery | undefined) => {
  if (!query) {
    return '';
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

const API_ROUTERS = {
  tasks: {
    TASKS_LIST: (params: any) => createRoute(`/api/project/list`, params),
    TASKS_DETAIL: (params: any) => createRoute(`/api/project/detail`, params),
    EVALUATE: `/api/project/evaluate`,
    PLANSUBMIT: `/api/requirement/plan/submit`,
    PLAN_COMPLETE: `/api/requirement/finish`,
    // 项目验收
    REQUIREMENT_SUBMIT: `/api/project/pendingAccept`,
    PROJECT_SIGN: `/api/project/sign`,
    PROJECT_UNSIGN: `/api/project/unsign`,
    PROJECT_ACCEPT: `/api/project/accept`,
    TASKS_LIST_MINI: (params: any) => createRoute(`/api/project/listByUser`, params),
    // 发布需求
    PROJECT_SUBMIT: `/api/project/submit`,
    FILE_UPLOAD: `/file/upload`,
    TASK_OPEN: `/api/project/open`,
    TASK_CLOSE: `/api/project/close`,
  },
  users: {
    LOGIN: `/api/passport/login`,
    SIG_STATUS: '/api/passport/sign', // (params: any) =>createRoute(`/sign`, params),
    LOGOUT: `/api/passport/logout`,
    USER_INFO: (params?: any) => createRoute(`/api/user/info`, params),
    USER_UPDATE: `/api/user/update`,
    MY_PLEDGE: (params?: any) => createRoute(`/api/user/stakings`, params),
    // LOGIN_MESSAGE: (params: any) =>createRoute(`/user/info`, params),
    CERTIF_ENGINEER: () => createRoute(`/api/user/certify/engineer`),
    MY_REWARDS: (params?: any) => createRoute(`/api/user/rewards`, params),
    STAKING_WITHDRAW: '/user/stakings/withdraw',
    REWARDS_WITHDRAW: '/rewards/withdraw',
  },
  positions: {
    LIST_ENGINEER: (params: any) => createRoute(`/api/position/list/engineer`, params),
  },
};

export default API_ROUTERS;
