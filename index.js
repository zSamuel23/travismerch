
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
      window.location.href = "index.html"; 
}


window.onload = showUserIfLoggedIn;