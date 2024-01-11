import styles from './index.module.scss';

import React, { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { ProfessionTypes, ExperienceTypes, EducationTypes } from 'common/utils/constant';
import CustionSelect from 'components/custom-select';
import CustomDataRange from 'components/custom-date-range';

const CertificationForm = ({ authorizeCode }: any) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (values: any) => {
    console.log('提交表单', values);
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
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" isInvalid={!!error} id="position">
              <FormLabel fontSize={12}>认证职位类型（最多选择2个）</FormLabel>
              <CustionSelect
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
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
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" isInvalid={!!error} id="experience">
              <FormLabel fontSize={12}>工作经验</FormLabel>
              <CustionSelect
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
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
                <CustomDataRange value={value} onChange={onChange} />
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
        <div className="flex justify-center">
          <Button mt={4} className="theme-button" type="submit">
            申请成为Tasker
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CertificationForm;
