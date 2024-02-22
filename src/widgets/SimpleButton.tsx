import React from 'react'
import { ISimpleButtonProps } from '../entities/interfaces'

const SimpleButton: React.FC<ISimpleButtonProps> = ({
  onClick,
  text,
  children,
  className = 'flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75',
}) => {

  const handleAdd = () => {
   onClick()
  }

  return (
    <button title={text} className={className} onClick={handleAdd}>
     {children}
    </button>
  )
}

export default SimpleButton
