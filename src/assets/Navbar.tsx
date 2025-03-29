import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const isHomeActive = location.pathname === "/";
  const isAboutActive = location.pathname === "/about";
  const isRankingActive = location.pathname === "/ranking-matrix";


  const isResourcesActive =
    location.pathname === "/ct-home" ||
    location.pathname === "/resource-view" ||
    location.pathname === "/sem-papers" ||
    location.pathname === "/study-materials";


  const handleNavigate = (resourceType: string) => {
    let mappedResourceType;
    switch (resourceType) {
      case "CT Papers":
        mappedResourceType = "CT Paper";
        break;
      case "Sem Papers":
        mappedResourceType = "Sem Paper";
        break;
      case "Study Materials":
        mappedResourceType = "Study Material";
        break;
      default:
        mappedResourceType = "CT Paper";
    }

    navigate("/ct-home", { state: { resourceType: mappedResourceType } });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Acehive
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* Home Link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isHomeActive ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>

            {/* About Link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isAboutActive ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>

            {/* Resources Dropdown */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  isResourcesActive ? "active" : ""
                }`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded={isResourcesActive ? "true" : "false"}
              >
                Resources
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleNavigate("CT Papers")}
                  >
                    CT Papers
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleNavigate("Sem Papers")}
                  >
                    Sem Papers
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleNavigate("Study Materials")}
                  >
                    Study Materials
                  </button>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center ${
                  isRankingActive ? "active" : ""
                }`}
                to="/ranking-matrix"
              >
                Ranking Matrix
                <span className="badge bg-danger ms-2">New</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
