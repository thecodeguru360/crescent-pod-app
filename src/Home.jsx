import { Link } from "react-router-dom";
const Home = () => (
  <div className="main">
    <div>
      <div className="logo-section">
        <img
          src={process.env.PUBLIC_URL + "/crescent-logo.png"}
          alt="crescent logo"
        />
      </div>
      <h3 className="mb-30">POD Control Panel</h3>
      <div className="d-flex gap-2">
        <Link className="control-action" to="/add-form">
          <div className="control-item">
            <img
              src={process.env.PUBLIC_URL + "/add-file.png"}
              alt="crescent logo"
            />
            <p>Add POD</p>
          </div>
        </Link>
        <Link className="control-action" to="/search">
          <div className="control-item">
            <img
              src={process.env.PUBLIC_URL + "/file.png"}
              alt="crescent logo"
            />
            <p>Search POD</p>
          </div>
        </Link>
        <Link className="control-action" to="/data">
          <div className="control-item">
            <img
              src={process.env.PUBLIC_URL + "/export.png"}
              alt="crescent logo"
            />
            <p>Manage Data</p>
          </div>
        </Link>
      </div>
    </div>
    <div className="copy-text">
      <p>
        &copy; Copyright 2025 -{" "}
        <a href="https://webnbit.com/" target="_">
          webnbit.com
        </a>
      </p>
    </div>
  </div>
);
export default Home;
