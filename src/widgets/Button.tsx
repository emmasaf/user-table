import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useAppDispatch } from '../shared/store'
import { IButtonProps } from '../entities/interfaces'

const Button: React.FC<IButtonProps> = ({
  onClick,
  payload,
  text,
  className = 'flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75',
}) => {
  const dispatch = useAppDispatch()

  const handleAdd = () => {
    if (payload) {
      dispatch(onClick(payload))
    } else dispatch(onClick())
  }

  return (
    <button className={className} onClick={handleAdd}>
      {text === 'x' ? <MdDelete /> : text}
    </button>
  )
}

export default Button
