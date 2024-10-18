// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from './HomePage';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard'; // Import the Dashboard component
import AdminDashboard from './AdminDashboard'; // Import the AdminDashboard component



function App() {
  return (
    <div>
      <Router>
        <Navigation />

        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/register" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} /> {/* Add this line */}
  <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add this line */}


</Routes>

      </Router>
    </div>
  );
}

export default App;
