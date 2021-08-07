import { useEffect } from "react";

const VentaDetalle = ({ productosVenta, detalleVenta, setDetalleVenta }) => {
  useEffect(() => {
    const notaVenta = productosVenta.reduce((acc, acv) => {
      const elementoYaExiste = acc.find((elemento) => elemento.cod_producto === acv.cod_producto);
      if (elementoYaExiste) {
        return acc.map((elemento) => {
          if (elemento.cod_producto === acv.cod_producto) {
            return {
              ...elemento,
              cantidad: elemento.cantidad + acv.cantidad,
              total: (elemento.cantidad + acv.cantidad) * elemento.precio,
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
      <table>
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
                  <tr key={index}>
                    <td>{item.cod_producto}</td>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.precio}</td>
                    <td>{item.total}</td>
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
