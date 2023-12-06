
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Navigations from './components/Navigations';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard'
import CategoryFilter from './components/CategoryFilter'
import CommentSection from './components/CommentSection'
import MovieDetail from './components/MovieDetail'
import Register from './components/Register'
import ReviewList from './components/ReviewList'
import SearchBar from './components/SearchBar'
import SingleMovie from './components/SingleMovie'
import Profile from './components/Profile';
import MovieList from './components/MovieList';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleUpdateProfile = async (updatedProfileData) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfileData),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Router>
      <>
        <div className='header-container'>
          <Link to='/' style={{ textDecoration: 'none' }}>
          <h1 className='title'>
          <img id='logo-img' src='./holderlogo.png'></img>
          Rotten Potatoes
          </h1>
          </Link>
            {/* Search Bar */}
            <div className='search-bar-container'>
              <div className='search-bar'>
              <input className="search-length" type="text" placeholder="Search..." />
              <button type="button">&#128269;</button>
              </div>
            </div>
            {token ? (
            // If the user is logged in, display the profile link and a logout button
            <div>
              <Link to="/profile" className="profile-link">My Profile</Link>
            </div>
          ) : (
            // If the user is not logged in, display the login/register link
            <div>
            <Link to="/login" className="login-link">Log In</Link>
            <Link to="/register" className="register-link">Register</Link>
            </div>
          )}
        </div>


        <Navigations />
        
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile"
            element={<Profile user={user} onUpdateProfile={handleUpdateProfile} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/allmovies" element={<MovieList />} />
        </Routes> 

      </>
    </Router>
  );
}

export default App;
