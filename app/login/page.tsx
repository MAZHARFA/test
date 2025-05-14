"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if both email and password are empty
    if (!email && !password) {
      toast.error("Enter Email and Password");
      return;
    }

    // Check if only email is missing
    if (!email) {
      toast.error("Enter an Email");
      return;
    }

    // Check if email is invalid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid Email address");
      return;
    }

    // Check if only password is missing
    if (!password) {
      toast.error("Enter a Password");
      return;
    }

    // Check if password is invalid
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Enter a valid Password");
      return;
    }

    // If all validations pass, proceed with login

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Login successful!");
        router.push("/"); // Navigate to homepage
      } else {
        toast.error("User not found.");
        // Redirect to signup page after 1.5 seconds
        setTimeout(() => {
          router.push("/signup");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid username and password");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-4xl shadow-md w-90"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="string"
            id="username"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 rounded-full shadow w-full focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-full shadow w-full focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-20"
        >
          Login
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p className="font-bold mb-2">Don't have an account?</p>
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
          >
            Create a account
          </a>
        </div>
      </form>
    </main>
  );
};

export default Login;
