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

 if (!valid) {
  e.preventDefault();
} else {
  e.preventDefault();

  // 1. Obtener los usuarios registrados de localStorage
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  // 2. Buscar si el usuario y la contraseña coinciden con algún registro
  const userFound = registeredUsers.find(user => 
    user.correo === correoInput.value && user.password === passwordInput.value
  );

  if (userFound) {
    alert("¡Inicio de sesión exitoso! ✅");
    // Opcional: Redirigir al usuario a una página de inicio
    window.location.href = "index.html";
  } else {
    alert("❌ Correo o contraseña incorrectos.");
    passwordInput.value = ""; // Limpiar el campo de contraseña
  }
}
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

   if (!valid) {
  e.preventDefault();
} else {
  e.preventDefault();
  
  // 1. Crear un objeto con los datos del usuario
  const userData = {
    nombre: document.getElementById("nombre").value,
    correo: correoInput.value,
    password: passwordInput.value,
    telefono: document.getElementById("telefono").value,
    region: document.getElementById("region").value,
    comuna: document.getElementById("comuna").value,
  };

  // 2. Obtener usuarios existentes o crear un array vacío
  const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  // 3. Comprobar si el correo ya existe
  const userExists = users.some(user => user.correo === userData.correo);
  if (userExists) {
    alert("❌ Este correo ya está registrado.");
    return; // Detener la ejecución
  }

  // 4. Agregar el nuevo usuario al array
  users.push(userData);

  // 5. Guardar el array actualizado en localStorage
  localStorage.setItem('registeredUsers', JSON.stringify(users));

  alert("✅ Registro exitoso");
  window.location.href = "iniciarSesion.html"; // Redirigir a la página de inicio de sesión
}/*****************************REGISTRAR USUARIO*****************************/