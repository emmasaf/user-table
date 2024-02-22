import React from 'react';
import { IPaginationProps } from '../entities/interfaces';

const Pagination: React.FC<IPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
<nav aria-label="Page navigation" className='w-full flex justify-center'>
  <ul className="flex list-reset border border-grey-light rounded w-[max-content]">
    {pages.map(page => (
      <li key={page} className={`page-item ${currentPage === page ? 'bg-blue-500' : 'bg-white'} border-r border-grey-light`}>
        <button
          className={`page-link block py-2 px-3 leading-tight ${currentPage === page ? 'text-white' : 'text-blue-500 hover:bg-blue-500 hover:text-white'} transition duration-150 ease-in-out`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      </li>
    ))}
  </ul>
</nav>

  );
};

export default Pagination;
