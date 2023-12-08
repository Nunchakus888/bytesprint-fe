import { TriangleDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import FileUpload from 'components/fileupload';
import FilSelect from 'components/select';
import { requirementTypes, useAddRequirement } from 'hooks/myrequirements/add';
import AdminLayout from 'layouts/admin';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { IRequirement, ProfessionTypes, ProType, ProTypes } from 'utils/constant';


export default function AddRequirement(props: {}) {
  const { currentRequire, form, handleInputChange } = useAddRequirement();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getFieldState
  } = useForm<IRequirement>();
  const onSubmit = handleSubmit((data) => console.log('On Submit: ', data));

  const validatePhone = (value: string) => {
    if (!value) {
      return `必填项`
    }
    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) {
      return '请输入正确的手机号';
    }
    return true;
  };

  const ReactQuillComponent = dynamic(() => import("../../../components/richTextBlock"), { ssr: false })

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        <Text fontSize={24} fontWeight="bold">需求类型：{currentRequire}</Text>
        <Box margin="20px 0">
          <Text fontSize={18} fontWeight="bold">基础信息</Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.projectName} isRequired margin="20px 0">
              <FormLabel htmlFor="projectName">给任务起个名称</FormLabel>
              <Input
                color="#fff"
                id="projectName"
                placeholder="name"
                {...register('projectName', {
                  required: '必填项',
                })}
              />
              <FormErrorMessage>
                {errors.projectName && errors.projectName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.descrpiton} isRequired margin="20px 0">
              <FormLabel>填写任务描述</FormLabel>
              {/* <RichTextBlock/> */}
              {/* <Textarea
                color="#fff"
                placeholder="任务描述"
                size="sm"
                resize="vertical"
                id="descrpiton"
                {...register('descrpiton', {
                  required: '必填项',
                })}
              /> */}
              {/* @ts-ignore */}
              <ReactQuillComponent value={getFieldState('descrpiton')} onChange={(val) => setValue('descrpiton', val)} />
              <FormErrorMessage>{errors.descrpiton && errors.descrpiton.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.fileList} isRequired>
              <FileUpload
                accept={["JPG", "PNG", "GIF"]}
                multiple
                max={3}
                register={register('fileList')}
               />
              <FormErrorMessage>{errors.fileList && errors?.fileList.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.professionType} isRequired margin="20px 0">
              <FormLabel htmlFor="professionType">选择职位类型</FormLabel>
              {/* <Input
                id='professionType'
                placeholder='name'
                {...register('professionType', {
                  required: 'This is required',
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
              /> */}
              <Select placeholder="职位类型" iconSize="16" {...register('professionType', {
                  required: '必选项',
                })}>
                {
                  ProfessionTypes?.map((it, index) => {
                    return <option value={it.value} key={`${it.value}-${index}`}>{it.label}</option>
                  })
                }
              </Select>
              <FormErrorMessage>
                {errors.professionType && errors.professionType.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.crowSourcingMethod} isRequired margin="20px 0">
              <FormLabel htmlFor="crowSourcingMethod">众包方式</FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  {ProTypes.map((it) => {
                    return (
                      <Box
                        key={it.label}
                        background="rgba(255,255,255,0.05)"
                        position="relative"
                        padding="10px 20px"
                        borderRadius={4}
                        cursor="pointer"
                        _hover={{ background: 'rgba(255,255,255,0.9)', color: '#7551FF' }}
                      >
                        <Radio {...register('crowSourcingMethod', {required: '必选项',})} value={it.value}>
                          <i>
                            <IoCheckmarkOutline fontSize={18} />
                          </i>
                          <Box>
                            <Text fontSize={22} fontWeight="bold">
                              {it.label}
                            </Text>
                            <Text fontSize={14} whiteSpace="nowrap">
                              {it.label}
                            </Text>
                          </Box>
                        </Radio>
                      </Box>
                    );
                  })}
                  
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isInvalid={!!errors.contactInfo} isRequired margin="20px 0">
              <FormLabel>手机号</FormLabel>
              <Input
                color="#fff"
                id="contactInfo"
                placeholder="contactInfo"
                {...register('contactInfo', {
                  validate: validatePhone,
                })}
              />
              <FormErrorMessage>
                {errors.contactInfo && errors?.contactInfo.message}
              </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' type='submit' margin="20px 0">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </AdminLayout>
  );
}
