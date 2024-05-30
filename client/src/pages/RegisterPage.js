import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../components/UserProfileContext';

const RegisterPage = () => {
  const { login } = useUserProfile();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        login(userData);
        setErrorMessage('');
        alert("Thank you for signing up, you're successfully logged in");
        navigate('/');
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterForm onSubmit={handleRegister}>
        <InputLabel>
          Username:
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputLabel>
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
        <RegisterButton type="submit">Register</RegisterButton>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <LoginText>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginText>
      </RegisterForm>
    </RegisterPageContainer>
  );
};

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 500px;
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

const RegisterButton = styled.button`
  padding: 12px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background-color: #454545 ;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 20px; 
`;

const LoginText = styled.p`
  margin-top: 20px;
  font-size: 1rem;
`;

export default RegisterPage;