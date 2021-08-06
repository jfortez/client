import useValues from "../../../provider/useValues";

const CantidadInput = () => {
  const { types, setTypes, setDatosVentas, datosVentas, setProductosVenta, productosVenta } =
    useValues();
  const insertProducto = () => {
    let cantidad = parseInt(types.cantidad);
    //obtenemos el producto que añadimos
    const productoAñadido = datosVentas.producto.find((producto) => producto.cod === types.cod);
    // setTypes({ ...types, lastProd: "taco" });
    if (datosVentas.producto.length > 0) {
      //verificamos que la cantidad no exceda al stock del producto
      if (cantidad > productoAñadido.cantidad) {
        return console.log("that is so big to me");
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
      console.log("debe ingresar un producto a buscar");
    }
  };
  return (
    <div>
      <div>
        <br />
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          value={types.cantidad}
          onChange={(e) => setTypes({ ...types, cantidad: e.target.value })}
        />
        <br />
        <button onClick={insertProducto}>Añadir Producto</button>
      </div>
    </div>
  );
};

export default CantidadInput;
