const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  compañia: /^[a-zA-ZÀ-ÿ_.-\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  direccion: /^[a-zA-Z0-9À-ÿ-.\s]{4,100}$/, // Letras, numeros, Acentos
  telefono: /^\d{7,12}$/, // 7 a 14 numeros.
  numero: /^\d{1,5}$/,
  edad: /^\d{1,3}$/,
  ruc: /^\d{10,13}$/, // 7 a 14 numeros.
  cod: /^\d{3,20}$/, // 7 a 14 numeros.
  nombre_servicio: /^[a-zA-Z0-9À-ÿ-.\s]{4,100}$/,
};

export default expresiones;
