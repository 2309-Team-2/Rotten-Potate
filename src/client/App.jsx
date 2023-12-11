import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Navigations from './components/Navigations';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import CommentSection from './components/CommentSection';
import MovieDetail from './components/MovieDetail';
import Register from './components/Register';
import ReviewList from './components/ReviewList';
import SearchBar from './components/SearchBar';
import SingleMovie from './components/SingleMovie';
import Profile from './components/Profile';
import MovieList from './components/MovieList';
import RandomMovie from './components/RandomMovie';

function App() {
  const [token, setToken] = useState(null);
  const [searchResults] = useState([]);

  return (
    <Router>
      <>
      <div className="header-container">
  <Link to="/logo" style={{ textDecoration: "none" }}>
    <h1 className="title">
      <img id="logo-img" src="./holderlogo.png" alt="logo" />
      Rotten Potatoes
    </h1>
  </Link>
  <div className="button-container">
    {token ? (
      <Link to="/profile" className="profile-link">
        My Profile
      </Link>
    ) : (
      <>
        <Link to="/login" className="login-link">
          Log In
        </Link>
        <Link to="/register" className="register-link">
          Register
        </Link>
      </>
    )}
  </div>
</div>

        <Navigations />

        <Routes>
          <Route path="/logo" element={<Home token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/profile"
            element={<Profile token={token} setToken={setToken} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/allmovies" element={<MovieList searchResults={searchResults} />} />
          <Route path="/search" element={<MovieList searchResults={searchResults} />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/random" element={<RandomMovie />} />
          <Route path="/Home" element={<Home/>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
