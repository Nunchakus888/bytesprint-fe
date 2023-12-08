import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ReactQuillComponent(props: {
  onChange: (val: string) => void,
  value: string
}) {
  const [value, setValue] = useState(props.value);
  const handleChange = (val: string) => {
    setValue(val)
    // console.log("val", val)
    props.onChange(val)
  }
  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
}