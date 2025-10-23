
function toggleForm() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const title = document.getElementById("form-title");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        title.textContent = "Iniciar Sesión";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        title.textContent = "Registrarse";
    }
}


function register() {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert("Completa todos los campos.");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Usuario ya existe.");
        return;
    }

    localStorage.setItem(username, password);
    alert("Registrado correctamente. Ahora inicia sesión.");
    toggleForm();
}


function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;
    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html"; 
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function showUserIfLoggedIn() {
    const currentUser = localStorage.getItem("currentUser");

    
    const usernameSpan = document.getElementById("navbar-username");
    const logoutButton = usernameSpan ? usernameSpan.nextElementSibling : null;

    if (currentUser) {
        if (usernameSpan) {
            usernameSpan.textContent = currentUser; 
        }
        if (logoutButton) {
            logoutButton.style.display = "inline-block"; 
        }
    } else {
        if (usernameSpan) {
            usernameSpan.textContent = ""; 
        }
        if (logoutButton) {
            logoutButton.style.display = "none"; 
        }
    }
}


function logout() {
    localStorage.removeItem("currentUser");
    showUserIfLoggedIn(); 
}


window.onload = showUserIfLoggedIn;