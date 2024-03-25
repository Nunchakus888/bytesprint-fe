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
} from 'common/constant';
import styles from './index.module.scss';
import Navbar from 'components/navbar/Navbar';
import CustomSelect from 'components/custom-select';
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
const ReactQuillComponent = dynamic(() => import('../../../components/richTextBlock'), {
  ssr: false,
});

export default function AddRequirement(props: {}) {
  const { currentRequire, saveRequirement, router, buttonLoading } = useAddRequirement();
  const [files, setFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm<IRequirementPerson | IRequirementSingle>();
  // const [phoneError, setPhoneError] = useState('');
  const onSubmit = handleSubmit(async (data) => {
    // console.log(isValidPhoneNumber(data.contactInfo), data.contactInfo);
    // if (!isValidPhoneNumber(data.contactInfo)) {
    //   setPhoneError(`Please enter a valid phone number`);
    //   return false;
    // } else {
    //   setPhoneError('');
    // }
    data.fileList = files;
    console.log('On Submit: ', data);
    const res = await saveRequirement(data);
    if (res) {
      router.push('/myrequirement');
    }
  });

  const validatePhone = (value: string) => {
    if (!value) {
      return `Please Enter Phone number`;
    }
    if (
      !/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(
        value
      )
    ) {
      return 'Please enter a valid phone number';
    }
    return true;
  };
  const [radioVal, setRadioVal] = useState<ProType>();
  const [phoneNumber, setPhoneNumber] = useState();
  // 草稿
  const handleTempSave = () => {
    console.log('getValues>>', getValues());
  };
  watch((data) => {
    console.log('data>>>', data);
  });

  return (
    <>
      <Box>
        <Navbar
          paths={[
            { path: '#', name: 'Crowdsourcing Management ' },
            { path: `/${IPath.MYREQUIREMENT}`, name: 'My Requirements' },
            { path: '#', name: 'Publish Requirement' },
          ]}
        />
      </Box>
      <Box
        position="relative"
        overflow="visible"
        background="rgba(255,255,255,0.06)"
        padding="25px"
      >
        <Text fontSize={24} fontWeight="bold">
          Requirement Type：{currentRequire?.title}
        </Text>
        <Box margin="20px 0">
          <Text fontSize={18} fontWeight="bold">
            Basic information
          </Text>
          {currentRequire?.value === RequirementType.Single && (
            // @ts-ignore
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="projectName"
                rules={{ required: 'Please input task name' }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <FormControl className="mb-4" id="projectName" isInvalid={!!error} isRequired>
                      <FormLabel htmlFor="projectName">Give the task a name</FormLabel>
                      <Input
                        color="#fff"
                        id="projectName"
                        placeholder="Task Name"
                        value={value}
                        onChange={onChange}
                      />
                      <FormErrorMessage>{error && error.message}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              />

              <Controller
                control={control}
                name="description"
                rules={{ required: 'Please input task description' }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <FormControl className="mb-4" id="description" isInvalid={!!error} isRequired>
                      <FormLabel>Fill in the task description</FormLabel>
                      <ReactQuillComponent
                        placeholder="Task Description"
                        value={value}
                        onChange={onChange}
                      />
                      <FormErrorMessage>{error && error.message}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              />

              {/* <FormControl isInvalid={!!errors.description} isRequired margin="20px 0">
                <FormLabel>Fill in the task description</FormLabel>
                <ReactQuillComponent
                  placeholder="Task Description"
                  value={getValues('description')}
                  onChange={(val) => setValue('description', val)}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl> */}

              <FormControl isInvalid={!!errors.fileList}>
                <FileUpload
                  accept={['jpg', 'png', 'doc', 'docx', 'pptx', 'pdf']}
                  multiple
                  max={3}
                  maxSize={50 * 1024 * 1024}
                  register={(files: any) => setFiles(files)}
                />
                <FormErrorMessage>{errors.fileList && errors?.fileList.message}</FormErrorMessage>
              </FormControl>

              <Controller
                control={control}
                name="professionType"
                rules={{ required: 'Please select task type' }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <FormControl
                      className="mb-4"
                      id="professionType"
                      isInvalid={!!error}
                      isRequired
                    >
                      <FormLabel htmlFor="professionType">Select job type</FormLabel>
                      <CustomSelect
                        options={ProfessionTypes}
                        placeholder="Task Type"
                        onChange={(val: any) => {
                          onChange(val.value);
                        }}
                        focusBorderColor="rgba(255, 255, 255, 0.4)"
                        width={220}
                      />
                      <FormErrorMessage>{error && error.message}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              />

              <Controller
                control={control}
                name="crowSourcingMethod"
                rules={{ required: 'Please choose crowdsourcing method' }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <FormControl
                      className="mb-4"
                      id="crowSourcingMethod"
                      isInvalid={!!error}
                      isRequired
                    >
                      <FormLabel htmlFor="crowSourcingMethod">Crowdsourcing Method</FormLabel>
                      <RadioGroup value={value} onChange={onChange}>
                        <Stack direction="row">
                          {ProTypes.map((it, index) => {
                            return (
                              <Box
                                key={`${it.label}_${index}`}
                                // background="#1b1e24"
                                position="relative"
                                padding="10px 20px"
                                borderRadius={4}
                                cursor="pointer"
                                _hover={{ color: '#7551FF' }}
                                className={styles.radios}
                                // onClick={() => {
                                //   setRadioVal(it.value);
                                //   setValue('crowSourcingMethod', it.value);
                                // }}
                              >
                                <Radio value={it.value}>
                                  <Flex className={+value === it.value ? styles.radioChecked : ''}>
                                    <i>
                                      <IoCheckmarkOutline
                                        className={styles.checkIcon}
                                        fontSize={18}
                                      />
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
                      <FormErrorMessage>{error && error.message}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              />

              {/* <FormControl
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
                          // background="#1b1e24"
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
              </FormControl> */}

              <Controller
                control={control}
                name="contactInfo"
                rules={{ required: 'Please input phone number' }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <FormControl className="mb-4" id="contactInfo" isInvalid={!!error} isRequired>
                      <FormLabel>Phone number</FormLabel>
                      <PhoneInput
                        className={styles.phoneInput}
                        placeholder="Enter phone number"
                        value={value}
                        onChange={onChange}
                      />
                      <FormErrorMessage>{error && error.message}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              />
              {/* <FormControl isInvalid={!!phoneError} isRequired margin="20px 0">
                <FormLabel>Phone number</FormLabel>
                
                <PhoneInput
                  className={styles.phoneInput}
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(val) => {
                    setValue('contactInfo', val);
                    // @ts-ignore
                    setPhoneNumber(val);
                  }}
                />
                <FormErrorMessage>{phoneError}</FormErrorMessage>
              </FormControl> */}
              <Flex>
                <Button
                  background="#7551FF"
                  size="md"
                  borderRadius={4}
                  type="submit"
                  margin="20px 0"
                  isLoading={buttonLoading}
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
