import React from 'react'
import { Link } from "react-router-dom";

export default function Navigations() {
  return (
    <nav>
      <div className="navbar">
        <Link className="navbar-link" to="/allmovies">
          All Movies
        </Link>
        <a
          className="navbar-link"
          href="https://www.fandango.com/movies-in-theaters"
          target="_blank"
          rel="noopener noreferrer"
        >
          Now Playing
        </a>
        <Link className="navbar-link" to="/categories">
          Random Movie
        </Link>
      </div>
    </nav>
  );
}
