import _ from "lodash"
import { useState } from "react"


export const useEvaluate = () => {
  const item = {
    renwumingcheng: '',
    usdt: '',
    cny:''
  }
  // 源数据 
  const [dataSource, setDataSource] = useState([item,item,item])
  const addEvaluate = () => {
    const newData = _.cloneDeep(dataSource)
    setDataSource([...newData, item])
  }
  const deleteEvaluate = (index: number) => {
    let newData = _.cloneDeep(dataSource)
    newData.splice(index, 1)
    setDataSource(newData)
  }

  const handleChange = (e:any, dataIndex:string, index:number) => {
    const val = e.target.val
    let newData = _.cloneDeep(dataSource)
    console.log(index, dataIndex)
    newData[index-1][dataIndex] = val
    setDataSource(newData)
  }

  const handleSure = () => {}
  return {
    dataSource,
    addEvaluate,
    deleteEvaluate,
    handleChange,
    handleSure
  }
}