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
import { ProfessionTypes, ExperienceTypes, EducationTypes } from 'common/constant';
import CustionSelect from 'components/custom-select';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { Post } from 'common/utils/axios';
import API_ROUTERS from 'api';
import FileUpload from 'components/fileupload';

const CertificationForm = ({ authorizeCode }: any) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { control, register, handleSubmit, setValue, getValues, reset } = useForm();

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
        <h2 className="font-20 font-bold mb-4">Tasker Certification</h2>

        {authorizeCode && (
          <>
            <h3 className="font-16 font-bold mb-2">Certified Navigator</h3>
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

        <h3 className="font-16 font-bold mb-2">Basic Information</h3>
        <Controller
          control={control}
          name="position"
          rules={{ required: 'Please select position' }}
          render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" isInvalid={!!error} id="position" isRequired>
              <FormLabel fontSize={12}>Certified Job Type (Choose up to 2)</FormLabel>
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
            <FormControl className="mb-4" isInvalid={!!error} id="experience" isRequired>
              <FormLabel fontSize={12}>Work Experience</FormLabel>
              <CustionSelect
                placeholder="Select experience"
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
              <FormControl className="mb-4" id="address" isInvalid={!!error} isRequired>
                <FormLabel fontSize={12}>Current Work Area</FormLabel>
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
            <FormControl className="mb-4" id="phone" isInvalid={!!error} isRequired>
              <FormLabel fontSize={12}>Phone</FormLabel>
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
            <FormControl className="mb-4" id="email" isInvalid={!!error} isRequired>
              <FormLabel fontSize={12}>Email</FormLabel>
              <Input type="email" value={value} onChange={onChange} />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <h3 className="font-16 font-bold mb-2">Skill Tag</h3>
        <Controller
          control={control}
          name="skillList"
          rules={{ required: 'Please input skillList' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
            <FormControl className="mb-4" id="skillList" isInvalid={!!error} isRequired>
              <Input
                placeholder="Please enter, separated by a comma"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <h3 className="font-16 font-bold mb-2">Education</h3>
        <Controller
          control={control}
          name="school"
          rules={{ required: 'Please input school' }}
          render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => {
            return (
              <FormControl className="mb-4" id="school" isInvalid={!!error} isRequired>
                <FormLabel fontSize={12}>School</FormLabel>
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
                <FormLabel fontSize={12}>Study Time</FormLabel>
                <RangeDatepicker
                  name="eductionRange"
                  selectedDates={value || []}
                  onDateChange={onChange}
                  usePortal
                />
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
              <FormControl className="mb-4" id="major" isInvalid={!!error} isRequired>
                <FormLabel fontSize={12}>Major</FormLabel>
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
            <FormControl className="mb-4" isInvalid={!!error} id="education" isRequired>
              <FormLabel fontSize={12}>Academic Degree</FormLabel>
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
        <h3 className="font-16 font-bold mb-2">Attachment Resume</h3>
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
            Apply becoming Tasker
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CertificationForm;
