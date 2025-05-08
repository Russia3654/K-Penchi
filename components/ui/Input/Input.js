import React from 'react';
import cl from './Input.module.css';

// Manual ID generator for React versions <18
let idCounter = 0;
const generateId = () => `file-input-${idCounter++}`;

const Input = (props) => {
  const [inputId] = React.useState(generateId());

  const handleFileChange = (e) => {
    console.log(`File input changed - Component: ${props.componentName || 'unknown'}`);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  if (props.type === "file") {
    return (
      <>
        <label htmlFor={inputId} className={cl.fileInputLabel}>
          <div>{props.text}</div>
          <input 
            className={cl.input} 
            id={inputId}
            {...props}
            onChange={handleFileChange}
          />
        </label>
      </>
    );
  }

  return <input className={cl.input} {...props} />;
}

export default Input;