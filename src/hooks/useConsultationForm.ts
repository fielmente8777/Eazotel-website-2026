import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import axios from "axios";
import { contacts } from "../../contact";

export interface ConsultationFormData {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  message?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  [key: string]: string | undefined;
}

interface useConsultationFormProps {
  includeMessage?: boolean;
  onSubmitSuccess?: () => void;
}

const initialFormData: ConsultationFormData = {
  name: "",
  countryCode: "+91",
  phone: "",
  email: "",
  message: "",
};

const useConsultationForm = ({
  includeMessage,
  onSubmitSuccess,
}: useConsultationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] =
    useState<ConsultationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const debouncedEmail = useDebounce(formData.email, 500);
  const debouncedPhone = useDebounce(formData.phone, 500);
  const debouncedName = useDebounce(formData.name, 500);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string): boolean => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  };

  // Debounced Email Validation
  useEffect(() => {
    if (debouncedEmail && !validateEmail(debouncedEmail)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else if (debouncedEmail && validateEmail(debouncedEmail)) {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }
  }, [debouncedEmail]);

  // Debounced Phone Validation
  useEffect(() => {
    if (debouncedPhone && !validatePhone(debouncedPhone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone must be 10-15 digits",
      }));
    } else if (debouncedPhone && validatePhone(debouncedPhone)) {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }
  }, [debouncedPhone]);

  // Debounced Name Validation
  useEffect(() => {
    if (debouncedName && !debouncedName.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: "Name cannot be empty",
      }));
    } else if (debouncedName && debouncedName.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }
  }, [debouncedName]);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty";
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone must be 10-15 digits";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  // handle form submission
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const setFieldValue = (field: keyof ConsultationFormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  // reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  // privyr api endpoint and body
  // const DEFAULT_API_ENDPOINT = "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/7lHAUjtz#generic-webhook";
  // email: formData.email,
  // name: formData.name,
  // phone: `${formData.countryCode}${formData.phone}`,
  // message: formData.message,
  // if (data.success) {
  //   setSubmitSuccess(true);
  //   resetForm();
  //   if (onSubmitSuccess) {
  //     onSubmitSuccess();
  //   }
  // }

  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const descriptionPart = [];

      if (includeMessage) {
        descriptionPart.push(`Message: ${formData.message}`);
      }
      const description = descriptionPart.join("\n");

      const { data } = await axios.post(
        "https://nexon.eazotel.com/eazotel/addcontacts",
        {
          Domain: contacts.formDomain,
          Name: formData.name,
          email: formData.email,
          Contact: formData.countryCode + formData.phone,
          Description: description,
          created_from: "webform",
          source_url: window.location.href,
        }
      );

      if (data.Status) {
        setSubmitSuccess(true);
        resetForm();
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
        window.open("/thank-you/", "_blank");
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    setIsSubmitting,
    submitSuccess,
    setSubmitSuccess,
    onSubmitSuccess,
    handleChange,
    setFieldValue,
    handleSubmit,
  };
};

export default useConsultationForm;
