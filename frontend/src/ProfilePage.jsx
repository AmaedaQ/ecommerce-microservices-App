import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileButton = styled.button`
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

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Get the logged-in user's profile data (assuming you have userId in localStorage)
    const userId = "user123"; // Use actual logic to fetch user ID
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((err) => {
        setError("Error fetching user profile");
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = { name, email };
    axios
      .put(`http://localhost:5000/users/${user._id}`, updatedData)
      .then((response) => {
        setUser(response.data);
        alert("Profile updated successfully");
      })
      .catch((err) => {
        setError("Error updating profile");
      });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <h2>User Profile</h2>
      <form onSubmit={handleUpdate}>
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
        <ProfileButton type="submit">Update Profile</ProfileButton>
      </form>
      {error && <p>{error}</p>}
    </ProfileContainer>
  );
};

export default ProfilePage;
