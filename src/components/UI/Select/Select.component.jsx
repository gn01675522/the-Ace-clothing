const Select = ({
  id,
  labelText,
  register,
  errors,
  rules,
  children,
  disabled,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] && "is-invalid"}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export default Select;
