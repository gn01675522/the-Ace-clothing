import "./OrderCard.styles.scss";

const OrderCard = ({ products }) => {
  return (
    <div className="order-card">
      <h2 className="order-card__title">訂單內容</h2>
      <div className="order-card__content">
        {products?.map((item) => {
          return (
            <div className="order-card__item" key={item.id}>
              <img
                src={item.product.imageUrl}
                alt=""
                className="order-card__item-img"
              />
              <div className="order-card__item-info">
                <div className="d-flex justify-content-between fw-bold">
                  <p className="mb-0">
                    {item.product.title}x{item.qty}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0">NT$ {item.final_total}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;
