import React from 'react';
import { ILoadingComponentProps } from '../entities/interfaces';

const LoadingComponent: React.FC<ILoadingComponentProps> = ({ size = 24, message }) => {
  // TailwindCSS spinner classes
  const spinnerStyle = `inline-block w-${size} h-${size} border-4 border-blue-500 rounded-full animate-spin border-t-transparent`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={spinnerStyle}></div>
      {message && <div className="mt-2 text-lg text-gray-700">{message}</div>}
    </div>
  );
};

export default LoadingComponent;
