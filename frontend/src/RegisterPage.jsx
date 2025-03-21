import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          name,
          email,
          password,
          role,
        }
      );
      alert(response.data.message);
      // Redirect to login page after successful registration
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <RegisterButton type="submit">Register</RegisterButton>
      </form>
      {error && <p>{error}</p>}
    </RegisterContainer>
  );
};

export default RegisterPage;
