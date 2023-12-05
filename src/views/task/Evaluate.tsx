import { Box, Flex, Input, InputGroup, InputRightElement, Link, styled, Text } from "@chakra-ui/react";
import ModalDialog from "components/modal";
import BYTable from "components/table";
import { getExchangeRate, useEvaluate } from "hooks/task/evaluate";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import styles from './index.module.scss'
import _ from "lodash";
export default function Evaluate(props: {
  isOpen?: boolean,
  onClose?: () => void
}) {
  const {isOpen, onClose} = props
  const {dataSource,
    tasknames,
    handleTaskNameChange,
    usdts,
    cnys,
    addEvaluate,
    deleteEvaluate,
    handleUsdtChange,
    handleSure, 
    totalCnys,
    totalUsdt,} = useEvaluate()
  

  const columns = [
    {
      title: '序号',
			dataIndex: 'xuhao',
			key: 'xuhao',
      render: (_:any, record:any, index:number) => {
				return <Box paddingLeft="5px">{index+1}</Box>
			},
    },
    {
      title: '任务名称',
			dataIndex: 'renwumingcheng',
			key: 'renwumingcheng',
      render: (_:any, record: any,index: number) => {
				return <Input value={tasknames[index]} color="#fff" placeholder='请输入' size='md' autoFocus onChange={(e) => handleTaskNameChange(e, index)}/>
			},
    },
    {
      title: '费用（USDT）',
			dataIndex: 'usdt',
			key: 'usdt',
      render: (_:any, record:any, index: number) => {
				return <Input value={usdts[index]} type="number" min={0} color="#fff" placeholder='请输入' size='md' onChange={(e) => handleUsdtChange(e, index)}/>
			},
    },
    {
      title: '价值(CNY)',
			dataIndex: 'cny',
			key: 'cny',
      render: (_:any, record:any, index:number) => {
				return <Box paddingLeft="5px">{cnys[index]}</Box>
			},
    },
    {
      title: '操作',
			dataIndex: 'cny',
			key: 'cny',
      render: (_:any, record: any, index: number) => {
				return <Link color="#7551FF" onClick={() => deleteEvaluate(index)}>删除</Link>
			},
    }
  ]
  
  // 完成时间
  const [date, setDate] = useState(new Date());
  

  return (
    <ModalDialog 
      title="参与评估"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="评估质押"
      onSure={handleSure}
    >

      <Box>
        <Text fontSize='lg'>任务清单</Text>
        <Box background="rgba(255,255,255,0.05)" padding="0 0 20px" margin="10px 0 20px 0">
          <BYTable columns={columns} dataSource={dataSource}></BYTable>
          <Link onClick={addEvaluate} color="#7551FF" display="flex" justifyContent="center" alignItems="center">
            <IoIosAdd />
            添加任务
          </Link>
          <Flex width="70%" justifyContent="space-between" padding="20px 0 0 20px">
            <Text fontSize='lg'>报酬合计</Text>
            <Text color="#7551FF" fontSize="20px" fontWeight="bold">{totalUsdt} USDT</Text>
            <Text color="#7551FF" fontSize="20px" fontWeight="bold">{totalCnys} CNY</Text>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Text fontSize='lg'>预计完成时间</Text>
          <Box margin="10px 0 20px 0" className={styles.datepicker}>
            <SingleDatepicker
              name="date-input"
              date={date}
              onDateChange={setDate}
            />
            <Text fontSize='lg' margin="10px 0 0 0">需质押USDT数量</Text>
            <InputGroup margin="10px 0 5px 0">
              <InputRightElement>USDT</InputRightElement>
              <Input isReadOnly value={(Number(totalUsdt)*0.1).toFixed(2)} color="#fff"></Input>
            </InputGroup>
            <Text fontSize='xs' color="#7551FF">质押数量=费用合计*10%</Text>
        </Box>
      </Box>
    </ModalDialog>
  )
}