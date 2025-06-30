import ActionBar from "./ActionBar";
import { Link } from "react-router-dom";

const SearchPod = () => {
  return (
    <>
      <div className="action-bar-container">
        <ActionBar>
          <Link className="action" to="/" title="Back to Control Panel">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/house.png"}
                alt="Home logo"
              />
            </div>
          </Link>
          <Link className="action" to="/add-form" title="Add New POD">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/add-file.png"}
                alt="add file logo"
              />
            </div>
          </Link>
        </ActionBar>
        <div className="text-center">
          <h3>Search Proof of Delivery (POD)</h3>
        </div>
      </div>
    </>
  );
};
export default SearchPod;
