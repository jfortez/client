import { store } from "react-notifications-component";

const notificacion = (titulo, mensaje, tipo) => {
  store.addNotification({
    title: titulo,
    message: mensaje,
    type: tipo,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
      showIcon: true,
    },
  });
};

export default notificacion;
