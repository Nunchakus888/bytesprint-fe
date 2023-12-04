import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Identification } from "utils/constant";

export const useUserInfo = () => {
	// 身份
  const { identification } =
    useSelector((state: any) => state.common);

	// 普通用户
	const user = useMemo(() => {
		// if (!identification) {
		// 	return Identification.VISITOR
		// }
		// return identification

		// test
		return Identification.ENGINEER
	}, [identification])
	
	
	return {
		identification: user
	}
}