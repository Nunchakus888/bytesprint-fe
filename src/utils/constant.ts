// 身份
export enum Identification {
  VISITOR = 0, // Regular User
  ENGINEER = 2, // 开发
  OPERATOR = 1, // 运营商
  SYSTEM = 3,
}

export enum IPath {
  TASKS = `tasks`,
  MYREQUIREMENT = `myrequirement`,
  MYTASKS = `mytasks`,
  OPERATOR = `operator`, // Navigator管理
  MYOPERATOR = `myoperator`, // 我的Navigator
  OperatorCheck = `operatorcheck`, // Navigator 认证审核
  MYOPERATORDetail = `myoperatordetail`, // 我的Navigator 详情
  ENGINEERManage = `engineer`, // Tasker 管理
  ENGINEERCheck = `engineercheck`, // Tasker 审核
  MYENGINEER = `myengineer`, // 我的Tasker
  MYENGINEERDetail = `myengineerdetail`, // 我的Tasker详情
  PROFILE = `profile`, // 用户中心
}

export const enum TabsEnum {
  SINGLE_TASK = 'Single Task',
  PERSON_TASK = 'Personnel Requirement',
  ALL_TASK = 'Whole Project',
}
export enum RequirementType {
  Single = 1,
  Person = 2,
  Global = 3,
}
// 需求类型
export const Tabs = [
  {
    label: TabsEnum.SINGLE_TASK,
    value: RequirementType.Single,
  },
  {
    label: TabsEnum.PERSON_TASK,
    value: RequirementType.Person,
  },
  {
    label: TabsEnum.ALL_TASK,
    value: RequirementType.Global,
  },
];

// 众包方式
export enum ProType {
  BIDDING = '1',
  PITCH = '2',
  BID = '3',
}

// 众包方式
export const ProTypes = [
  {
    label: 'Bidding',
    value: ProType.BIDDING,
  },
  {
    label: 'Design Competition',
    value: ProType.PITCH,
  },
  {
    label: 'Quoting',
    value: ProType.BID,
  },
];
// 任务类型
export const TaskTypes = [
  {
    label: 'Regular Task',
    value: '1',
  },
  {
    label: 'Navigator Task',
    value: '2',
  },
];

export enum IStatus {
  CLOSED = '8', //已关闭
  EVALUATION = '0', // 评估中
  WAIT_SIGN = '1', // 待签约
  SIGNED = '2', // 已签约
  CODEING = '3', // 进行中
  WAIT_ACCEPT = '4', //待验收
  ACCEPTED = '5', //已验收
  COMPLETE = '6', // 已完成
  UN_BID = '7', // 未中标
}

export const RequirementStatus = [
  {
    label: 'Closed',
    value: IStatus.CLOSED,
  },
  {
    label: 'Under Evaluation',
    value: IStatus.EVALUATION,
  },
  {
    label: 'Pending Contract',
    value: IStatus.WAIT_SIGN,
  },
  {
    label: 'Contracted',
    value: IStatus.SIGNED,
  },
  {
    label: 'In Progress',
    value: IStatus.CODEING,
  },
  {
    label: 'Pending Acceptance',
    value: IStatus.WAIT_ACCEPT,
  },
  {
    label: 'Completed',
    value: IStatus.COMPLETE,
  },
];

export const TaskStatus = [
  {
    label: 'Pending Contract',
    value: IStatus.WAIT_SIGN,
  },
  {
    label: 'Lose a Bid',
    value: IStatus.UN_BID,
  },
  {
    label: 'Contracted',
    value: IStatus.SIGNED,
  },
  {
    label: 'In Progress',
    value: IStatus.CODEING,
  },
  {
    label: 'Pending Acceptance',
    value: IStatus.WAIT_ACCEPT,
  },
  {
    label: 'Completed',
    value: IStatus.COMPLETE,
  },
];

// 职位类型
export const ProfessionTypes = [
  {
    label: '前端开发',
    value: '1',
  },
  {
    label: '后端开发',
    value: '2',
  },
  {
    label: 'UI设计',
    value: '3',
  },
  {
    label: '测试',
    value: '4',
  },
];

export interface IRequirement {
  projectName: string;
  description: string;
  categoryId: number;
  fileList: string[];
  requirementList: string[];
  contactInfo: string;
}

export interface IRequirementSingle extends IRequirement {
  crowSourcingMethod: number;
  professionType: number;
}
export interface IRequirementPerson extends IRequirement {
  educational: string;
  experience: string;
  workPlace: string;
  workTime: string;
}

// 任务投标状态
export enum TaskBidStatus {
  BID_SUCCESS = '1',
  BID_FAIL = '0',
  WAIT_BID = '2',
}

// 用户身份等级
export const USER_LEVEL = {
  0: `Regular User`,
  1: `Tasker`,
  2: `Craftsman`,
  3: `Pirate`,
};
// 质押状态
export const PledgeStatus = {
  1: `Pledging`,
  2: `Frozen`,
  3: `Withdrawable`,
  4: `Completed`,
};

// 查询类型
export enum QUERYTYPE {
  MY_REQUIREMENT = 1,
  MY_TASKS = 2,
}
