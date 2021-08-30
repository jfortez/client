import { useEffect } from "react";

const VentaDetalle = ({ productosVenta, detalleVenta, setDetalleVenta }) => {
  // useEffect(() => {
  //   if (detalleVenta.length > 0 && datosVentas.producto.length > 0) {
  //     const igual = detalleVenta.filter(
  //       (item) => item.cod_producto === datosVentas.producto[0].cod_producto
  //     );
  //     if (igual[0].cantidad > datosVentas.producto[0].cantidad) {
  //       return console.log("ya superó la cantidad");
  //     }
  //   }
  // }, [detalleVenta, datosVentas.producto]);
  useEffect(() => {
    const notaVenta = productosVenta.reduce((acc, acv) => {
      const elementoYaExiste = acc.find((elemento) => elemento.cod_producto === acv.cod_producto);
      if (elementoYaExiste) {
        return acc.map((elemento) => {
          if (elemento.cod_producto === acv.cod_producto) {
            return {
              ...elemento,
              cantidad: elemento.cantidad + acv.cantidad,
              total: ((elemento.cantidad + acv.cantidad) * elemento.precio).toFixed(2),
            };
          }
          return elemento;
        });
      }
      return [...acc, acv];
    }, []);
    setDetalleVenta(notaVenta);
  }, [productosVenta, setDetalleVenta]);
  return (
    <div>
      <table className="paleBlueRows venta">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {detalleVenta
            ? detalleVenta.map((item, index) => {
                return (
                  <tr key={index} className="rowData">
                    <td>{item.cod_producto}</td>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>{Number(item.precio).toFixed(2)}</td>
                    <td>{Number(item.total).toFixed(2)}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default VentaDetalle;
