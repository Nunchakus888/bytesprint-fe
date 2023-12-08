import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Flex, Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup,Text, Link, useToast } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'
import { FileUploader } from "react-drag-drop-files";
import styles from './index.module.scss'
type FileUploadProps = {
  register: UseFormRegisterReturn
  accept?: string[]
  multiple?: boolean
  max?: number
}
const MAX_SIZE_BYTES = 50 * 1024 * 1024
const getSizeInfo = (size: number) => {
  if (Math.floor(size / 1024 / 1024) !== 0) {
    return Number(size / 1024 / 1024).toFixed(2) + `M`
  }
  return Number(size / 1024).toFixed(2) + 'KB'
}

export default function FileUpload(props: FileUploadProps){
  const { register, accept, multiple , max=3 } = props
  const { ref, ...rest } = register as {ref: (instance: HTMLInputElement | null) => void}
  const toast = useToast()

  const [files, setFiles] = useState([]);
  const handleChange = (newFile: any) => {
    console.log(newFile.length)
    if (files.length > max) {
      return;
    }
    const resetLength = Math.max(0, max - files.length)
    if (resetLength <= 0) {
      return;
    }
    // newFile 内截取前resetLength file
    const needUploadFiles = Array.from(newFile).slice(0, resetLength)
    // 校验文件大小
    let isInvalid = Array.from(newFile).some((it:any) => it.size > MAX_SIZE_BYTES)
    if (isInvalid) {
      toast({
        title: `文件大小不能超出50M`,
        status: `error`,
        isClosable: true,
      })
      return;
    }
    // TODO 自动上传
    console.log("needUploadFiles>>>", needUploadFiles)

    const files_ = [...files, ...needUploadFiles]
    setFiles(files_);
    
  };
  
  const handleDelete = (file:any) => {
    console.log(files, file)
    const files_ = files.filter(it => it.name !== file.name)
    console.log("files_>>.", files_)
    setFiles(files_)
  }
  // files变动，对应的fileList 属性值变动
  useEffect(() => {
    const names = files.map((it:any) => it.name)
    console.log("names", names)
    // @ts-ignore
    ref(names)
  }, [files, ref])
  return (
      <Box>
        <FileUploader multiple={multiple} handleChange={handleChange} name="file" types={accept}>
          <Flex cursor="pointer" direction="column" justify="center" alignItems="center" color="#7551FF" fontSize={14} width="100%" height="100px" background="rgba(255,255,255,0.03)" border="dashed 2px #0658c2;">
            <Text>将文件拖到此处，或点击上传</Text>
            <Text>({files.length}/{max})</Text>
            <Text>50M以内，仅限{accept.join('、')}</Text>
          </Flex>
        </FileUploader>
        <Box display="flex" justifyContent="flex-start" gap={20} margin="20px 0">
          {
            files.map(file => {
              return (
                <Flex key={`${file.name}_${Date.now()}`} background="rgba(255,255,255,0.05)" borderRadius={4} padding="15px 20px" >
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" className={styles.file}>
                    <Text paddingTop="10px" fontSize={14}>{file.name}</Text>
                    <Flex width="100%" justifyContent="space-between" marginTop="10px" padding={0}>
                      <Text fontSize={12}>{getSizeInfo(file.size)}</Text>
                      <Link marginLeft="20px" fontSize={12} color="red" onClick={() => handleDelete(file)}>删除</Link>
                    </Flex>
                  </Box>
                </Flex>
              )
            })
            
          }
        </Box>
      </Box>
  )
}