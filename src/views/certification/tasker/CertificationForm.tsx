import styles from './index.module.scss';

import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Box,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { ProfessionTypes, ExperienceTypes } from 'common/constant';
import CustionSelect from 'components/custom-select';
import { Post } from 'common/utils/axios';
import API_ROUTERS from 'api';
import FileUpload from 'components/fileupload';
import { onSuccessToast } from 'common/utils/toast';
import EducationFormArea from './EducationFormArea';
import JobFormArea from './JobFormArea';
import { removeItem } from 'common/utils';
import { setUserInfo } from 'common/slice/commonSlice';
import { useDispatch } from 'react-redux';
import { useCheckLogin } from 'hooks/useCheckLogin';
import PhoneInput from 'react-phone-number-input';
import { useRouter } from 'next/router';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
const CertificationForm = ({ authorizeCode }: any) => {
  const [loading, setLoading] = useState(false);
  const { control, register, handleSubmit, setValue, getValues, reset } = useForm();
  const dispatch = useDispatch();
  const { checkLogin } = useCheckLogin();
  const [files, setFiles] = useState([]);
  const route = useRouter();
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const {
        position,
        experience,
        eductionRange,
        education,
        skillList,
        educationList,
        jobList,
        ...restValues
      } = values;
      const params = {
        position: position?.map((it: any) => it.value),
        experience: experience?.value,
        skillList: skillList?.split(','),
        jobList: jobList,
        educationList: educationList?.map((it: any) => {
          return {
            ...it,
            education: it.education?.value,
          };
        }),
        authorizeCode,
        ...restValues,
        certificateList: files.map((it) => {
          return {
            expiration: null,
            name: it.name,
            path: it.fileUrl,
            time: Date.now(),
          };
        }),
      };
      // console.log('提交表单', values);
      const res = await Post(API_ROUTERS.users.CERTIF_ENGINEER(), params);
      setLoading(false);
      onSuccessToast('Submission successful, please wait for approval');
      route.push('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue('authorizeCode', authorizeCode);
  }, [authorizeCode, setValue]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className={styles.certificationForm}>
      <Container my={8} as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.pageTittle}>Tasker Certification</div>

        <div className={styles.certificationFormConrtent}>
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

          <Box className={styles.formArea}>
            <h3 className="font-16 font-bold mb-2">Basic Information</h3>
            <Controller
              control={control}
              name="position"
              rules={{ required: 'Please select position' }}
              render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
                <FormControl className="mb-4" isInvalid={!!error} id="position" isRequired>
                  <FormLabel fontSize={12}>
                    Certified Job Type ({value?.length || 0}/{2})
                  </FormLabel>
                  <CustionSelect
                    placeholder="Select position (Choose up to 2)"
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
              rules={{ required: 'Please select Current Work Area' }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => {
                return (
                  <FormControl className="mb-4" id="address" isInvalid={!!error} isRequired>
                    <FormLabel fontSize={12}>Current Work Area</FormLabel>
                    {/* <Input
                      value={value}
                      onChange={onChange}
                      placeholder="e.g Berlin, London, New York"
                    /> */}
                    <CountryDropdown
                      value={country}
                      onChange={(val) => {
                        setCountry(val);
                        onChange(``);
                      }}
                    />
                    <RegionDropdown
                      country={country}
                      value={region}
                      onChange={(val) => {
                        setRegion(val);
                        onChange(val ? `${country}, ${region}` : ``);
                      }}
                    />

                    <FormErrorMessage>{error && error.message}</FormErrorMessage>
                  </FormControl>
                );
              }}
            />
            <Controller
              control={control}
              name="phone"
              rules={{ required: 'Please input phone' }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <FormControl className="mb-4" id="phone" isInvalid={!!error} isRequired>
                  <FormLabel fontSize={12}>Phone</FormLabel>
                  {/* <Input type="tel" value={value} onChange={onChange} /> */}
                  {/* <FormErrorMessage>{error && error.message}</FormErrorMessage> */}
                  <PhoneInput
                    className={styles.phoneInput}
                    placeholder="Enter phone number"
                    value={value}
                    onChange={onChange}
                  />
                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{ required: 'Please input email' }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <FormControl className="mb-4" id="email" isInvalid={!!error} isRequired>
                  <FormLabel fontSize={12}>Email</FormLabel>
                  <Input type="email" value={value} onChange={onChange} />
                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </Box>

          <Box className={styles.formArea}>
            <Controller
              control={control}
              name="skillList"
              rules={{ required: 'Please input skillList' }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <FormControl className="mb-4" id="skillList" isInvalid={!!error} isRequired>
                  <FormLabel fontSize={16} fontWeight="bold" mb={2}>
                    Skill Tag
                  </FormLabel>
                  <Input
                    placeholder="Please enter, separated by a comma"
                    value={value}
                    onChange={onChange}
                  />
                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </Box>

          <Controller
            control={control}
            name="jobList"
            render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => {
              return <JobFormArea value={value} onChange={onChange} />;
            }}
          />

          <Controller
            control={control}
            name="educationList"
            render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => {
              return <EducationFormArea value={value} onChange={onChange} />;
            }}
          />

          <Box className={styles.formArea}>
            <h3 className="font-16 font-bold mb-2">Attachment Resume</h3>
            <Controller
              control={control}
              name="resume"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => {
                return (
                  <FormControl className="mb-4" id="resume" isInvalid={!!error}>
                    <FileUpload
                      accept={['jpg', 'png', 'doc', 'docx', 'pptx', 'pdf']}
                      multiple
                      max={1}
                      maxSize={10 * 1024 * 1024}
                      register={(files: any) => {
                        setFiles(files);
                      }}
                    />
                    <FormErrorMessage>{error && error.message}</FormErrorMessage>
                  </FormControl>
                );
              }}
            />
          </Box>

          <div className="flex justify-center">
            <Button mt={4} className="btn-primary" type="submit" isLoading={loading}>
              Apply becoming Tasker
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CertificationForm;
