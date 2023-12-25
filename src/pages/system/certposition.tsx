import { Box,Button,Flex,FormControl,FormErrorMessage,FormLabel,Input,Link,Switch,Text, useDisclosure, useToast } from "@chakra-ui/react";
import Confirm from "components/confirm";
import ModalDialog from "components/modal";
import BYTable from "components/table";
import { useCertPositionSetting } from "hooks/system";
import AdminLayout from "layouts/admin";
import _ from "lodash";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

export default function CertPosition() {
  const {data, mutate: refreshData, saveItem, deleteItem } = useCertPositionSetting()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [delItem, setDelItem] = useState<any>()
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const { register, control, handleSubmit, reset, watch, formState:{ errors, }, setValue , getValues} = useForm({
    defaultValues: {
      name: '',
      id: ''
    },
    mode:'onChange'
  });
  const columns = [
    {
      title: '序号',
			dataIndex: 'xuhao',
			key: 'xuhao',
      render: (_:any, record:any, index:number) => {
				return <Box paddingLeft="5px" margin="5px 0" fontSize={14}>{index+1}</Box>
			},
    },
    {
      title: 'Job Type',
			dataIndex: 'name',
			key: 'name',
      render: (_:any, record:any, index:number) => {
				return <Box paddingLeft="5px" margin="5px 0" fontSize={14}>{record.name}</Box>
			},
    },
    {
      title: '启用/禁用',
			dataIndex: 'enable',
			key: 'enable',
      render: (_:any, record:any, index:number) => {
				return <Switch id={record.id} isChecked={record.enable} onChange={(e) => handleChange(e, record)} />
			},
    },
    {
      title: '来源',
			dataIndex: 'source',
			key: 'source',
      render: (_:any, record:any, index:number) => {
				return <Box paddingLeft="5px" margin="5px 0" fontSize={14}>{record.source ? '自定义': '系统'}</Box>
			},
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (_:any, record:any, index: number) => {
        return (
          <Flex margin="5px 0" fontSize={14} gap="20px">
            <Link color="#7551FF" cursor="pointer" onClick={() => {setValue('name', record.name); setValue("id", record.id);setIsOpenUpdate(true)}}>编辑</Link>
            <Link color="#7551FF" cursor="pointer" onClick={() => {setDelItem(record); onOpen()}}>删除</Link>
          </Flex>
        )
      },
    }
  ]

  const handleChange = async (e: ChangeEvent<HTMLInputElement>, record: any) => {
    const record_ = _.cloneDeep(record)
    record_.enable = e.target.value
    const res = await saveItem(record_)
    if (res.success) {
      toast({
        title: `操作成功`,
        status: `success`,
        isClosable: true,
        onCloseComplete: async () => {
          await refreshData()
        }
      })
      return
    }
    toast({
      title: res.message || `操作失败`,
      status: `error`,
      isClosable: true,
    })
  }

  // 删除
  const handleDelete = async (record: any) => {
    const res = await deleteItem(record.id)
    if (res.success) {
      toast({
        title: `操作成功`,
        status: `success`,
        isClosable: true,
        onCloseComplete: async () => {
          await refreshData()
        }
      })
      return
    }
    toast({
      title: res.message || `操作失败`,
      status: `error`,
      isClosable: true,
    })
  }

  const handleupdateItem = async (data: any) => {
    console.log("data", data)
    const res = await saveItem(data)
    if (res.success) {
      setIsOpenUpdate(false)
      toast({
        title: `操作成功`,
        status: `success`,
        isClosable: true,
        onCloseComplete: async () => {
          await refreshData()
        }
      })
      return
    }
    toast({
      title: res.message || `操作失败`,
      status: `error`,
      isClosable: true,
    })
  }
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Box mt={{base: "30px"}} padding="30px 20px" background="rgba(255,255,255,0.05)" borderRadius={8}>
          <Text fontSize={24} >认证职位类型设置</Text>
          <Button margin="20px 0" background="#7551FF" size="md" width="120px" borderRadius={4} onClick={() => {setValue('name', ''); setValue("id", '');setIsOpenUpdate(true)}}>添加职位类型</Button>    
          <BYTable columns={columns} dataSource={data}></BYTable>
        </Box>
        <Confirm onClose={onClose} isOpen={isOpen} title="Delete Confirm" content="Are you sure Delete? You can't undo this action afterwards." data={delItem} onSure={(d) => handleDelete(d)}/>
      </Box>

      <ModalDialog 
        title={`${getValues().id ?`编辑`: '添加'}职位类型`}
        onClose={() => setIsOpenUpdate(false)}
        isOpen={isOpenUpdate}
        onSure={handleSubmit(handleupdateItem)}
      >
      <Flex justifyContent="space-between">
        <FormControl isInvalid={!!errors?.name} isRequired>
          <FormLabel>职位类型名称</FormLabel>
          <Input id={`id.name`} color="#fff" placeholder='请输入' size='md' {...register("name", { required: true })}  />
          <FormErrorMessage>
            {errors?.name && <>{errors?.name.message}</>}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      </ModalDialog>
    </AdminLayout>
  )
}