import "./AdminProductsTable.styles.scss";

const AdminProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="admin-products-table">
      <thead className="admin-products-table__header">
        <tr className="admin-products-table__header-row">
          <th scope="col">分類</th>
          <th scope="col">名稱</th>
          <th scope="col">售價</th>
          <th scope="col">啟用狀態</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody className="admin-products-table__body">
        {products.map((product) => {
          return (
            <tr key={product.id} className="admin-products-table__body-row">
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.is_enabled === 1 ? "啟用" : "未啟用"}</td>
              <td className="admin-products-table__body-actions">
                <button
                  type="button"
                  className="admin-products-table__body-actions-edit"
                  onClick={() => onEdit("edit", product)}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="admin-products-table__body-actions-del"
                  onClick={() => onDelete(product)}
                >
                  刪除
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminProductsTable;
