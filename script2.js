document.addEventListener('DOMContentLoaded', function() {

    // Lógica para la página de REGISTRO
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.onsubmit = (e) => {
            e.preventDefault();

            let valid = true;
            document.querySelectorAll(".error").forEach(err => err.textContent = "");

            const nombreInput = document.getElementById("nombre");
            const correoInput = document.getElementById("correo");
            const confirmCorreoInput = document.getElementById("confirmCorreo");
            const passwordInput = document.getElementById("password");
            const confirmPasswordInput = document.getElementById("confirmPassword");

            // Validaciones (mantienen las tuyas)
            const correoRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
            if (!correoRegex.test(correoInput.value)) {
                document.getElementById("correoError").textContent = "Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com";
                valid = false;
            }
            if (confirmCorreoInput && correoInput.value !== confirmCorreoInput.value) {
                document.getElementById("confirmCorreoError").textContent = "Los correos no coinciden.";
                valid = false;
            }
            if (passwordInput.value.length < 4 || passwordInput.value.length > 10) {
                document.getElementById("passwordError").textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
                valid = false;
            }
            if (confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
                document.getElementById("confirmPasswordError").textContent = "Las contraseñas no coinciden.";
                valid = false;
            }

            if (!valid) return;

            // Lógica de guardado en localStorage
            const userData = {
                nombre: nombreInput.value,
                correo: correoInput.value,
                password: passwordInput.value
            };
            const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            const userExists = users.some(user => user.correo === userData.correo);
            if (userExists) {
                alert("❌ Este correo ya está registrado.");
                return;
            }

            users.push(userData);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            // Muestra la alerta de éxito con los datos y redirige
            const mensaje = `✅ ¡Registro exitoso!
Nombre: ${userData.nombre}
Correo: ${userData.correo}`;
            alert(mensaje);
            window.location.href = "iniciarSesion.html";
        };
    }

    // Lógica para la página de INICIO DE SESIÓN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();

            const correoInput = document.getElementById("correo");
            const passwordInput = document.getElementById("password");
            
            let valid = true;
            document.querySelectorAll(".error").forEach(err => err.textContent = "");

            // Validaciones de inicio de sesión (puedes personalizarlas)
            if (!correoInput.value || !passwordInput.value) {
                alert("Por favor, completa todos los campos.");
                valid = false;
            }
            // Agrega aquí más validaciones si lo deseas

            if (!valid) return;
            
            // Lógica de verificación con localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const userFound = registeredUsers.find(user => 
                user.correo === correoInput.value && user.password === passwordInput.value
            );

            if (userFound) {
                alert(`¡Bienvenido, ${userFound.nombre}! ✅`);
                window.location.href = "index.html";
            } else {
                alert("❌ Correo o contraseña incorrectos.");
                passwordInput.value = "";
            }
        };
    }
});