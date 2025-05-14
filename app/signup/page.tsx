"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    Name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "", // clear error on input
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { Name, email, password, confirmpassword } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;
    const usernameRegex = /^[A-Za-z\s]{5,}$/;

    const errors = {
      Name: "",
      email: "",
      password: "",
      confirmpassword: "",
    };

    let isValid = true;

    if (!Name && !email && !password && !confirmpassword) {
      toast.error("First  fill the require  fields.");
      return;
    }

    if (!Name || !email || !password || !confirmpassword) {
      toast.error("First  fill in all fields.");
      return;
    }

    if (!usernameRegex.test(Name)) {
      errors.Name = "Username must be at least 4 letters .";
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be 8-16 characters with letters, numbers, and special characters";
      isValid = false;
    }

    if (password !== confirmpassword) {
      errors.confirmpassword = "Passwords did't match.";
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    // All validations passed
    axios
      .post("http://localhost:5000/login/signup", formData)
      .then((response) => {
        toast.success("Signup successful!");
        router.push("/");
      })
      .catch((error) => {
        console.error("error", error);
        toast.error("Signup failed!");
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-4xl shadow-md w-90"
      >
        <div className="mb-4">
          <input
            type="text"
            name="Name"
            placeholder="Username"
            value={formData.Name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-full shadow appearance-none focus:outline-none focus:shadow-outline ${
              formErrors.Name ? "border border-red-500" : ""
            }`}
          />
          {formErrors.Name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.Name}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-full shadow appearance-none focus:outline-none focus:shadow-outline ${
              formErrors.email ? "border border-green-500" : ""
            }`}
          />
          {formErrors.email && (
            <p className="text-black-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-full shadow appearance-none focus:outline-none focus:shadow-outline ${
              formErrors.password ? "border border-green-500" : ""
            }`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-3">{formErrors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm password"
            value={formData.confirmpassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-full shadow appearance-none focus:outline-none focus:shadow-outline ${
              formErrors.confirmpassword ? "border border-green-500" : ""
            }`}
          />
          {formErrors.confirmpassword && (
            <p className="text-red-500 text-sm mt-3">
              {formErrors.confirmpassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-24 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline float-right"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Signup;
