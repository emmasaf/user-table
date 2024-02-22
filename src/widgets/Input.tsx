import { IInputProps } from '../entities/interfaces'

const Input: React.FC<IInputProps> = ({
  label,
  type,
  id,
  register,
  validation,
  errors,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        {...register(id, { ...validation })}
        id={id}
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errors[id] && <p className="text-red-500 ">{errors[id].message}</p>}
    </div>
  )
}

export default Input
