import { Link } from "react-router-dom";
// import { useLocation, useParams } from "react-router-dom";

const Location = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/ventas">Nueva Venta</Link>
      </li>
      <li>
        <Link to="/dashboard/ventas/caja">Caja</Link>
      </li>
      <li>
        <Link to="/dashboard/ventas/reporte">Reporte de Ventas</Link>
      </li>
    </>
  );
};
const NavigationVentas = () => {
  // const { pathname } = useLocation();
  // const { id } = useParams();
  return (
    <div>
      <ul>
        <Location />
      </ul>
    </div>
  );
};

export default NavigationVentas;
