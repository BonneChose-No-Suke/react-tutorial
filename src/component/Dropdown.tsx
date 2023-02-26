import React from "react";
import { dropDownArgs } from "type/component/Dropdown";

export const Dropdown = ({ label, value, options, onChange }: dropDownArgs) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};