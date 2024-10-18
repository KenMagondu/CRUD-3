import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      // Update the apiUrl to match your server's endpoint
      const apiUrl = 'http://localhost:5000/login';
  
      const response = await axios.post(apiUrl, { email, password });
  
      console.log('Server Response:', response.data);
  
      if (response.status === 200) {
        // Redirect the user to a different page after successful login
        const redirectUrl = response.data.role === 'admin' ? '/admin-dashboard' : '/dashboard';
        navigate(redirectUrl);
      } else {
        // Handle unsuccessful login (display error message, etc.)
        console.log('Login failed! Invalid email or password.');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      console.error('Status Code:', error.response.status);
      // Handle errors, show a message, or take appropriate actions
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Log In</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
