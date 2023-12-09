import _ from "lodash"
import { useRouter } from "next/router"
import { useCallback, useMemo, useState } from "react"
import { IRequirement, RequirementType } from "utils/constant"


export const requirementTypes = [
  {type: 'single', value: RequirementType.Single, title: '单一任务', desc: '例如：我有一个前端开发的需求；'},
  {type: 'person', value: RequirementType.Person,title: '人员需求', desc: '例如：我需要一名前端开发工程师；'},
  {type: 'global', value: RequirementType.Global,title: '整包项目', desc: '例如：我需要开发一个办公系统；'},
]



export const useAddRequirement = () => {
  const router = useRouter()
  const currentRequire = useMemo(() => {
    const {requireType = ''} = router.query
    console.log(requireType)
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