import "./AdminTable.styles.scss";

export const ADMIN_TABLE_TYPE = {
  products: "products",
  coupons: "coupons",
  orders: "orders",
};

const tableSwitch = (type) =>
  ({
    [ADMIN_TABLE_TYPE.products]: {
      headers: ["分類", "名稱", "售價", "啟用狀態", "編輯"],
      items: ["category", "title", "price", "is_enable"],
    },
    [ADMIN_TABLE_TYPE.coupons]: {
      headers: ["優惠碼", "折扣", "到期日", "啟用狀態", "編輯"],
      items: ["code", "percent", "due_date", "is_enable"],
    },
    [ADMIN_TABLE_TYPE.orders]: {
      headers: ["訂單 ID", "用戶信箱", "訂單金額", "付款狀態", "編輯"],
      items: ["id", "email", "total", "is_paid"],
    },
  }[type]);

const AdminTable = ({ type, items, onEdit, onDelete }) => {
  const headers = tableSwitch(type).headers;
  const productInfo = tableSwitch(type).items;

  console.log(items);

  return (
    <table className="admin-table">
      <thead className="admin-table__header">
        <tr className="admin-table__header-row">
          {headers.map((header, i) => {
            return (
              <th key={i} scope="col">
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="admin-table__body">
        {items.map((item) => {
          return (
            <tr key={item.id} className="admin-table__body-row">
              <td>{item[productInfo[0]]}</td>
              <td>
                {type === "orders"
                  ? item.user[productInfo[1]]
                  : item[productInfo[1]]}
              </td>
              <td>{item[productInfo[2]]}</td>
              {type === "orders" ? (
                <td>{item[[productInfo[3]]] ? "已付款" : "未付款"}</td>
              ) : (
                <td>{item[[productInfo[3]]] === 1 ? "啟用" : "未啟用"}</td>
              )}
              <td className="admin-table__body-actions">
                <button
                  type="button"
                  className="admin-table__body-actions-edit"
                  onClick={() => onEdit("edit", item)}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="admin-table__body-actions-del"
                  onClick={() => onDelete(item)}
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

export default AdminTable;
