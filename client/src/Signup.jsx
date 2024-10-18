import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const registerUser = () => {
    // Assuming you have an API endpoint for user registration
    const apiUrl = 'http://localhost:5000/register';

    // Send the user data to the server using Axios
    axios.post(apiUrl, { name, email, password })
      .then(response => {
        // Handle the response from the server
        console.log('Server Response:', response.data);

        // Optionally, you can redirect the user or perform other actions based on the server response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors, show a message, or take appropriate actions
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign Up</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={registerUser}>
          Register
        </button>
      </form>
      <p className="mt-3">Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default Signup;