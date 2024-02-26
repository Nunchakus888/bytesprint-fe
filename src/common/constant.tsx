import { MdGroups } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { TbDiscount2 } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';

import Logo from '../../public/img/logo.png';
import Twitter from '../../public/img/media/twitter.png';
import Docs from '../../public/img/media/docs.png';
import Discord from '../../public/img/media/discord.png';

export const IMG_SRC = {
  Logo: Logo.src,
  Twitter: Twitter.src,
  Docs: Docs.src,
  Discord: Discord.src,
};

// 身份
export enum Identification {
  VISITOR = 0, // Regular User
  ENGINEER = 2, // 开发
  OPERATOR = 1, // 运营商
  SYSTEM = 3,
}

export enum StakedType {
  Employer,
  Tasker,
  Navigator,
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
    icon: <FaCalendarAlt fontSize={20} />,
  },
  {
    label: TabsEnum.PERSON_TASK,
    value: RequirementType.Person,
    icon: <TbDiscount2 fontSize={22} />,
  },
  {
    label: TabsEnum.ALL_TASK,
    value: RequirementType.Global,
    icon: <BiCategory fontSize={22} />,
  },
];

// 众包方式
export enum ProType {
  BIDDING = 1,
  PITCH = 2,
  BID = 3,
}

// 众包方式
export const ProTypes = [
  {
    label: 'Bidding',
    value: ProType.BIDDING,
    description: `Assess before choosing`,
  },
  {
    label: 'Design Competition',
    value: ProType.PITCH,
    description: `Speak with works`,
  },
  {
    label: 'Quoting',
    value: ProType.BID,
    description: `Budget Constraints`,
  },
];
// 任务类型
export const TaskTypes = [
  {
    label: 'Regular Task',
    value: 1,
  },
  {
    label: 'Navigator Task',
    value: 2,
  },
];

export enum IStatus {
  CLOSED = 1, //已关闭
  EVALUATION = 2, // 评估中
  WAIT_SIGN = 3, // 待签约
  SIGNED = 4, // 已签约
  CODEING = 5, // 进行中
  WAIT_ACCEPT = 6, //待验收
  // ACCEPTED = 7, //已验收
  COMPLETE = 7, // 已完成
  UN_BID = 2, // 未中标
  PUBLISHED = -1, // 前端自定义，需求发布成功
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
  {
    label: 'Published',
    value: IStatus.PUBLISHED,
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
  {
    label: 'Published',
    value: IStatus.PUBLISHED,
  },
];

// 职位类型
export const ProfessionTypes = [
  {
    label: 'Front-end Developer',
    value: 1,
  },
  {
    label: 'Android Developer',
    value: 2,
  },
  {
    label: 'iOS Developer',
    value: 3,
  },
  {
    label: 'Java Developer',
    value: 4,
  },
  {
    label: 'Python Developer',
    value: 5,
  },
  {
    label: 'Blockchain Engineer',
    value: 6,
  },
  {
    label: 'Full Stack Developer',
    value: 7,
  },
  {
    label: 'Test Engineer',
    value: 8,
  },
  {
    label: 'DevOps Engineer',
    value: 9,
  },
];

// 工作年限
export const ExperienceTypes = [
  {
    label: 'One year work experience',
    value: 1,
  },
  {
    label: 'Three to five years of work experience',
    value: 2,
  },
  {
    label: 'Five years of work experience',
    value: 3,
  },
];

export const EducationTypes = [
  {
    label: 'High School',
    value: 3,
  },
  {
    label: 'College',
    value: 4,
  },
  {
    label: 'Undergraduate',
    value: 5,
  },
  {
    label: 'Postgraduate',
    value: 6,
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
  BID_SUCCESS = 1,
  BID_FAIL = 2,
  WAIT_BID = 0,
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
