interface FormFieldProps {
  label: string;
  name: string;
  type: "text" | "password" | "email" | "number" | "textarea";
  value?: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  required,
  onChange,
}) => {
  const InputElement = type === "textarea" ? "textarea" : "input";

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <InputElement
        id={name}
        name={name}
        type={type !== "textarea" ? type : undefined}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
