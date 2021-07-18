import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import { useParams } from "react-router-dom";
const PacientesEdit = () => {
  const { id } = useParams();
  return (
    <>
    
      <Topbar />
      <div className="wrapper">
        <h1>id: {id}</h1>
      </div>
    </>
  );
};

export default PacientesEdit;
