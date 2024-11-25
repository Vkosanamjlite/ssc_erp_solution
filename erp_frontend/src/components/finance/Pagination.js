// src/components/Pagination.js
import React from 'react';
import './Pagination.css';

function Pagination({ totalResults, resultsPerPage, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pageNumbers;
    };

    const handleClick = (pageNumber) => {
        if (pageNumber === '...') return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="pagination">
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-arrow"
            >
                &lt;
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(page)}
                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-arrow"
            >
                &gt;
            </button>
        </div>
    );
}

export default Pagination;
