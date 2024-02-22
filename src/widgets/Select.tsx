import { ISelectProps } from "../entities/interfaces";

const Select: React.FC<ISelectProps> = ({ label, name, register, errors, options,validation }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 ">
        {label}
      </label>
      <select
        {...register(name, validation)}
        className="mt-1 my-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map((option, index) => (
          <option defaultValue={options[0].name.common} value={option.name.common} key={index}>
            {option.name.common}
          </option>
        ))}

      </select>
      {errors[name] && <p className="text-red-500 ">{errors[name].message}</p>}

    </div>
  );
};

export default Select;