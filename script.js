function calcularDV(rut) {
  let suma = 0;
  let multiplo = 2;

  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut.charAt(i)) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  if (resto === 11) return "0";
  if (resto === 10) return "K";
  return resto.toString();
}

function validarRut(rutNumero, rutDV) {
  if (!/^\d{7,8}$/.test(rutNumero)) return false;
  const dvCalculado = calcularDV(rutNumero);
  return dvCalculado === rutDV.toUpperCase();
}

function guardarFicha() {
  const rutNumero = document.getElementById("rutNumero").value.trim();
  const rutDV = document.getElementById("rutDV").value.trim().toUpperCase();
  const nombres = document.getElementById("nombres").value.trim();
  const apellidoPaterno = document
    .getElementById("apellidoPaterno")
    .value.trim();
  const apellidoMaterno = document
    .getElementById("apellidoMaterno")
    .value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const nacimiento = document.getElementById("nacimiento").value;
  const estadoCivil = document.getElementById("estadoCivil").value;
  const comentarios = document.getElementById("comentarios").value.trim();

  if (!validarRut(rutNumero, rutDV)) {
    alert("RUT inválido. Verifica el número y el dígito verificador.");
    return;
  }

  if (!/^\d{7,15}$/.test(telefono)) {
    alert("Teléfono inválido. Solo números y entre 7 a 15 dígitos.");
    return;
  }

  if (!email.includes("@")) {
    alert("Email inválido.");
    return;
  }

  const rutCompleto = `${rutNumero}-${rutDV}`;
  const ficha = {
    rut: rutCompleto,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    ciudad,
    telefono,
    email,
    nacimiento,
    estadoCivil,
    comentarios,
  };

  if (localStorage.getItem(rutCompleto)) {
    if (!confirm("¿Deseas sobrescribir este registro?")) return;
  }

  localStorage.setItem(rutCompleto, JSON.stringify(ficha));
  document.getElementById("fichaForm").reset();

  alert("Ficha guardada correctamente.");
  window.location.href = "agradecimiento.html";
}

function buscarPorApellido() {
  const apellidoBuscado = document
    .getElementById("buscarApellido")
    .value.trim()
    .toLowerCase();

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const ficha = JSON.parse(localStorage.getItem(key));
      if (
        ficha.apellidoPaterno &&
        ficha.apellidoPaterno.toLowerCase() === apellidoBuscado
      ) {
        // Guardar datos en sessionStorage para mostrar en datosBusqueda.html
        sessionStorage.setItem("pacienteBuscado", JSON.stringify(ficha));
        window.location.href = "datosBusqueda.html";
        return;
      }
    }
  }

  alert("No se encontró ningún paciente con ese apellido paterno.");
}
