import ActionBar from "./ActionBar";
import { Link } from "react-router-dom";

import React from "react";

const ExportSQL = () => {
  const handleExport = async () => {
    const result = await window.api.exportSQL();
    alert(result.message || "Export cancelled");
  };

  return (
    <button className="searchBtn" onClick={handleExport}>
      Export as SQL
    </button>
  );
};

const ImportSQL = () => {
  const handleImport = async () => {
    const result = await window.api.importSQL();
    alert(result.message || "Import cancelled");
  };

  return (
    <button className="searchBtn" onClick={handleImport}>
      Import SQL Dump
    </button>
  );
};

const BackupPage = () => {
  return (
    <div className="action-bar-container">
      <ActionBar>
        <Link className="action" to="/" title="Back to Control Panel">
          <div>
            <img src={process.env.PUBLIC_URL + "/house.png"} alt="Home logo" />
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
        <h3>Import / Export Database</h3>

        <div className="d-flex gap-2 search-controls">
          <div className="search-card">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/export-db.png"}
                alt="Export logo"
              />
            </div>

            <ExportSQL />
          </div>
          <div className="search-card">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/import-db.png"}
                alt="Import logo"
              />
            </div>
            <ImportSQL />
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "#222" }}>
          <i>Important: </i>The <strong>Import</strong> operation will erase all
          the existing data.
        </p>
      </div>
    </div>
  );
};
export default BackupPage;
