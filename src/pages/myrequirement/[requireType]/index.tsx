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
  Portal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useRadioGroup,
} from '@chakra-ui/react';
import FileUpload from 'components/fileupload';
import FilSelect from 'components/select';
import { requirementTypes, useAddRequirement } from 'hooks/myrequirements/add';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoCheckmarkOutline } from 'react-icons/io5';
import {
  IPath,
  IRequirement,
  IRequirementPerson,
  IRequirementSingle,
  ProfessionTypes,
  ProType,
  ProTypes,
  RequirementType,
} from 'common/utils/constant';
import styles from './index.module.scss';
import Navbar from 'components/navbar/NavbarAdmin';

const ReactQuillComponent = dynamic(() => import('../../../components/richTextBlock'), {
  ssr: false,
});

export default function AddRequirement(props: {}) {
  const { currentRequire, saveRequirement, router } = useAddRequirement();
  const [files, setFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<IRequirementPerson | IRequirementSingle>();
  const onSubmit = handleSubmit(async (data) => {
    data.fileList = files;
    console.log('On Submit: ', data);
    await saveRequirement(data);
    router.push('/myrequirement');
  });

  const validatePhone = (value: string) => {
    if (!value) {
      return `Please Enter Phone number`;
    }
    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) {
      return 'Please enter a valid phone number';
    }
    return true;
  };
  const [radioVal, setRadioVal] = useState<ProType>();
  // 草稿
  const handleTempSave = () => {
    console.log('getValues>>', getValues());
  };
  return (
    <>
      <Portal>
        <Box>
          <Navbar
            paths={[
              { path: '#', name: 'Crowdsourcing Management ' },
              { path: `/${IPath.MYREQUIREMENT}`, name: 'My Requirements' },
              { path: '#', name: 'Publish Requirement' },
            ]}
          />
        </Box>
      </Portal>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative" overflow="visible">
        <Text fontSize={24} fontWeight="bold">
          Requirement Type：{currentRequire?.title}
        </Text>
        <Box margin="20px 0">
          <Text fontSize={18} fontWeight="bold">
            Basic information
          </Text>
          {currentRequire?.value === RequirementType.Single && (
            // @ts-ignore
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.projectName} isRequired margin="20px 0">
                <FormLabel htmlFor="projectName">Give the task a name</FormLabel>
                <Input
                  color="#fff"
                  id="projectName"
                  placeholder="Task Name"
                  {...register('projectName', {
                    required: 'required',
                  })}
                />
                <FormErrorMessage>
                  {errors.projectName && errors.projectName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.description} isRequired margin="20px 0">
                <FormLabel>Fill in the task description</FormLabel>
                <ReactQuillComponent
                  placeholder="Task Description"
                  value={getValues('description')}
                  onChange={(val) => setValue('description', val)}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.fileList} isRequired paddingTop="25px">
                <FileUpload
                  accept={['jpg', 'png', 'doc', 'docx', 'pptx', 'pdf']}
                  multiple
                  max={3}
                  maxSize={50 * 1024 * 1024}
                  register={(files: any) => setFiles(files)}
                />
                <FormErrorMessage>{errors.fileList && errors?.fileList.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!(errors as unknown as IRequirementSingle).professionType}
                isRequired
                margin="20px 0"
              >
                <FormLabel htmlFor="professionType">Select job type</FormLabel>
                <Select
                  placeholder="Job Type"
                  iconSize="16"
                  {...register('professionType', {
                    required: 'required',
                  })}
                >
                  {ProfessionTypes?.map((it, index) => {
                    return (
                      <option value={it.value} key={`${it.value}-${index}`}>
                        {it.label}
                      </option>
                    );
                  })}
                </Select>
                {/* <FormErrorMessage>
                {(errors as unknown as IRequirementSingle).professionType && (errors as unknown as IRequirementSingle).professionType.message}
              </FormErrorMessage> */}
              </FormControl>
              <FormControl
                isInvalid={!!(errors as unknown as IRequirementSingle).crowSourcingMethod}
                isRequired
                margin="20px 0"
              >
                <FormLabel htmlFor="crowSourcingMethod">Crowdsourcing Method</FormLabel>
                <RadioGroup value={radioVal}>
                  <Stack direction="row">
                    {ProTypes.map((it, index) => {
                      return (
                        <Box
                          key={`${it.label}_${index}`}
                          background="rgba(255,255,255,0.05)"
                          position="relative"
                          padding="10px 20px"
                          borderRadius={4}
                          cursor="pointer"
                          _hover={{ color: '#7551FF' }}
                          className={styles.radios}
                          onClick={() => {
                            setRadioVal(it.value);
                            setValue('crowSourcingMethod', it.value);
                          }}
                        >
                          <Radio
                            {...register('crowSourcingMethod', { required: '必选项' })}
                            value={it.value}
                          >
                            <Flex>
                              <i>
                                <IoCheckmarkOutline className={styles.checkIcon} fontSize={18} />
                              </i>
                              <Box display="flex" alignItems="center" flexDirection="column">
                                <Text fontSize={22} whiteSpace="nowrap" fontWeight="bold">
                                  {it.label}
                                </Text>
                                <Text fontSize={14} whiteSpace="nowrap">
                                  {it.description}
                                </Text>
                              </Box>
                            </Flex>
                          </Radio>
                        </Box>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isInvalid={!!errors.contactInfo} isRequired margin="20px 0">
                <FormLabel>Phone number</FormLabel>
                <Input
                  color="#fff"
                  id="contactInfo"
                  placeholder="Enter"
                  {...register('contactInfo', {
                    validate: validatePhone,
                  })}
                />
                <FormErrorMessage>
                  {errors.contactInfo && errors?.contactInfo.message}
                </FormErrorMessage>
              </FormControl>
              <Flex>
                <Button
                  background="#7551FF"
                  size="md"
                  borderRadius={4}
                  type="submit"
                  margin="20px 0"
                >
                  Post a task
                </Button>
                {/* <Button background="#F59A23" onClick={handleTempSave} size="md" borderRadius={4} margin="20px">
              保存草稿
            </Button> */}
              </Flex>
            </form>
          )}
          {/* {currentRequire?.value === RequirementType.Person &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.projectName} isRequired margin="20px 0">
              <FormLabel htmlFor="projectName">给任务起个名称</FormLabel>
              <Input
                color="#fff"
                id="projectName"
                placeholder="Task Name"
                {...register('projectName', {
                  required: '必填项',
                })}
              />
              <FormErrorMessage>
                {errors.projectName && errors.projectName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description} isRequired margin="20px 0">
              <FormLabel>填写任务描述</FormLabel>
              <ReactQuillComponent placeholder="Task Description" value={getValues('description')} onChange={(val) => setValue('description', val)} />
              <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.fileList} isRequired paddingTop="25px">
              <FileUpload
                accept={["jpg","png","doc","docx","pptx","pdf"]}
                multiple
                max={3}
                maxSize={50*1024*1024}
                register={register('fileList')}
               />
              <FormErrorMessage>{errors.fileList && errors?.fileList.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!(errors as unknown as IRequirementPerson).educational} isRequired margin="20px 0">
              <FormLabel htmlFor="educational">选择学历要求</FormLabel>
              <Select placeholder="学历要求" iconSize="16" {...register('educational', {
                  required: '必选项',
                })}>
                {
                  ProfessionTypes?.map((it, index) => {
                    return <option value={it.value} key={`${it.value}-${index}`}>{it.label}</option>
                  })
                }
              </Select>
            </FormControl>
            <FormControl isInvalid={!!(errors as unknown as IRequirementPerson).experience} isRequired margin="20px 0">
              <FormLabel htmlFor="experience">选择经验要求</FormLabel>
              <Select placeholder="学历要求" iconSize="16" {...register('experience', {
                  required: '必选项',
                })}>
                {
                  ProfessionTypes?.map((it, index) => {
                    return <option value={it.value} key={`${it.value}-${index}`}>{it.label}</option>
                  })
                }
              </Select>
            </FormControl>
            <FormControl isInvalid={!!(errors as unknown as IRequirementPerson).workPlace} isRequired margin="20px 0">
              <FormLabel htmlFor="workPlace">工作地点</FormLabel>
              <Select placeholder="工作地点" iconSize="16" {...register('workPlace', {
                  required: '必选项',
                })}>
                {
                  ProfessionTypes?.map((it, index) => {
                    return <option value={it.value} key={`${it.value}-${index}`}>{it.label}</option>
                  })
                }
              </Select>
            </FormControl>
            <FormControl isInvalid={!!(errors as unknown as IRequirementPerson).workTime} isRequired margin="20px 0">
              <FormLabel htmlFor="workTime">工作时长</FormLabel>
              <Select placeholder="工作时长" iconSize="16" {...register('workTime', {
                  required: '必选项',
                })}>
                {
                  ProfessionTypes?.map((it, index) => {
                    return <option value={it.value} key={`${it.value}-${index}`}>{it.label}</option>
                  })
                }
              </Select>
            </FormControl>
            
            <FormControl isInvalid={!!errors.contactInfo} isRequired margin="20px 0">
              <FormLabel>手机号</FormLabel>
              <Input
                color="#fff"
                id="contactInfo"
                placeholder="手机号"
                {...register('contactInfo', {
                  validate: validatePhone,
                })}
              />
              <FormErrorMessage>
                {errors.contactInfo && errors?.contactInfo.message}
              </FormErrorMessage>
            </FormControl>
            <Flex>
            <Button background="#7551FF" size="md" borderRadius={4} type='submit' margin="20px 0">
              发布任务
            </Button>
            <Button background="#F59A23" onClick={handleTempSave} size="md" borderRadius={4} margin="20px">
              保存草稿
            </Button>
            </Flex>
          </form>} */}
        </Box>
      </Box>
    </>
  );
}
