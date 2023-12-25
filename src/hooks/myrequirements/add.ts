import _ from "lodash"
import { useRouter } from "next/router"
import { useCallback, useMemo, useState } from "react"
import { IRequirement, RequirementType } from "utils/constant"


export const requirementTypes = [
  {type: 'single', value: RequirementType.Single, title: 'Single Task', desc: 'For example: I have a front-end development requirement.'},
  {type: 'person', value: RequirementType.Person,title: 'Personnel Requirement', desc: 'For example: I need a front-end developer.'},
  {type: 'global', value: RequirementType.Global,title: 'Whole Project', desc: 'For example: I need to develop an office system.'},
]



export const useAddRequirement = () => {
  const router = useRouter()
  const currentRequire = useMemo(() => {
    const {requireType = ''} = router.query
    console.log("requireType>>>", requireType)
    // @ts-ignore
    return requirementTypes.filter(it => it.type === requireType)[0]
  }, [router])

  // 保存需求 TODO currentRequire 创建的类型 
  const saveRequirement = useCallback(async (data: any) => {
    // 任务类型，根据身份匹配
    return true
  }, [])
  return {
    currentRequire,
    saveRequirement,
    router
  }
}