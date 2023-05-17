import "./Pagination.styles.scss";

const Pagination = ({ onChangePage, pagination }) => {
  const { has_pre, has_next, current_page, total_pages } = pagination;

  return (
    <nav className="pagination" aria-label="Page navigation">
      <button
        aria-label="Previous"
        className="pagination__btn pagination__btn-pre"
        onClick={(e) => {
          e.preventDefault();
          onChangePage(current_page - 1);
        }}
        disabled={has_pre ? false : true}
      >
        <span aria-hidden="true">＜</span>
      </button>

      <ul className="pagination__list">
        {[...new Array(total_pages)].map((_, i) => (
          <li className="pagination__item" key={`${i}_page`}>
            <a
              href="/"
              className={`pagination__item-btn ${
                current_page === i + 1 ? "pagination__item-btn--active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onChangePage(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="pagination__btn pagination__btn-next"
        onClick={(e) => {
          e.preventDefault();
          onChangePage(current_page + 1);
        }}
        aria-label="Next"
        disabled={has_next ? false : true}
      >
        <span aria-hidden="true">＞</span>
      </button>
    </nav>
  );
};

export default Pagination;
