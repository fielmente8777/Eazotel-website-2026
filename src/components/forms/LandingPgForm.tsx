"use client";

import useConsultationForm, {
  ConsultationFormData,
} from "@/hooks/useConsultationForm";
import { countries } from "@/utils/countryCode";
import React from "react";

interface FormField {
  label: string;
  name: keyof ConsultationFormData;
  type?: string;
  placeholder: string;
  required?: boolean;
  tag: "input" | "textarea" | "div";
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const LandingPgForm = ({btnBgColor}: {btnBgColor?: string}) => {
  const {
    formData,
    isSubmitting,
    handleSubmit,
    handleChange,
    errors,
    setFieldValue,
  } = useConsultationForm({
    includeMessage: true,
    onSubmitSuccess: () => {},
  });

  const formFields: FormField[] = [
    {
      tag: "input",
      type: "text",
      name: "name",
      placeholder: "Your full name",
      required: true,
      value: formData.name,
      onChange: handleChange,
      label: "Your Name*",
    },
    {
      tag: "div",
      type: "tel",
      name: "phone",
      placeholder: "Your phone number",
      required: true,
      value: formData.phone,
      onChange: handleChange,
      label: "Your Phone Number*",
    },
    {
      tag: "input",
      type: "email",
      name: "email",
      placeholder: "Your email ID",
      required: true,
      value: formData.email,
      onChange: handleChange,
      label: "Your email*",
    },
    {
      tag: "textarea",
      name: "message",
      placeholder: "What services you are looking for?",
      required: true,
      value: formData.message,
      onChange: handleChange,
      label: "Service",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-between md:h-full p-4 md:p-6  text-base rounded-2xl w-full bg-[#010101]"
      noValidate
    >
      <h2 className="text-xl md:text-2xl text-center font-semibold text-white">
        Get A FREE Consultation!
      </h2>
      <p className="text-white font-medium text-center">
        Let&apos;s work on boosting your hotel&apos;s profitability!
      </p>

      <div className="flex flex-col justify-between gap-4">
        {formFields.map((field, index) => (
          <div key={index} className={`flex flex-col gap-2 `}>
            <label className="text-white font-medium">{field.label}</label>

            {field.tag === "input" && (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={field.value}
                onChange={field.onChange}
                className="outline-none bg-[#1E1E1E] w-full rounded-lg p-3.5 placeholder:text-[#9EA3AB] text-white"
              />
            )}

            {field.tag === "textarea" && (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={field.value}
                onChange={field.onChange}
                rows={4}
                className="outline-none bg-[#1E1E1E] resize-none w-full rounded-lg p-3.5 placeholder:text-[#9EA3AB] text-white"
              />
            )}
            {field.tag === "div" && (
              <div className="flex gap-2 bg-[#1E1E1E] w-full rounded-lg p-3.5">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => setFieldValue("countryCode", e.target.value)}
                  className="outline-none text-white"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={field.value}
                  onChange={field.onChange}
                  className="outline-none bg-[#1E1E1E] w-full rounded-lg px-2 placeholder:text-[#9EA3AB] text-white"
                />
              </div>
            )}

            {errors[field.name] && (
              <p className="text-red-500">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-center text-white justify-center border-orange-primary text-md px-8 py-2 font-semibold rounded-full hover:bg-white hover:text-secondary duration-300 active:scale-75 hover:scale-105 border border-secondary disabled:opacity-50 disabled:cursor-not-allowed ${btnBgColor ? btnBgColor : "bg-tertiary"}`}
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default LandingPgForm;
