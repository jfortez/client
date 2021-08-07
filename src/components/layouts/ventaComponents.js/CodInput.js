import productoServices from "../../../services/productos";

const CodInput = ({ types, setTypes, setDatosVentas, datosVentas }) => {
  const getProductosByCod = async (event) => {
    event.preventDefault();
    const productoData = await productoServices.getProductoByCod({
      cod_producto: types.cod_producto,
    });
    setDatosVentas({ ...datosVentas, producto: productoData });
  };
  return (
    <div>
      <form onSubmit={getProductosByCod}>
        <div>
          <h4>Producto</h4>
          <label htmlFor="cod_producto">Codigo de Producto:</label>
          <input
            type="text"
            name="cod_producto"
            id="cod_producto"
            value={types.cod_producto}
            onChange={(e) => setTypes({ ...types, cod_producto: e.target.value })}
          />
          <button>Buscar</button>
          {!datosVentas.producto.message ? (
            datosVentas.producto.map((data) => {
              return (
                <ul key={data.id}>
                  <li>
                    <b>Nombre del producto: </b>
                    {data.nombre}
                  </li>
                  <li>
                    <b>Cantidad Existente: </b>
                    {data.cantidad}
                  </li>
                  <li>
                    <b>Precio Unitario: </b>
                    {data.precio}
                  </li>
                </ul>
              );
            })
          ) : (
            <p>Producto no existe</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CodInput;
