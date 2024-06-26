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
        alert("Successfully logged in");
        navigate("/");
        console.log(userData);
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
        <InputLabel>
          Email:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputLabel>
        <InputLabel>
          Password:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputLabel>
        <LoginButton type="submit">Login</LoginButton>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <SignupText>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </SignupText>
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
  justify-content: center;
  width: 500px;
  height: 400px;
  padding: 30px;
  border: 1px solid black;
  border-radius: 5px;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 1.1rem;
`;

const LoginButton = styled.button`
  padding: 12px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background-color: #454545;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
  font-size: 1rem; 
`;

const SignupText = styled.p`
  margin-top: 40px;
  font-size: 1rem; 
`;

export default LoginPage;