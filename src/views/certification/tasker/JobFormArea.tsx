import styles from './index.module.scss';

import React, { useCallback, useEffect } from 'react';
import { FormControl, FormLabel, Input, Box } from '@chakra-ui/react';

import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { MdClose, MdOutlineAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const defaultItem = {
  companyName: '',
  department: '',
  position: '',
  startTime: new Date(),
  endTime: new Date(),
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
      const newCurrentValue = {
        ...currentValue,
        [key]: val,
      };
      value.splice(index, 1, newCurrentValue);
      onChange(value);
    },
    [value, onChange]
  );

  return (
    <Box>
      {value?.map((educationForm: any, index: number) => {
        const moreThanOne = value?.length > 1;
        return (
          <Box key={educationForm.id} className={styles.formArea}>
            <h3 className="font-16 font-bold mb-2 flex justify-between items-center">
              Work Experience {moreThanOne ? `#${index + 1}` : ''}
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
              <FormLabel fontSize={12}>companyName</FormLabel>
              <Input
                value={[value[index].companyName]}
                onChange={(e) => handleChange('companyName', e.target.value, index)}
              />
            </FormControl>

            <FormControl className="mb-4">
              <FormLabel fontSize={12}>Working Time</FormLabel>
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
              <FormLabel fontSize={12}>Department</FormLabel>
              <Input
                value={[value[index].department]}
                onChange={(e) => handleChange('department', e.target.value, index)}
              />
            </FormControl>

            <FormControl className="mb-4">
              <FormLabel fontSize={12}>Position</FormLabel>
              <Input
                value={[value[index].position]}
                onChange={(e) => handleChange('position', e.target.value, index)}
              />
            </FormControl>
          </Box>
        );
      })}
      {value?.length <= 3 && (
        <div className={styles.addButton} onClick={handleAdd}>
          <MdOutlineAdd fontSize={16} className="mr-1" /> Add Work Experience
        </div>
      )}
    </Box>
  );
}
