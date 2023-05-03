import "./Indicator.styles.scss";

const Indicator = ({ imgCount, imgNum, onChangeImg }) => {
  return (
    <div className="indicator">
      {[...new Array(imgCount)].map((_, i) => (
        <div
          className={`indicator__dots ${
            i === imgNum ? "indicator__dots--active" : ""
          }`}
          key={i}
          onClick={() => onChangeImg(i)}
        />
      ))}
    </div>
  );
};

export default Indicator;
