import ContactForm from "./Contact"; // Assuming ContactForm component is in a file named ContactForm.tsx

const YourComponent: React.FC = () => {
  const formData = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Enter your first name",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Enter your last name",
      required: true,
    },
    {
      label: "Street Address",
      name: "streetAddress1",
      type: "text",
      placeholder: "Enter your street address",
      required: true,
    },
    // Add more form fields as needed
  ];

  return (
    <ContactForm
      formName="ContactForm"
      redirectURL="/thank-you"
      formData={formData}
    />
  );
};

export default YourComponent;
