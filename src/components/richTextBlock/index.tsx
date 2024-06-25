import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ReactQuillComponent(props: {
  onChange: (val: string) => void;
  value: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(props.value);
  const ref = useRef(null);
  const handleChange = (val: string) => {
    if (val === '<p><br></p>') {
      val = '';
    }
    console.log('val>>>>', val);
    setValue(val);
    props.onChange(val);
  };

  return (
    <ReactQuill
      placeholder={props.placeholder}
      ref={ref}
      theme="snow"
      value={value}
      onChange={handleChange}
    />
  );
}
