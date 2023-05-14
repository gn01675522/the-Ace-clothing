import "./SummaryCard.styles.scss";

const SummaryCard = ({ total }) => {
  return (
    <div className="summary-card">
      <div className="summary-card__subtotal">
        <span>小計</span>
        <span>NT${total}</span>
      </div>
      <div className="summary-card__shipping">
        <span>運費</span>
        <span>NT$免費</span>
      </div>
      <div className="summary-card__total">
        <span>總金額</span>
        <span>NT${total}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
