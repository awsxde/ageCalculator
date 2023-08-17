export default function FormInput({
  name,
  value,
  placeholder,
  isEmp,
  isValid,
  onChange,
}) {
  return (
    <div className="form__input">
      <label htmlFor="day" className="label label-name">
        {name}
      </label>
      <input
        type="text"
        name={name}
        value={value || ""}
        placeholder={placeholder}
        className={`input ${isEmp || !isValid() ? "input--error" : ""}`}
        onChange={onChange}
      />
      {isEmp ? (
        <label htmlFor={name} className="label label-error">
          This field is required
        </label>
      ) : (
        !isValid() && (
          <label htmlFor={name} className="label label-error">
            {`Must be a valid ${name}`}
          </label>
        )
      )}
    </div>
  );
}
