import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../store/slices/authThunk";

export default () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);

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
          {authenticated && (
            <>
              <Link to="/banList">
                <li className="nav-item nav-link">Policies List</li>
              </Link>
              <li
                className="nav-item nav-link"
                onClick={() => dispatch(signOut())}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
