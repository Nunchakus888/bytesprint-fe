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
    TASKS_LIST: (params: any) => createRoute(`/project/list`, params),
    TASKS_DETAIL: (params: any) => createRoute(`/project/detail`, params),
    EVALUATE: `/project/evaluate`,
    PLANSUBMIT: `/requirement/plan/submit`,
    PLAN_COMPLETE: `/requirement/finish`,
    // 项目验收
    REQUIREMENT_SUBMIT: `/project/pendingAccept`,
    PROJECT_SIGN: `/project/sign`,
    PROJECT_UNSIGN: `/project/unsign`,
    PROJECT_ACCEPT: `/project/accept`,
    TASKS_LIST_MINI: (params: any) => createRoute(`/project/listByUser`, params),
    // 发布需求
    PROJECT_SUBMIT: `/project/submit`,
    FILE_UPLOAD: `/file/upload`,
    TASK_OPEN: `/project/open`,
    TASK_CLOSE: `/project/close`,
  },
  users: {
    LOGIN: `/passport/login`,
    SIG_STATUS: '/passport/sign', // (params: any) =>createRoute(`/sign`, params),
    LOGOUT: `/passport/logout`,
    USER_INFO: (params?: any) => createRoute(`/user/info`, params),
    USER_UPDATE: `/user/update`,
    MY_PLEDGE: (params?: any) => createRoute(`/user/stakings`, params),
    // LOGIN_MESSAGE: (params: any) =>createRoute(`/user/info`, params),
    CERTIF_ENGINEER: () => createRoute(`/user/certify/engineer`),
  },
  positions: {
    LIST_ENGINEER: (params: any) => createRoute(`/position/list/engineer`, params),
  },
};

export default API_ROUTERS;
