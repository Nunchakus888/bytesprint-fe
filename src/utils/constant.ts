// 身份
export enum Identification {
  VISITOR = 99,
  ENGINEER = 1,
  OPERATOR = 2,
}

export enum IPath {
  TASKS = `tasks`,
  MYREQUIREMENT = `myrequirement`,
  MYTASKS = `mytasks`,
}

export const enum TabsEnum {
  SINGLE_TASK = '单一任务',
  PERSON_TASK = '人员需求',
  ALL_TASK = '整包项目',
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

export enum ProType {
  BIDDING = '1',
  PITCH = '2',
  BID = '3',
}

// 众包方式
export const ProTypes = [
  {
    label: '竞标',
    value: ProType.BIDDING,
  },
  {
    label: '比稿',
    value: ProType.PITCH,
  },
  {
    label: '出价',
    value: ProType.BID,
  },
];
// 任务类型
export const TaskTypes = [
  {
    label: '普通任务',
    value: '1',
  },
  {
    label: '船长任务',
    value: '2',
  },
];

export enum IStatus {
  CLOSED = '1', //已关闭
  EVALUATION = '2', // 评估中
  WAIT_SIGN = '3', // 待签约
  SIGNED = '4', // 已签约
  CODEING = '5', // 进行中
  WAIT_ACCEPT = '6', //待验收
  COMPLETE = '7', // 已完成
  UN_BID = '8', // 未中标
}

export const RequirementStatus = [
  {
    label: '已关闭',
    value: IStatus.CLOSED,
  },
  {
    label: '评估中',
    value: IStatus.EVALUATION,
  },
  {
    label: '待签约',
    value: IStatus.WAIT_SIGN,
  },
  {
    label: '已签约',
    value: IStatus.SIGNED,
  },
  {
    label: '进行中',
    value: IStatus.CODEING,
  },
  {
    label: '待验收',
    value: IStatus.WAIT_ACCEPT,
  },
  {
    label: '已完成',
    value: IStatus.COMPLETE,
  },
];

export const TaskStatus = [
  {
    label: '待签约',
    value: IStatus.WAIT_SIGN,
  },
  {
    label: '未中标',
    value: IStatus.UN_BID,
  },
  {
    label: '已签约',
    value: IStatus.SIGNED,
  },
  {
    label: '进行中',
    value: IStatus.CODEING,
  },
  {
    label: '待验收',
    value: IStatus.WAIT_ACCEPT,
  },
  {
    label: '已完成',
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
  BID_FAIL = '2',
}
