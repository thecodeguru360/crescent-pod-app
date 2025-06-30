import ActionBar from "./ActionBar";
import { Link } from "react-router-dom";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import AutocompleteInput from "./AutoCompleteInput";
import { useForm } from "react-hook-form";

const dummyData = [
  {
    id: "POD001",
    consigneeName: "Ali Khan",
    dated: "2025-06-28",
    driverName: "Ahmed",
  },
  {
    id: "POD002",
    consigneeName: "Sara Sheikh",
    dated: "2025-06-25",
    driverName: "Bilal",
  },
  {
    id: "POD003",
    consigneeName: "Zara Ali",
    dated: "2025-06-22",
    driverName: "Kashif",
  },
  {
    id: "POD003",
    consigneeName: "Zara Ali",
    dated: "2025-06-22",
    driverName: "Kashif",
  },
  {
    id: "POD003",
    consigneeName: "Zara Ali",
    dated: "2025-06-22",
    driverName: "Kashif",
  },
  {
    id: "POD003",
    consigneeName: "Zara Ali",
    dated: "2025-06-22",
    driverName: "Kashif",
  },
  {
    id: "POD003",
    consigneeName: "Zara Ali",
    dated: "2025-06-22",
    driverName: "Kashif",
  },
  {
    id: "POD003",
    consigneeName: "Zara Ali",
    dated: "2025-06-22",
    driverName: "Kashif",
  },
  // ➕ add more items for pagination
];

const SearchPod = () => {
  const [forms, setForms] = useState(dummyData);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [client_id, setClientId] = useState();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClients();
    loadRecentForms();
  }, []);

  const loadClients = () => {
    if (window.api) {
      if (window.api.getClients()) {
        window.api.getClients().then((data) => {
          setClients(data);
        });
      } else console.error("window.api.getClients not defined");
    } else {
      console.error("window.api or window.api.getClients is undefined");
    }
  };

  const loadRecentForms = () => {
    if (window.api) {
      if (window.api.getRecentForms) {
        window.api.getRecentForms().then((response) => {
          console.log(response);
          if (response) setForms(response);
        });
      }
    }
  };

  const searchByClientId = (client_id) => {
    if (window.api) {
      if (window.api.getFormByClientId) {
        window.api.getFormByClientId(client_id).then((response) => {
          console.log(typeof response);

          if (response) setForms(response);
        });
      }
    }
  };
  const searchById = (form_id) => {
    if (window.api) {
      if (window.api.getFormById) {
        window.api.getFormById(form_id).then((response) => {
          console.log(response);
          console.log(typeof response);

          if (response) setForms([response]);
        });
      }
    }
  };
  const searchByDate = (date) => {
    console.log(date);
    if (window.api) {
      if (window.api.getFormByDate) {
        window.api.getFormByDate(date).then((response) => {
          console.log(response);
          console.log(typeof response);
          if (response) {
            if (typeof response === "object") {
              setForms([response]);
            } else {
              setForms(response);
            }
          }
        });
      }
    }
  };

  const handleSearchByClient = (data) => {
    if (client_id) searchByClientId(client_id);
  };
  const handleSearchById = (data) => {
    console.log(data);
    if (data.id) searchById(data.id);
  };
  const handleSearchByDate = (data) => {
    console.log(data);
    if (data.date) searchByDate(data.date);
  };

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
          <button
            className="action"
            style={{ marginLeft: "auto" }}
            type="button"
            onClick={loadRecentForms}
            title="Reload"
          >
            <div>
              <img
                src={process.env.PUBLIC_URL + "/sync.png"}
                alt="save record"
              />
            </div>
          </button>
        </ActionBar>
        <div className="text-center">
          <h3>Search Proof of Delivery (POD)</h3>
        </div>
        <div className="d-flex gap-2 search-controls">
          <div className="search-card">
            <p>Search by POD ID</p>
            <input type="text" className="form-input" {...register("id")} />
            <div>
              <button
                type="button"
                className="searchBtn"
                onClick={handleSubmit(handleSearchById)}
              >
                Search
              </button>
            </div>
          </div>
          <div className="search-card">
            <p>Search by Date</p>
            <input type="date" className="form-input" {...register("date")} />
            <div>
              <button
                type="button"
                className="searchBtn"
                onClick={handleSubmit(handleSearchByDate)}
              >
                Search
              </button>
            </div>
          </div>
          <div className="search-card">
            <p>Search by Consignee Name</p>
            <AutocompleteInput
              name="consigneeName"
              control={control} // from useForm()
              suggestions={clients}
              className="form-input"
              onSelect={setClientId}
              placeholder="Start typing client name..."
            />
            <div>
              <button
                type="button"
                className="searchBtn"
                onClick={handleSubmit(handleSearchByClient)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
          <DataTable data={forms} />
        </div>
      </div>
    </>
  );
};
export default SearchPod;
