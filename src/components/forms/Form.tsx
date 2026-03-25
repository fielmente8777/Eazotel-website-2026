"use client";

import { countries } from "@/utils/countryCode";
import { ArrowBtn, CallIcon, MailIcon, UserIcon } from "@/utils/homePageIcons";
import axios from "axios";
import React, { useState } from "react";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const [formRes, setFormRes] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setUserPhone(value);
      setErrorMessage(value.length < 10 ? "Please enter a valid number" : "");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
    setEmailErrorMessage(
      !emailRegex.test(value) ? "Please enter a valid email address" : ""
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormRes(true);

    if (userPhone.length !== 10) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (!emailRegex.test(userEmail)) {
      setEmailErrorMessage("Please enter a valid email address.");
      return;
    }

    // const formTestApi =
    //   "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/jncSLqGC#generic-webhook";
    const formApi =
      "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/7lHAUjtz#generic-webhook";

    try {
      const { data } = await axios.post(
        `https://nexon.eazotel.com/eazotel/addcontacts`,
        // formApi,
        {
          Domain: "fielmente",
          // Domain: "abhijeet",
          email: userEmail,
          Name: userName,
          Contact: `${countryCode}${userPhone}`,
          Description: userMessage,
          // email: userEmail,
          // name: userName,
          // phone: `${countryCode}${userPhone}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.Status) {
      // if (data.success) {
        setFormRes(true);
        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setCountryCode("+91"); // Reset country code
        setFormRes(false);
        // router.push(`/thank-you/`);
        window.open("/thank-you/", "_blank");
        // router.push(`/thank-you/?name=${encodeURIComponent(userName)}`);
      } else {
        setFormRes(false);
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formData = [
    {
      icon: <UserIcon />,
      tag: "input",
      type: "text",
      name: "name",
      placeholder: "Full Name*",
      required: true,
      value: userName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
      },
    },
    {
      icon: <CallIcon />,
      tag: "div", // Use div to wrap select and input for phone number
      name: "phone",
      placeholder: "Phone Number*",
      required: true,
      content: (
        <div className="flex gap-2 text-base">
          <select
            id="countryCode"
            name="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-auto bg-transparent text-white focus:outline-none"
            style={{ inlineSize: `${countryCode.length + 2}ch` }}
            aria-label="Country Code"
          >
            {countries.map((country, index) => (
              <option key={index} value={country.code} className="text-black">
                {`${country.code}`}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            max={"9999999999"}
            placeholder="Phone Number*"
            value={userPhone}
            onChange={handlePhoneChange}
            className="w-full bg-transparent rounded-md placeholder:text-black-primary text-white no-spinner focus:outline-none py-2"
          />
        </div>
      ),
    },
    {
      tag: "input",
      icon: <MailIcon />,
      type: "email",
      name: "email",
      placeholder: "Email Id*",
      required: true,
      value: userEmail,
      onChange: handleEmailChange,
    },
    // {
    //   tag: "textarea",
    //   type: "text",
    //   name: "",
    //   placeholder: "Your Message*",
    //   required: true,
    //   value: userMessage,
    //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUserMessage(e.target.value);
    //   },
    // },
  ];
  return (
    <form
      onSubmit={handleSubmit}
      className={`grid md:grid-cols-4 md:rounded-full rounded-[20px] overflow-hidden glassy-card p-2 `}
    >
      <div className="md:col-span-3 grid md:grid-cols-3 md:py-2">
        {formData.map((data, index) => (
          <div
            key={index}
            className={`w-full  flex gap-2 items-center md:px-4 max-md:py-2 ${formData.length - 1 !== index ? "md:border-r max-md:border-b" : ""} border-white/40 "}`}
          >
            <label htmlFor={data.name}>{data.icon}</label>
            <div className={`w-full  bg-transparent flex items-center `}>
              {data.tag === "div"
                ? data.content
                : React.createElement(data.tag, {
                    id: data.name,
                    type: data.type,
                    name: data.name,
                    value: data.value,
                    onChange: data.onChange,
                    placeholder: data.placeholder,
                    required: data.required,
                    autoComplete: "off",
                    spellCheck: "false",
                    className:
                      "w-full placeholder:text-white max-md:text-sm bg-transparent text-white no-spinner resize-none focus:outline-none valid:outline-blue-primary invalid:outline-Saffron-primary py-2",
                  })}
            </div>
            {data.name === "phone" && errorMessage && (
              <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
            )}
            {data.name === "email" && emailErrorMessage && (
              <p className="text-sm text-red-500 mt-2">{emailErrorMessage}</p>
            )}
          </div>
        ))}
      </div>

      <button className="w-full max-md:py-2 text-center bg-white text-black border-orange-primary text-md px-8 h-full   font-semibold  duration-300 rounded-full border-white hover:scale-105 border">
        {formRes ? (
          "Loading...."
        ) : (
          <span className="flex items-center justify-center gap-2">
            Get a FREE Quote!
            <span className="aspect-square bg-black text-white rounded-full flex items-center justify-center">
              <ArrowBtn />
            </span>
          </span>
        )}
      </button>
    </form>
  );
};

export default Form;
