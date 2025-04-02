import React from "react";
import "../index.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  // console.log(totalPosts, postsPerPage, setCurrentPage, currentPage);
  // console.log(setCurrentPage);
  
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, pages.length))
        }
        disabled={currentPage === pages.length}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
