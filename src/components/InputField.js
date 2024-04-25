import React from 'react';

export const InputField = ({ 
  label, 
  placeholder, 
  required = false, 
  type = 'text', 
  onChange, 
  value, 
  name, 
  className =''
}) => {
  return (
    <div className={`text-start my-1 ${className}`}>
      <label  className="block text-[12px] sm:text-sm  mb-1 font-medium  dark:text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 sm:p-1.5 lg:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
};
