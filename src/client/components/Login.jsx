import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      setLoading(true);
  
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log('Login response:', response);
      const result = await response.json();
  
      if (response.ok && result.token) {
        console.log('Login successful!');
  
        if (typeof setToken === 'function') {
          setToken(result.token);
          console.log('Token set in state:', result.token);
  
          try {
            localStorage.setItem('userToken', result.token);
            console.log('Token saved to localStorage:', result.token);
          } catch (localStorageError) {
            console.error('Error saving token to localStorage:', localStorageError);
          }
        } else {
          console.error('setToken is not a function or not provided.');
        }
  
        // Handle result.message
        if (result.message instanceof Promise) {
          result.message.then((resolvedMessage) => setMessage(resolvedMessage));
        } else {
          setMessage(result.message || 'Login successful!');
        }
  
        navigate('/', { state: { email, password } });
      } else {
        setError(result.message || 'Invalid email or password.');
      }
  
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
  
      // Log the response details if available
      if (err.response) {
        console.error('Response details:', await err.response.text());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;