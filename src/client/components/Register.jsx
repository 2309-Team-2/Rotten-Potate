import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/users/register';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        localStorage.setItem('token', data.token);

        // Clear form fields on successful registration
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');

        // Redirect to login page
        navigate('/login');
      } else {
        // Handling registration failure and displaying an error message
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      // Handling network errors
      setErrorMessage('An error occurred during registration');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleRegister}>
        <label>
          First Name:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;