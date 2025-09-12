/*****************************INICIAR SESION*****************************/
const form = document.getElementById("loginForm");
const correoInput = document.getElementById("correo");
const passwordInput = document.getElementById("password");
const correoError = document.getElementById("correoError");
const passwordError = document.getElementById("passwordError");

form.onsubmit = (e) => {
  let valid = true;
  correoError.textContent = "";
  passwordError.textContent = "";

  const correoRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!correoRegex.test(correoInput.value)) {
    correoError.textContent = "Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com";
    valid = false;
  }

  if (passwordInput.value.length < 4 || passwordInput.value.length > 10) {
    passwordError.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
    valid = false;
  }

  if (!valid) e.preventDefault();
  else {
    e.preventDefault(); // quítalo si quieres enviar el form
    alert("Login válido ✅");
    // window.location.href = "home.html"; // opcional redirección
  }
};
/*****************************INICIAR SESION*****************************/

/*****************************REGISTRAR USUARIO*****************************/
const form = document.getElementById("loginForm") || document.getElementById("registerForm");

if (form) {
  form.onsubmit = (e) => {
    let valid = true;

    // limpiar errores
    document.querySelectorAll(".error").forEach(err => err.textContent = "");

    const correoInput = document.getElementById("correo");
    const confirmCorreoInput = document.getElementById("confirmCorreo");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Validar correo
    const correoRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!correoRegex.test(correoInput.value)) {
      document.getElementById("correoError").textContent = "Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com";
      valid = false;
    }

    // Confirmar correo
    if (confirmCorreoInput && correoInput.value !== confirmCorreoInput.value) {
      document.getElementById("confirmCorreoError").textContent = "Los correos no coinciden.";
      valid = false;
    }
0
    // Validar contraseña
    if (passwordInput.value.length < 4 || passwordInput.value.length > 10) {
      document.getElementById("passwordError").textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      valid = false;
    }

    // Confirmar contraseña
    if (confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
      document.getElementById("confirmPasswordError").textContent = "Las contraseñas no coinciden.";
      valid = false;
    }

    if (!valid) e.preventDefault();
    else {
      e.preventDefault();
      alert("✅ Registro exitoso");
      // Aquí podrías guardar los datos con fetch o redirigir
    }
  };
}
/*****************************REGISTRAR USUARIO*****************************/