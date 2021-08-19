import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import axios from "axios";
import { saveAs } from "file-saver";

const PageTest = () => {
  const { isCollapsed } = useValues();

  const dataFile = {
    name: "asdasd",
    receiptId: 30,
    price1: 50,
    price2: 60,
  };
  const handleGenerar = async () => {
    const sendData = await axios.post(
      "http://192.168.0.104:5000/api/document/create-pdf",
      dataFile
    );
    if (sendData) {
      const pdf = await axios.get("http://192.168.0.104:5000/api/document/fetch-pdf", {
        responseType: "blob",
      });
      if (pdf) {
        const pdfBlob = new Blob([pdf.data], { type: "application/pdf" });
        // setPdf(pdfBlob);
        saveAs(pdfBlob, "result.pdf");
      }
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Página de Prueba</h1>
        <button onClick={handleGenerar}>Generar</button>
      </div>
    </>
  );
};

export default PageTest;
