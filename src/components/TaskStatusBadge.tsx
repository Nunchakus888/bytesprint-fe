import {RequirementStatus} from "common/constant";

const TaskStatusBadge = (props: {
	children: any,
}) => (
	<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300 whitespace-nowrap" >
		{props.children}
	</span >
)


export default TaskStatusBadge