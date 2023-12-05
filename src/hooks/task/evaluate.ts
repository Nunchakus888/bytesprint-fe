import axios from "axios"
import _ from "lodash"
import { useEffect, useMemo, useState } from "react"


export const useEvaluate = () => {
  // 源数据 
  const [dataSource, setDataSource] = useState([{},{},{}])
  // 任务名称
  const [tasknames, setTaskNames] = useState(['','',''])
  // usdt
  const [usdts, setUsdts] = useState(['','',''])

  // 汇率
  const [rate, setRate] = useState(0)
  useEffect(() => {
    getExchangeRate().then(res => {
      setRate(+res)
    })
  },[])

  // cnys
  const cnys = useMemo(() => {
    return usdts.map(it => {
      try {
        if (it && +it < 0) it = 0
        return Number(it * rate).toFixed(2)
      }catch(e) {return 0}
    })
  }, [usdts, rate])

  const totalUsdt = useMemo(() => {
    console.log("usdts", usdts)
    const total = usdts.reduce((pre, cur) => {
      try {
        if (cur && +cur > 0) {
          return pre + Number(cur)
        }
        return pre
      }catch(e) {return pre}
    }, 0)
    console.log("total", total)
    return Number(total || 0).toFixed(2)
  }, [usdts])

  const totalCnys = useMemo(() => {
    const total = cnys.reduce((pre: number, cur: any) => {
      try {
        if (cur && +cur > 0) {
          return Number(pre) + Number(cur)
        }
        return pre
      }catch(e) {return pre}
    }, 0)
    return Number(total || 0).toFixed(2)
  }, [cnys])

  const handleTaskNameChange = (e:any, index: number) => {
    const tasks = _.cloneDeep(tasknames)
    tasks[index] = e.target.value
    setTaskNames(tasks)
  }

  const handleUsdtChange = (e:any, index: number) => {
    const usdts_ = _.cloneDeep(usdts)
    usdts_[index] = e.target.value
    setUsdts(usdts_)
  }

  const addEvaluate = () => {
    const t = _.cloneDeep(tasknames)
    t.push('')
    setTaskNames(t)

    const u = _.cloneDeep(usdts)
    u.push('')
    setUsdts(u)

    const d = _.cloneDeep(dataSource)
    d.push({})
    setDataSource(d)
  }
  const deleteEvaluate = (index: number) => {
    console.log("delete ", index)
    const t = _.cloneDeep(tasknames)
    t.splice(index, 1)
    console.log("tasknames>>>>", t)
    setTaskNames(t)

    const u = _.cloneDeep(usdts)
    u.splice(index, 1)
    console.log("usdts>>>>", u)
    setUsdts(u)

    const d = _.cloneDeep(dataSource)
    d.splice(index, 1)
    setDataSource(d)
    
  }

  // const handleChange = (e:any, dataIndex:string, index:number) => {
  //   let val = e.target.value
  //   let newData = _.cloneDeep(dataSource)
  //   console.log("handleChange index,dataIndex ", index, dataIndex)
  //   // @ts-ignore
  //   newData[index][dataIndex] = val
  //   console.log("handleChange newData>>", newData)
  //   if (dataIndex == 'usdt') {
      
  //     try {
  //       if (val && +val < 0) {
  //         val = 0
  //       }
  //       newData[index]['cny'] = Number(val * rate).toFixed(2)
  //     } catch(e) {

  //     }
  //   }
  //   setDataSource(newData)
  // }

  const handleSure = () => {}
  return {
    dataSource,
    addEvaluate,
    deleteEvaluate,
    handleUsdtChange,
    handleSure,
    totalCnys,
    totalUsdt,
    tasknames,
    handleTaskNameChange,
    usdts,
    cnys
  }
}

// 计算汇率
export const getExchangeRate = async () => {
  const res = await axios.get('http://api.exchangeratesapi.io/latest?access_key=f52d93afd307d021a73305da8b7055e4')
  if (res.data.success) {
    const {CNY, USD} = res.data.rates
    return Number(CNY / USD).toFixed(4)
  }
  return 0
}