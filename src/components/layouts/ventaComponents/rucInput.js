import { Search } from "@material-ui/icons";
import clienteServices from "../../../services/cliente";

const RucInput = ({ types, setTypes, setDatosVentas, datosVentas }) => {
  const getClienteByRUC = async (event) => {
    event.preventDefault();
    const clienteData = await clienteServices.getRUC({ ruc: types.ruc });
    if (!clienteData.message) {
      setDatosVentas({ ...datosVentas, cliente: clienteData });
    }
  };
  return (
    <div>
      <form onSubmit={getClienteByRUC}>
        <div className="venta__cliente">
          <div className="search__info">
            <span>Clientes</span>
            <input
              type="text"
              name="ruc"
              id="ruc"
              value={types.ruc}
              placeholder="RUC"
              onChange={(e) => setTypes({ ...types, ruc: e.target.value })}
            />
            <button>
              <Search />
            </button>
          </div>
          <div className="info__cliente">
            <div className="contenido">
              {datosVentas.cliente.length > 0 ? (
                <table className="paleBlueRows vercliente">
                  <thead>
                    <th>#</th>
                    <th>Nombres</th>
                    <th>Dirección</th>
                    <th>Telefono</th>
                    <th>Email</th>
                  </thead>
                  <tbody>
                    {datosVentas.cliente.length > 0
                      ? datosVentas.cliente.map((item, index) => {
                          return (
                            <tr key={index} className="rowData">
                              <td>{index + 1}</td>
                              <td>
                                {item.nombres} {item.apellidos}
                              </td>
                              <td>{item.direccion}</td>
                              <td>{item.telefono}</td>
                              <td>{item.email}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              ) : (
                <h1 className="title__info">Ingrese un RUC para visualizar</h1>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RucInput;
