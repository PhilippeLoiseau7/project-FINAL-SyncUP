import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserProfile } from "../components/UserProfileContext";

const LoginPage = () => {
  const { login } = useUserProfile();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        setLoginError("");
        login(userData);
        alert("Successfuly logged in")
        navigate("/");
        console.log(userData)
      } else {
        const data = await response.json();
        setLoginError(data.message);
        console.error("Login Error:", data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginError("An error occurred during login");
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <p>
          Don't have an account? <Link to="/register">Sign up here</Link>{" "}
        </p>
      </LoginForm>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  label {
    margin-bottom: 10px;
  }

  input {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
  }

  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #0056b3;
  }

  p {
    margin-top: 10px;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default LoginPage;