import React from "react";
import { useState } from "react/cjs/react.development";
import { useHistory } from "react-router-dom";
import firebase from "../config/firebase";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  function handleForm(e) {
    if (isLoading) return;
    e.preventDefault();
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        setIsLoggedIn(true);
        history.replace("/");
        setError("");
        setIsLoading(false);
      })
      .catch(function (error) {
        var errorMessage = error.message;
        setError(errorMessage);
        setIsLoading(false);
      });
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
    

  return (
    <div className="flex h-screen bg-red-100">
      <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-tr from-blue-200 to-red-300">
        <h1 className="w-full text-4xl tracking-widest text-center my-5">
          Login {isLoggedIn}
        </h1>
        <form className="m-5 w-10/12" onSubmit={handleForm}>
          {error !== "" && <p>{error}</p>}
          <div className="w-full my-6">
            <input
              className="p-2 rounded shadow w-full text-black"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={handleInput}
              name="email"
            />
          </div>
          <div className="w-full my-6">
            <input
              className="p-2 rounded shadow w-full text-black"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleInput}
              name="password"
            />
          </div>
          <div className="w-full my-6">
            <button
              type="submit"
              className="p-2 rounded shadow-md w-full bg-gradient-to-tr from-orange-200 to-green-300 text-black"
            >
              {isLoading ? "Loading...." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
