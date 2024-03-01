import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { FiFile } from 'react-icons/fi';
import { FileUploader } from 'react-drag-drop-files';
import styles from './index.module.scss';
import { Post } from 'common/utils/axios';
import API_ROUTERS from 'api';
import Upload from 'rc-upload';
import { onErrorToast } from 'common/utils/toast';
import { RcFile } from 'rc-upload/lib/interface';
type FileUploadProps = {
  children?: React.ReactNode;
  register: (f: any) => void;
  accept?: string[];
  multiple?: boolean;
  max?: number;
  maxSize?: number;
  isDrag?: boolean;
};

const getSizeInfo = (size: number) => {
  if (Math.floor(size / 1024 / 1024) !== 0) {
    return Number(size / 1024 / 1024).toFixed(2) + `M`;
  }
  return Number(size / 1024).toFixed(2) + 'KB';
};

export default function FileUpload(props: FileUploadProps) {
  const { register, accept, multiple, max = 3, maxSize, children, isDrag } = props;
  // const { ref, ...rest } = register as {ref: (instance: HTMLInputElement | null) => void}
  const toast = useToast();
  // 选择的文件
  const [chooseFiles, setChooseFiles] = useState<any[]>([]);

  const handleDelete = (index: number) => {
    const prevList = chooseFiles || [];
    const newList = [...prevList.slice(0, index), ...prevList.slice(index + 1)];
    setChooseFiles(newList);
  };
  // files变动，对应的fileList 属性值变动
  useEffect(() => {
    console.log('chooseFiles', chooseFiles);
    register(chooseFiles);
  }, [chooseFiles, register]);

  const uploadProps = {
    action: '/api2r/file/upload',
    multiple: true,
    beforeUpload: async (file: RcFile) => {
      console.log('file:', file);
      const isValid = checkFile(file, [...chooseFiles, file]);
      return isValid;
      // if (isValid) {
      //   setChooseFiles((prev) => {
      //     return [...prev, file];
      //   });
      // }
      // return false;
    },
    onSuccess: (res: Object) => {
      console.log('onSuccess: ', res);
      debugger;
      // TODO 成功后
      // setChooseFiles((prev) => {
      //   return [...prev, file];
      // });
    },
    style: {},
  };

  const checkFile = (file: RcFile, files: RcFile[]) => {
    // if (file.size > 380 * 1024) {
    //   onErrorToast('Max per file size need under 380KB.');
    //   return false;
    // }
    const totalSize = files.reduce((pre, cur, arr, index) => {
      return pre + cur.size;
    }, 0);
    if (totalSize > 50 * 1024 * 1024) {
      onErrorToast('Total upload size need under 50MB.');
      return false;
    }
    if (files.length > max) {
      onErrorToast('Limit of 3 files per upload.');
      return false;
    }
    return true;
  };
  return (
    <Box>
      {/* <FileUploader multiple={multiple} handleChange={handleChange} name="file" types={accept}>
        <Flex
          cursor="pointer"
          direction="column"
          justify="center"
          alignItems="center"
          color="#fff"
          fontSize={14}
          width="100%"
          height="100px"
          background="rgba(255,255,255,0.03)"
          border="solid 1px rgba(255,255,255,0.25);"
        >
          <Text>Drag the file here, or click to upload</Text>
          <Text>
            ({files.length}/{max})
          </Text>
          <Text>File size should be within 50MB, limited to {accept.join('、')}</Text>
        </Flex>
      </FileUploader> */}

      <Upload {...uploadProps}>
        <Flex
          cursor="pointer"
          direction="column"
          justify="center"
          alignItems="center"
          color="#fff"
          fontSize={14}
          width="100%"
          height="100px"
          background="rgba(255,255,255,0.03)"
          border="solid 1px rgba(255,255,255,0.25);"
        >
          <Text>Drag the file here, or click to upload</Text>
          <Text>
            ({chooseFiles.length}/{max})
          </Text>
          <Text>File size should be within 50MB, limited to {accept.join('、')}</Text>
        </Flex>
      </Upload>
      <Box display="flex" flexFlow={'wrap'} gap={8} margin="16px 0">
        {chooseFiles.map((file, index) => {
          return (
            <Flex
              key={`${file.name}_${Date.now()}`}
              background="rgba(255,255,255,0.05)"
              borderRadius={4}
              padding="15px 20px"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                className={styles.file}
              >
                <Text paddingTop="10px" fontSize={14}>
                  {file.name}
                </Text>
                <Flex width="100%" justifyContent="space-between" marginTop="10px" padding={0}>
                  <Text fontSize={12}>{getSizeInfo(file.size)}</Text>
                  <Link
                    marginLeft="20px"
                    fontSize={12}
                    color="red"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Link>
                </Flex>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
