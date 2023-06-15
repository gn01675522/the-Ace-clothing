import "./Input.styles.scss";
import { inputRules } from "./Input.rules.js";

const Input = ({ id, config, register, errors }) => {
  const { type, labelText } = config;
  const rules = inputRules(id);

  return (
    <>
      <label htmlFor={id} className="input__label">
        {labelText}
        {errors[id] && (
          <div className="input__label--invalid-feedback">
            *{errors[id]?.message}
          </div>
        )}
      </label>
      <input
        id={id}
        type={type}
        className={`input__entry ${errors[id] ? "input__entry--invalid" : ""}`}
        {...register(id, rules)}
        rules={rules}
      />
    </>
  );
};

export default Input;
