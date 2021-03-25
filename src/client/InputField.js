import React from 'react'

const InputField = ({type, label, value, onValueChange}) => {
    return (
      <div>
        <label>
            {label}:{" "}
          <input 
            type={type}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        </label>
      </div>
    );
}

export default InputField
