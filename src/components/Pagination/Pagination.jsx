const Pagination = ({ changePage, pagination }) => {
  const { has_pre, has_next, current_page, total_pages } = pagination;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            href="/"
            aria-label="Previous"
            className={`page-link ${has_pre ? "" : "disabled"}`}
            onClick={(e) => {
              e.preventDefault();
              changePage(current_page - 1);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {[...new Array(total_pages)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="page-item" key={`${i}_page`}>
            <a
              className={`page-link ${i + 1 === current_page && "active"}`}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                changePage(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className={`page-link ${has_next ? "" : "disabled"}`}
            onClick={(e) => {
              e.preventDefault();
              changePage(current_page + 1);
            }}
            href="/"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
