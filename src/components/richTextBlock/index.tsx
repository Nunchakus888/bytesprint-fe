import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ReactQuillComponent(props: {
  onChange: (val: string) => void,
  value: string,
  placeholder?: string
}) {
  const [value, setValue] = useState('');
  const ref = useRef(null)
  const handleChange = (val: string) => {
    setValue(val)
    props.onChange(val)
  }
  useEffect(() => {
    ref.current.editor.root.innerHTML = props.value || ''
  }, [props.value])
  return <ReactQuill placeholder={props.placeholder} ref={ref} style={{height: "180px"}} theme="snow" value={value} onChange={handleChange} />;
}