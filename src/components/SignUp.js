import React, { useEffect, useState } from "react";
import "./Input.css";
import { useNavigate } from "react-router-dom";
import FetchData from "./FetchData";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, [navigate]);
  let nameIsValid = true;
  let emailIsValid = true;
  let passIsValid = true;
  nameIsValid = name.trim().length > 0;
  emailIsValid = email.trim().includes("@");
  passIsValid = password.trim().length > 5;

  const onSubmitUserDataHandler = (e) => {
    e.preventDefault();
    if (nameIsValid && emailIsValid && passIsValid) {
      sendData();

      setError(false);
    } else {
      alert("Please Enter Valid Information");
      setError(true);
    }
  };
  const sendData = async () => {
    let result = await FetchData({
      route: "http://localhost:2000/signup",
      method: "post",
      body: {
        name,
        email,
        password,
      },
    });
    result = await result.json();

   
    if (result.user_data.token) {
      localStorage.setItem("user", JSON.stringify(result.user_data));
      localStorage.setItem("token", JSON.stringify(result.user_data.token));
      navigate("/");
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmitUserDataHandler}>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className={!nameIsValid && error && "invalid"}
        />
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
        {!passIsValid && error && (
          <p className="errorPass">Password must be greater than 5 character</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
