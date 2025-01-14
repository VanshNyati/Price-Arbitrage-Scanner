import React from "react";

export const paginate = (items, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

const Pagination = ({ totalItems, currentPage, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (currentPage > 2) pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (currentPage < totalPages - 1) pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-6">
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={() => onPageChange(1)}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>
        {pages.map((page, index) =>
          page === "..." ? (
            <li key={index} className="px-4 py-2">
              ...
            </li>
          ) : (
            <li key={index}>
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                {page}
              </button>
            </li>
          )
        )}
        <li>
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
