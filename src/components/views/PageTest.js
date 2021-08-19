import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import empresaServices from "../../services/empresa";
const PageTest = () => {
  const { isCollapsed } = useValues();
  const [empresa, setEmpresa] = useState([]);
  useEffect(() => {
    const getEmpresa = async () => {
      const compañia = await empresaServices.optionEmpresa();
      setEmpresa(compañia);
    };
    getEmpresa();
  }, []);
  var props = {
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: "Factura No456871",
    orientationLandscape: false,
    logo: {
      src: "https://raw.githubusercontent.com/jfortez/vitasmile/main/logo.png",
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: empresa[0]?.nombre,
      address: `RUC: ${empresa[0]?.ruc}`,
      phone: `Dirección: ${empresa[0]?.direccion}`,
      email: `Telefono: ${empresa[0]?.telefono}`,
      email_1: "",
      website: "",
    },
    contact: {
      label: "Invoice issued for:",
      name: "Client Name",
      address: "Albania, Tirane, Astir",
      phone: "(+355) 069 22 22 222",
      email: "client@website.al",
      otherInfo: "www.website.al",
    },
    invoice: {
      label: "Invoice #: ",
      num: 19,
      invDate: "Payment Date: 01/01/2021 18:12",
      invGenDate: "Invoice Date: 02/02/2021 10:17",
      headerBorder: false,
      tableBodyBorder: false,
      header: ["#", "Title", "Description", "Price", "Quantity", "Unit", "Total"],
      table: Array.from(Array(30), (item, index) => [
        index + 1,
        "There are many variations ",
        "Lorem Ipsum is simply dummy text ",
        200.5,
        4.5,
        "m2",
        400.5,
      ]),
      invTotalLabel: "Total:",
      invTotal: "145,250.50",
      invCurrency: "ALL",
      row1: {
        col1: "VAT:",
        col2: "20",
        col3: "%",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
      row2: {
        col1: "SubTotal:",
        col2: "116,199.90",
        col3: "ALL",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
      invDescLabel: "Invoice Note",
      invDesc:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };
  const handleCreatePdf = () => {
    jsPDFInvoiceTemplate(props);
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Página de Prueba</h1>
        <button onClick={handleCreatePdf}>Crear</button>
      </div>
    </>
  );
};

export default PageTest;
