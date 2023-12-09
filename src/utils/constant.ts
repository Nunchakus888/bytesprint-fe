
// 身份
export enum Identification {
	VISITOR = 99,
	ENGINEER = 1,
	OPERATOR = 2
}

export const enum TabsEnum {
	SINGLE_TASK= '单一任务',
	PERSON_TASK= '人员需求',
	ALL_TASK = '整包项目'
}
export enum RequirementType {
  Single=1,
  Person=2,
  Global=3
}
// 需求类型
export const Tabs = [
	{
		label: TabsEnum.SINGLE_TASK,
		value: RequirementType.Single
	},
	{
		label: TabsEnum.PERSON_TASK,
		value: RequirementType.Person
	},
	{
		label: TabsEnum.ALL_TASK,
		value: RequirementType.Global
	},
]

export enum ProType {
	BIDDING="1",
	PITCH="2",
	BID="3"
}

// 众包方式
export const ProTypes = [
	{
		label: '竞标',
		value: ProType.BIDDING
	},
	{
		label: '比稿',
		value: ProType.PITCH
	},
	{
		label: '出价',
		value: ProType.BID
	}
]
// 任务类型
export const TaskTypes = [
	{
		label: '普通任务',
		value: '1'
	},
	{
		label: '船长任务',
		value: '2'
	}
]

export const RequirementStatus = [
	{
		label: '已关闭',
		value: '1'
	},
	{
		label: '评估中',
		value: '2'
	},
	{
		label: '待签约',
		value: '3'
	},
	{
		label: '已签约',
		value: '4'
	},
	{
		label: '进行中',
		value: '5'
	},
	{
		label: '待验收',
		value: '6'
	},
	{
		label: '已完成',
		value: '7'
	}
]

export const TaskStatus = [
	{
		label: '待签约',
		value: '1'
	},
	{
		label: '未中标',
		value: '2'
	},
	{
		label: '已签约',
		value: '3'
	},
	{
		label: '进行中',
		value: '4'
	},
	{
		label: '待验收',
		value: '6'
	},
	{
		label: '已完成',
		value: '7'
	}
]


// 职位类型
export const ProfessionTypes = [
	{
		label: '前端开发',
		value: '1'
	},
	{
		label: '后端开发',
		value: '2'
	},
	{
		label: 'UI设计',
		value: '3'
	},
	{
		label: '测试',
		value: '4'
	},
]

export interface IRequirement {
  projectName: string
  descrpiton: string
  categoryId: number
  fileList: string[]
  requirementList: string[]
  contactInfo: string
}

export interface IRequirementSingle extends IRequirement{
	crowSourcingMethod: number
	professionType: number
}
export interface IRequirementPerson extends IRequirement {
	educational: string
	experience: string
	workPlace: string
	workTime: string

}