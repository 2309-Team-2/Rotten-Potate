import { useState } from 'react';
import reactLogo from './assets/react.svg';
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

function App() {
  const [count, setCount] = useState(0);

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
            <Link to="/login" className="login-register-link">Login/Register</Link>
        </div>

        <Navigations />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element = {<Login />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;

