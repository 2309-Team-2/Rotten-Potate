import { Link } from "react-router-dom";

export default function Navigations() {
  return (
    <nav>
      <div className="navbar">
        <Link className="navbar-link" to="/allmovies">
          {" "}
          All Movies
        </Link>
        <div class="dropdown">
          <Link className="navbar-link" to="/categories">
            {" "}
            Categories
          </Link>
          <div class="dropdown-content">
            <ul>
              <li>
                {" "}
                <Link className="navbar-link" to="/action">
                  {" "}
                  Action
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/anime">
                  {" "}
                  Anime
                </Link>
              </li>
              <li>
                {" "}
                <Link className="navbar-link" to="/comedy">
                  {" "}
                  Comedies
                </Link>
              </li>
              <li>
                {" "}
                <Link className="navbar-link" to="/drama">
                  {" "}
                  Drama
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/horror">
                  {" "}
                  Horror
                </Link>
              </li>
              <li>
                {" "}
                <Link className="navbar-link" to="/music">
                  {" "}
                  Music & Musicals
                </Link>
              </li>
              <li>
                {" "}
                <Link className="navbar-link" to="/romance">
                  {" "}
                  Romance
                </Link>
              </li>
              <li>
                {" "}
                <Link className="navbar-link" to="/sci-fi">
                  {" "}
                  Sci-Fi
                </Link>
              </li>
              <li>
                {" "}
                <Link className="navbar-link" to="/sports">
                  {" "}
                  Sports
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/thriller">
                  {" "}
                  Thriller
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <a
          className="navbar-link"
          href="https://www.fandango.com/movies-in-theaters"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Now Playing
        </a>
        <Link className="navbar-link" to="/categories">
          {" "}
          Random Movie
        </Link>
      </div>
    </nav>
  );
}
