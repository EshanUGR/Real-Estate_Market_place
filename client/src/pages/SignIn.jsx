import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    setLocalError(null);
    setSuccess(null);

    if (!formData.email || !formData.password) {
      setLocalError("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || "Sign in failed"));
        setLocalError(data.message || "Sign in failed");
      } else {
        setSuccess("Sign in successful. Redirecting...");
        setFormData({ email: "", password: "" });
        setTimeout(() => {
          navigate("/");
        }, 2000);
        dispatch(signInSuccess(data));
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
      setLocalError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>

      {localError && <p className="mt-5 text-red-500">{localError}</p>}
      {error && !localError && <p className="mt-5 text-red-500">{error}</p>}
      {success && <p className="mt-5 text-green-500">{success}</p>}
    </div>
  );
};

export default SignIn;
