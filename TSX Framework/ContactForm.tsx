import FormField from "./FormField"; // Assuming FormField component is in a file named FormField.tsx

interface FormData {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

interface ContactFormProps {
  formName: string;
  redirectURL: string;
  formData: FormData[];
}

const ContactForm: React.FC<ContactFormProps> = ({
  formName,
  redirectURL,
  formData,
}) => {
  return (
    <form
      id={formName}
      className="js-ContactForm contact-form"
      method="post"
      encType="multipart/form-data"
      data-action="/find/Contact/ProcessEstimate"
      data-redirect={redirectURL}
    >
      <div className="js-formMessages">
        <div className="js-formMessage js-formMessage-success success" hidden>
          Thank you, your message has been submitted.
        </div>
        <div className="js-formMessage js-formMessage-failure error" hidden>
          An error occurred while submitting your message, please refresh the
          page and try again.
        </div>
      </div>
      <div>
        {formData.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}
      </div>
      <noscript>
        <label className="error text-center">
          <strong>JavaScript is required to use this form.</strong>
        </label>
      </noscript>
      <div className="btn-wrap center">
        <button className="btn-submit" type="submit" disabled>
          <span className="btn-text">Submit</span>
        </button>
      </div>
      <p className="recaptcha-disclaimer">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          title="Google Privacy Policy"
          href="https://policies.google.com/privacy"
          target="_blank"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          title="Google Terms of Service"
          href="https://policies.google.com/terms"
          target="_blank"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
};

export default ContactForm;
