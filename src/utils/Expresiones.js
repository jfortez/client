const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  compañia: /^[a-zA-ZÀ-ÿ_.-\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  direccion: /^[a-zA-Z0-9À-ÿ-.\s]{4,100}$/, // Letras, numeros, Acentos
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  numero: /^\d{5,15}$/, // 7 a 14 numeros.
  ruc: /^\d{10,13}$/, // 7 a 14 numeros.
};

export default expresiones;
