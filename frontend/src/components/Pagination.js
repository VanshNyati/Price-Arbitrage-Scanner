import React from "react";

export const paginate = (items, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};

const Pagination = ({ totalItems, currentPage, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages === 0 || totalPages === 1) return null;

    const pages = [...Array(totalPages).keys()].map((x) => x + 1);

    return (
        <div className="flex justify-center mt-6">
            <ul className="flex space-x-2">
                {pages.map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 border rounded ${currentPage === page
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
