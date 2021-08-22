import { Search } from "@material-ui/icons";
import productoServices from "../../../services/productos";
import notificacion from "../../../utils/Notificaciones";

const CodInput = ({
  types,
  setTypes,
  setDatosVentas,
  datosVentas,
  setProductosVenta,
  productosVenta,
}) => {
  const getProductosByCod = async (event) => {
    event.preventDefault();
    if (types.cod_producto === "") {
      return notificacion("Campo Vacio", "Debe llenar el campo", "warning");
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
  const insertProducto = () => {
    let cantidad = parseInt(types.cantidad);
    //obtenemos el producto que añadimos
    const productoAñadido = datosVentas.producto.find((producto) => producto.cod === types.cod);
    // setTypes({ ...types, lastProd: "taco" });
    if (datosVentas.producto.length > 0) {
      //verificamos que la cantidad no exceda al stock del producto
      if (cantidad > productoAñadido.cantidad) {
        return notificacion("Limite Stock", "La cantidad supera el stock del prducto", "warning");
      }
      //obtenemos el producto que se buscó y insertó, le añadimos una propiedad al objeto
      const prodSelected = {
        ...productoAñadido,
        cantidad,
        total: cantidad * productoAñadido.precio,
      };
      setProductosVenta([...productosVenta, prodSelected]);
      setDatosVentas({ ...datosVentas, producto: [] });
      setTypes({ ...types, cod_producto: "", cantidad: 1 });
    } else {
      return notificacion("Sin Producto", "debe ingresar un producto a buscar", "warning");
    }
  };
  return (
    <div>
      <div className="container c__venta">
        <div className="item-0 search__info">
          <form action="" onSubmit={getProductosByCod}>
            <label htmlFor="cod_producto" className="label__info">
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
          </form>
        </div>
        <div className="item-1 info__cliente">
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
        <div className="item-2">
          <div className="cant__producto">
            <label htmlFor="cantidad" className="label__info">
              Cantidad
            </label>
            <input
              type="number"
              name="cantidad"
              id="cantidad"
              value={types.cantidad}
              onChange={(e) => setTypes({ ...types, cantidad: e.target.value })}
            />
            <button onClick={insertProducto}>Agregar Producto</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodInput;
