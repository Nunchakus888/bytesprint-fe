import { Box, Flex, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import ModalDialog from "components/modal";
import BYTable from "components/table";
import { useEvaluate } from "hooks/task/evaluate";
import { IoIosAdd } from "react-icons/io";
export default function Evaluate(props: {
  isOpen?: boolean,
  onClose?: () => void
}) {
  const {isOpen, onClose} = props
  const {dataSource,
    addEvaluate,
    deleteEvaluate,
    handleChange,handleSure} = useEvaluate()
  
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
      render: (_:any, { content }: {content: string},index: number) => {
				return <Input color="#fff" placeholder='请输入' size='md' onChange={(e) => handleChange(e, 'renwumingcheng', index)}/>
			},
    },
    {
      title: '费用（USDT）',
			dataIndex: 'usdt',
			key: 'usdt',
      render: (_:any, { content }: {content: string}, index: number) => {
				return <Input type="number" color="#fff" placeholder='请输入' size='md' onChange={(e) => handleChange(e, 'usdt', index)}/>
			},
    },
    {
      title: '价值(CNY)',
			dataIndex: 'cny',
			key: 'cny',
      render: (_:any, { content }: {content: string}) => {
				return <p>sss</p>
			},
    },
    {
      title: '操作',
			dataIndex: 'cny',
			key: 'cny',
      render: (_:any, record: any, index: number) => {
				return <Link onClick={() => deleteEvaluate(index)}>删除</Link>
			},
    }
  ]

  
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
            <Text color="#7551FF" fontSize="20px" fontWeight="bold">100.00 USDT</Text>
            <Text color="#7551FF" fontSize="20px" fontWeight="bold">700.00 CNY</Text>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Text fontSize='lg'>预计完成时间</Text>
        <Box margin="10px 0 20px 0">
        <Input
          placeholder="请选择预计完成时间"
          size="md"
          type="datetime-local"
          color="#fff"
          />
        </Box>

        <Box>
        <Text fontSize='lg'>需质押USDT数量</Text>
          <InputGroup margin="10px 0 5px 0">
            <InputRightElement>USDT</InputRightElement>
            <Input isReadOnly value={11} color="#fff"></Input>
          </InputGroup>
          <Text fontSize='xs' color="#7551FF">质押数量=费用合计*10%</Text>
        </Box>
      </Box>
    </ModalDialog>
  )
}