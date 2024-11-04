// loading component
import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100px" }}
    >
      <Spinner animation="border" role="status" variant="primary"></Spinner>
    </div>
    <h5>Loading...</h5>
  </>
);

export default Loader;
