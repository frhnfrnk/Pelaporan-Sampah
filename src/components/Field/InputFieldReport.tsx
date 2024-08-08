import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value?: any;
  placeholder?: string;
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
  wajib?: boolean;
}

const InputFieldReport: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  min,
  max,
  wajib,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row items-center gap-1 mb-3 w-full">
      <label htmlFor={id} className="w-full lg:w-48 text-sm mb-2 lg:mb-0">
        {label}
        <span className="text-sm text-[#ff0000]">{wajib ? "*" : ""}</span>
      </label>
      <input
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="on"
        type={type}
        id={id}
        min={min}
        max={max}
        defaultValue={value}
        className="w-full grow-0 lg:grow text-sm border-[1px] border-[#e2e2e2] rounded-md px-5 py-2 placeholder:text-sm focus:outline-none"
      />
    </div>
  );
};

export default InputFieldReport;
