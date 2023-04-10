import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Input.css";
import FetchData from "./FetchData";
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  let emailIsValid = true;
  let passIsValid = true;

  emailIsValid = email.trim().includes("@");
  passIsValid = password.trim().length > 5;
  const onSubmitUserDataHandler = (e) => {
    e.preventDefault();

    if (emailIsValid && passIsValid) {
      sendData();
      setError(false);
    } else {
      setError(true);
    }
  };
  const sendData = async () => {
    const response = await FetchData({
      route: "http://localhost:2000/signin",
      method: "post",
      body: {
        email,
        password,
      },
    });
    const result = await response.json();

    if (!result.success) {
      alert("Please Enter valid Email & Password");
    }
    if (result.user.token) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.user.token));
      navigate("/products");
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={onSubmitUserDataHandler}>
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className={!emailIsValid && error && "invalid"}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className={!passIsValid && error && "invalid"}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
