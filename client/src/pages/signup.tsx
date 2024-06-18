import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/logo";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signup, isLoading, user } = useAuth();

  const navigate = useNavigate();
  if (user) navigate("/dashboard");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(email, password, firstName, lastName);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <Logo />
        <h2 className="text-2xl text-center mt-[-6px] mb-8">Sign Up</h2>
        <div className="mb-4">
          <div className=" flex flex-row items-center justify-between mb-6 gap-2">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-2 border border-gray-300 rounded mt-2 outline-none focus:border-primary"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-2 border border-gray-300 rounded mt-2 outline-none focus:border-primary"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 outline-none focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark disabled:bg-primary-light disabled:cursor-wait"
          disabled={isLoading}
        >
          Sign up
        </button>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Have an account?{" "}
            <Link to="/signin" className="text-primary hover:text-primary-dark">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
