//* 需要傳入的資料：
//* 1. 頁面切換函式：onChangePage
//* 2. 頁面數量：pageCount
//* 3. 目前頁面：currentPage

import "./Pagination.styles.scss";

const Pagination = ({ onChangePage, pageCount, currentPage }) => {
  // todo 晚點再來看看 button 是不是要整合到 component 裡面
  return (
    <nav className="pagination" aria-label="Page navigation">
      <button
        type="button"
        aria-label="Previous"
        className="pagination__btn pagination__btn-pre"
        onClick={(e) => {
          e.preventDefault();
          onChangePage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <span aria-hidden="true">＜</span>
      </button>

      <ul className="pagination__list">
        {[...new Array(pageCount)].map((_, i) => (
          <li className="pagination__item" key={`${i}_page`}>
            <a
              href="/"
              className={`pagination__item-btn ${
                currentPage === i + 1 ? "pagination__item-btn--active" : ""
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
          onChangePage(currentPage + 1);
        }}
        aria-label="Next"
        disabled={currentPage === pageCount}
      >
        <span aria-hidden="true">＞</span>
      </button>
    </nav>
  );
};

export default Pagination;
