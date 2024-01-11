import React, { useState } from 'react';
//@ts-ignore
import DatePicker from 'react-datepicker';
import styles from './index.module.scss';

export default function CustomDateRange({ value, onChange }: any) {
  const { startTime, endTime } = value || {};

  return (
    <div className={styles.component}>
      <DatePicker
        selected={startTime}
        onChange={(date: any) =>
          onChange({
            ...value,
            startTime: date,
          })
        }
        selectsStart
        startDate={startTime}
        endDate={endTime}
        fixedHeight
      />
      <DatePicker
        selected={endTime}
        onChange={(date: any) =>
          onChange({
            ...value,
            endTime: date,
          })
        }
        selectsEnd
        startDate={startTime}
        endDate={endTime}
        minDate={startTime}
        fixedHeight
      />
    </div>
  );
}
