import React from "react";

const Error = () => {
  return (
    <div className="d-flex flex-column text-center justify-content-center align-items-center vh-100 w-100">
      <h1 style={{ fontSize: "105px" }}>404 - Not Found</h1>
      <p style={{ fontSize: "60px" }}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default Error;
