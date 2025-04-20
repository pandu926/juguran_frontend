import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  nama: string;

  placeholder?: string;
  save: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <div className="w-full pt-5 md:w-3/5">
      <label htmlFor={props.nama} className={`block text-sm font-medium`}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.nama}
        id={props.nama}
        className={`w-full px-4 py-2 mt-2 text-sm border rounded-md `}
        placeholder={props.placeholder}
        onChange={props.save}
        required
      />
    </div>
  );
};

export default InputField;
