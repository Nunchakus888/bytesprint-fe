import styles from './index.module.scss';

import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { ProfessionTypes, ExperienceTypes, EducationTypes } from 'common/utils/constant';
import CustionSelect from 'components/custom-select';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { Post } from 'common/utils/axios';
import API_ROUTERS from 'api';
import FileUpload from 'components/fileupload';

const CertificationForm = ({ authorizeCode }: any) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values: any) => {
    setLoading(true);
    console.log('提交表单', values);
    const params = {};
    const res = await Post(API_ROUTERS.users.CERTIF_ENGINEER(params));
    setLoading(false);
    toast({
      title: `successfully`,
      status: 'success',
      isClosable: true,
    });
  };

  useEffect(() => {
    setValue('authorizeCode', authorizeCode);
  }, [authorizeCode, setValue]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className={styles.certificationForm}>
      <Container my={8} as="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-20 font-bold mb-4">Tasker认证</h2>

        {authorizeCode && (
          <>
            <h3 className="font-16 font-bold mb-2">认证Navigator信息</h3>
            <FormControl className="mb-4" {...register('authorizeCode')}>
              <Input
                value={getValues('authorizeCode')}
                onChange={(e) => {
                  setValue('authorizeCode', e.target.value);
                }}
              />
            </FormControl>
          </>
        )}

        <h3 className="font-16 font-bold mb-2">基础信息</h3>
        <Controller
          control={control}
          name="position"
          rules={{ required: 'Please select position' }}
          render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" isInvalid={!!error} id="position">
              <FormLabel fontSize={12}>认证职位类型（最多选择2个）</FormLabel>
              <CustionSelect
                placeholder="Select position"
                isMulti
                name={name}
                ref={ref}
                onChange={(val: any) => {
                  //限制最大只能选2个
                  const newValue = val.slice(0, 2);
                  onChange(newValue);
                }}
                value={value}
                options={ProfessionTypes}
                closeMenuOnSelect={false}
                isSearchable={false}
              />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="experience"
          rules={{ required: 'Please select experience' }}
          render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" isInvalid={!!error} id="experience">
              <FormLabel fontSize={12}>工作经验</FormLabel>
              <CustionSelect
                name={name}
                ref={ref}
                onChange={onChange}
                value={value}
                options={ExperienceTypes}
                closeMenuOnSelect={false}
                isSearchable={false}
              />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{ required: 'Please input address' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
            return (
              <FormControl className="mb-4" id="address" isInvalid={!!error}>
                <FormLabel fontSize={12}>当前工作区域</FormLabel>
                <Input value={value} onChange={onChange} />
                <FormErrorMessage>{error && error.message}</FormErrorMessage>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="phone"
          rules={{ required: 'Please input phone' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" id="phone" isInvalid={!!error}>
              <FormLabel fontSize={12}>联系电话</FormLabel>
              <Input type="tel" value={value} onChange={onChange} />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{ required: 'Please input email' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" id="email" isInvalid={!!error}>
              <FormLabel fontSize={12}>邮箱</FormLabel>
              <Input type="email" value={value} onChange={onChange} />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <h3 className="font-16 font-bold mb-2">技能标签</h3>
        <Controller
          control={control}
          name="skillList"
          rules={{ required: 'Please input skillList' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" id="skillList" isInvalid={!!error}>
              <Input placeholder="请输入，用，隔开" value={value} onChange={onChange} />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <h3 className="font-16 font-bold mb-2">教育经历</h3>
        <Controller
          control={control}
          name="school"
          rules={{ required: 'Please input school' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
            return (
              <FormControl className="mb-4" id="school" isInvalid={!!error}>
                <FormLabel fontSize={12}>学校名称</FormLabel>
                <Input value={value} onChange={onChange} />
                <FormErrorMessage>{error && error.message}</FormErrorMessage>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="eductionRange"
          rules={{ required: 'Please select ' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
            return (
              <FormControl className="mb-4" id="eductionRange" isInvalid={!!error}>
                <FormLabel fontSize={12}>就读时间</FormLabel>
                <RangeDatepicker selectedDates={value || []} onDateChange={onChange} />
                <FormErrorMessage>{error && error.message}</FormErrorMessage>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="major"
          rules={{ required: 'Please input major' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
            return (
              <FormControl className="mb-4" id="major" isInvalid={!!error}>
                <FormLabel fontSize={12}>专业名称</FormLabel>
                <Input value={value} onChange={onChange} />
                <FormErrorMessage>{error && error.message}</FormErrorMessage>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="education"
          rules={{ required: 'Please select education' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" isInvalid={!!error} id="education">
              <FormLabel fontSize={12}>学历</FormLabel>
              <CustionSelect
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={EducationTypes}
                closeMenuOnSelect={false}
                isSearchable={false}
              />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <h3 className="font-16 font-bold mb-2">附件简历</h3>
        <Controller
          control={control}
          name="resume"
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
            return (
              <FormControl className="mb-4" id="resume" isInvalid={!!error}>
                <FileUpload
                  accept={['jpg', 'png', 'doc', 'docx', 'pptx', 'pdf']}
                  multiple
                  max={3}
                  maxSize={50 * 1024 * 1024}
                  register={(files: any) => {
                    console.log(111, files);
                  }}
                />
                <FormErrorMessage>{error && error.message}</FormErrorMessage>
              </FormControl>
            );
          }}
        />
        <div className="flex justify-center">
          <Button mt={4} className="theme-button" type="submit" isLoading={loading}>
            申请成为Tasker
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CertificationForm;
