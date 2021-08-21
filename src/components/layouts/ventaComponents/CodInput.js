import { Search } from "@material-ui/icons";
import productoServices from "../../../services/productos";
import notificacion from "../../../utils/Notificaciones";

const CodInput = ({ types, setTypes, setDatosVentas, datosVentas }) => {
  const getProductosByCod = async (event) => {
    event.preventDefault();
    if (types.cod_producto === "") {
      return notificacion("Campo Vacio", "Debe Ingresar un Producto", "warning");
    }
    const productoData = await productoServices.getProductoByCod({
      cod_producto: types.cod_producto,
    });
    if (!productoData.message) {
      setDatosVentas({ ...datosVentas, producto: productoData });
    } else {
      return notificacion("Error", "Producto no Existe", "danger");
    }
  };
  return (
    <div>
      <form onSubmit={getProductosByCod}>
        <div className="venta__cliente">
          <div className="search__info">
            <label htmlFor="ruc" className="label__info">
              COD Producto
            </label>
            <input
              type="text"
              name="cod_producto"
              id="cod_producto"
              placeholder="Codigo Producto"
              value={types.cod_producto}
              onChange={(e) => setTypes({ ...types, cod_producto: e.target.value })}
            />
            <button>
              <Search />
            </button>
          </div>
          <div className="info__cliente">
            <div className="contenido">
              {datosVentas.producto.length > 0 ? (
                <table className="paleBlueRows venta">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Producto</th>
                      <th>Stock</th>
                      <th>Precio Venta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosVentas.producto.length > 0
                      ? datosVentas.producto.map((item, index) => {
                          return (
                            <tr key={index} className="rowData">
                              <td>{index + 1}</td>
                              <td>{item.nombre}</td>
                              <td>{item.cantidad}</td>
                              <td>${Number(item.precio).toFixed(2)}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              ) : (
                <h1 className="title__info">Ingrese un Producto para visualizar</h1>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CodInput;
