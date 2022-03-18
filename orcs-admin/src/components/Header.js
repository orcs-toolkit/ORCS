import { Link } from "react-router-dom";

export default () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top bg-primary"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <Link to="/" className="navbar-brand">
        ORCS
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <Link to="/banList">
            <li className="nav-item nav-link">Policies List</li>
          </Link>
          <Link to="/login">
            <li className="nav-item nav-link">Login</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
