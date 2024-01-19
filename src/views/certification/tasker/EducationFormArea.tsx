import styles from './index.module.scss';

import React, { useCallback, useEffect } from 'react';
import { FormControl, FormLabel, Input, Box } from '@chakra-ui/react';

import CustionSelect from 'components/custom-select';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { EducationTypes } from 'common/constant';
import { MdClose, MdOutlineAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const defaultItem = {
  school: '',
  startTime: new Date(),
  endTime: new Date(),
  education: '',
  major: '',
};

export default function EducationFormArea({ value = [], onChange }: any) {
  useEffect(() => {
    if (value?.length === 0) {
      onChange([defaultItem]);
    }
  }, [value, onChange]);

  const handleAdd = useCallback(() => {
    onChange([
      ...value,
      {
        ...defaultItem,
        id: uuidv4(),
      },
    ]);
  }, [value, onChange]);

  const handleDelete = useCallback(
    (id: string) => {
      const newValues = value.filter((it: any) => it.id !== id);
      onChange(newValues);
    },
    [value, onChange]
  );

  const handleChange = useCallback(
    (key: string, val: any, index: number) => {
      const currentValue = value[index];
      if (key === 'school' || key === 'major' || key === 'education') {
        const newCurrentValue = {
          ...currentValue,
          [key]: val,
        };
        value.splice(index, 1, newCurrentValue);
        onChange(value);
      } else if (key === 'startTime' || key === 'endTime') {
        const newCurrentValue = {
          ...currentValue,
          [key]: val,
        };
        value.splice(index, 1, newCurrentValue);
        onChange(value);
      }
    },
    [value, onChange]
  );

  console.log(1111, value);

  return (
    <Box>
      {value?.map((educationForm: any, index: number) => {
        const moreThanOne = value?.length > 1;
        return (
          <Box key={educationForm.id} className={styles.formArea}>
            <h3 className="font-16 font-bold mb-2 flex justify-between items-center">
              Education {moreThanOne ? `#${index + 1}` : ''}
              {moreThanOne && (
                <MdClose
                  fontSize={18}
                  className="cursor-pointer"
                  onClick={() => {
                    handleDelete(educationForm.id);
                  }}
                />
              )}
            </h3>

            <FormControl className="mb-4">
              <FormLabel fontSize={12}>School</FormLabel>
              <Input
                value={[value[index].school]}
                onChange={(e) => handleChange('school', e.target.value, index)}
              />
            </FormControl>

            <FormControl className="mb-4">
              <FormLabel fontSize={12}>Study Time</FormLabel>
              <div className="flex items-center ga">
                <SingleDatepicker
                  date={value[index].startTime}
                  onDateChange={(val) => {
                    handleChange('startTime', val, index);
                  }}
                />
                <span className="mx-4">-</span>
                <SingleDatepicker
                  date={value[index].endTime}
                  onDateChange={(val) => {
                    handleChange('endTime', val, index);
                  }}
                />
              </div>
            </FormControl>

            <FormControl className="mb-4">
              <FormLabel fontSize={12}>Major</FormLabel>
              <Input
                value={[value[index].major]}
                onChange={(e) => handleChange('major', e.target.value, index)}
              />
            </FormControl>

            <FormControl className="mb-4">
              <FormLabel fontSize={12}>Academic Degree</FormLabel>
              <CustionSelect
                placeholder="Select education"
                onChange={(val: any) => handleChange('education', val, index)}
                value={[value[index].education]}
                options={EducationTypes}
                closeMenuOnSelect={false}
                isSearchable={false}
              />
            </FormControl>
          </Box>
        );
      })}
      {value?.length <= 3 && (
        <div className={styles.addButton} onClick={handleAdd}>
          <MdOutlineAdd fontSize={16} className="mr-1" /> Add Education
        </div>
      )}
    </Box>
  );
}
