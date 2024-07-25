"use client";
import React, { useEffect, useState } from "react";

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

interface Country {
  name: string;
  code: string;
}

const InputPhoneNumberField: React.FC<InputFieldProps> = ({
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
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+62");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneNumber = e.target.value;

    if (phoneNumber.startsWith(selectedCountryCode)) {
      phoneNumber = phoneNumber.slice(selectedCountryCode.length);
    }

    phoneNumber = phoneNumber.replace(/^0+/, "");

    const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`;
    if (onChange) {
      onChange(fullPhoneNumber);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryCode(e.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const codes = data.map((country: any) => ({
          name: country.name.common,
          code:
            country.idd.root +
            (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        }));
        setCountryCodes(codes);
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  }, []);

  return (
    <div className="flex flex-col gap-1 mb-3 w-full">
      <label htmlFor={id}>
        {label}
        <span className="ml-1 text-sm text-[#ff0000]">{wajib ? "*" : ""}</span>
      </label>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-0">
        <select
          onChange={handleSelectChange}
          value={selectedCountryCode}
          className="border-[1px] border-input rounded-md p-2 placeholder:text-sm w-full lg:w-40"
        >
          <option value="">Code</option>
          {countryCodes.map((country: Country, index) => (
            <option key={index} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}
        </select>
        <input
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="on"
          type={type}
          id={id}
          min={min}
          max={max}
          defaultValue={value}
          className="border-[1px] border-input rounded-md p-2 placeholder:text-sm flex-grow ml-0 lg:ml-2"
        />
      </div>
    </div>
  );
};

export default InputPhoneNumberField;
