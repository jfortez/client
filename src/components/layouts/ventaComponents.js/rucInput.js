import clienteServices from "../../../services/cliente";

const RucInput = ({ types, setTypes, setDatosVentas, datosVentas }) => {
  const getClienteByRUC = async (event) => {
    event.preventDefault();
    const clienteData = await clienteServices.getRUC({ ruc: types.ruc });
    setDatosVentas({ ...datosVentas, cliente: clienteData });
  };
  return (
    <div>
      <form onSubmit={getClienteByRUC}>
        <div>
          <h4>Cliente</h4>
          <label htmlFor="ruc">RUC:</label>
          <input
            type="text"
            name="ruc"
            id="ruc"
            value={types.ruc}
            onChange={(e) => setTypes({ ...types, ruc: e.target.value })}
          />
          <button>Buscar</button>
          {!datosVentas.cliente.message ? (
            datosVentas.cliente.map((data) => {
              return (
                <ul key={data.id}>
                  <li>
                    <b>Nombres:</b>
                    {data.nombres} {data.apellidos}
                  </li>
                  <li>
                    <b>Dirección:</b> {data.direccion}
                  </li>
                </ul>
              );
            })
          ) : (
            <p>Cliente no existe</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default RucInput;
