import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Add this line
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('auth')
      .select('pwd')
      .eq('user', username.trim())  // Trim spaces from username
      .single();
    
    if (error || !data || data.pwd !== password.trim()) {
      setError('Invalid username or password');
      setSuccessMessage(null);  // Clear success message if login fails
    } else {
      setError(null);
      setSuccessMessage('Login successful!');  // Set success message
      onLogin(); // Call onLogin to update authentication state
      navigate('/admin-dashboard'); // Redirect to the main admin dashboard
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h3 className="text-center mb-3">Admin Login</h3>
        <div className="form-group mb-3">
          <label>Username</label>
          <input 
            type="text" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="form-group mb-4">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Show success message */}
        <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
