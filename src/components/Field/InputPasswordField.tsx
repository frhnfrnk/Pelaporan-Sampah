import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputPasswordFieldProps {
  label: string;
  id: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputPasswordField: React.FC<InputPasswordFieldProps> = ({
  label,
  id,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor={id}>{label}</label>
      <div className="relative border-[0.8px] border-input rounded p-2">
        <input
          onChange={handleChange}
          autoComplete="on"
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          className="focus:outline-none w-full bg-transparent "
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute inset-y-0 right-0 px-3 flex items-center"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default InputPasswordField;
