function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-5 flex items-center justify-between border-t border-base-300 pt-4">
      <p className="text-sm text-base-content/60">
        Page {currentPage} of {totalPages}
      </p>

      <div className="join">
        <button
          className="btn btn-sm join-item"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`btn btn-sm join-item ${
                currentPage === page ? "btn-primary" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ),
        )}

        <button
          className="btn btn-sm join-item"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Pagination;