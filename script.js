document.addEventListener("DOMContentLoaded", () => {
    // Données pour les tableaux dynamiques des pages spécifiques
    const dataWebDevelopment = [
      { sujet: "HTML/CSS Basics", date: "2025-04-10", auteur: "Alice" },
      { sujet: "JavaScript Frameworks", date: "2025-04-11", auteur: "Bob" },
    ];
  
    const dataProgramming = [
      { sujet: "Python vs Java", date: "2025-04-12", auteur: "Charlie" },
      { sujet: "Algorithms 101", date: "2025-04-13", auteur: "Dave" },
    ];
  
    const dataDesign = [
      { sujet: "UI Trends in 2025", date: "2025-04-14", auteur: "Eve" },
      { sujet: "UX Testing Tools", date: "2025-04-15", auteur: "Frank" },
    ];
  
    // Gestion des tableaux dynamiques
    const tableBody = document.querySelector("#forumTable tbody");
    if (window.location.pathname.includes("web-development.html")) {
      populateTable(dataWebDevelopment, tableBody);
    } else if (window.location.pathname.includes("programming.html")) {
      populateTable(dataProgramming, tableBody);
    } else if (window.location.pathname.includes("design.html")) {
      populateTable(dataDesign, tableBody);
    }
  
    function populateTable(data, tableBody) {
      data.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.sujet}</td>
          <td>${entry.date}</td>
          <td>${entry.auteur}</td>
        `;
        row.addEventListener("click", () => {
          alert(`Vous allez échanger sur : ${entry.sujet}`);
        });
        tableBody.appendChild(row);
      });
    }
    
    // Fonctionnalités pour le formulaire d'inscription
    const registerForm = document.getElementById("registreForm");
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nom = document.getElementById("nom").value.trim();
        const prenom = document.getElementById("prenom").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
  
        if (password !== confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
  
        localStorage.setItem(email, JSON.stringify({ nom, prenom, password }));
        alert(`Inscription réussie ! Bienvenue ${prenom}.`);
        window.location.href = "login.html";
      });
    }
  
    // Fonctionnalités pour le formulaire de connexion
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const loginEmail = document.getElementById("loginEmail").value.trim();
        const loginPassword = document.getElementById("loginPassword").value.trim();
        const user = JSON.parse(localStorage.getItem(loginEmail));
        if (user && user.password === loginPassword) {
          alert(`Connexion réussie ! Bienvenue ${user.prenom}.`);
          window.location.href = "forum.html";
        } else {
          alert("Email ou mot de passe incorrect.");
        }
      });
    }
  
    // Affichage du message de bienvenue
    const firstName = localStorage.getItem("prenom") || "Utilisateur";
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString("fr-FR");
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
      welcomeMessage.textContent = `Bienvenue ${firstName} ! Nous sommes le ${formattedDate} et vous êtes connecté(e) à ${formattedTime}.`;
    }
  
    // Basculer la visibilité du mot de passe
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    if (togglePassword) {
      togglePassword.addEventListener("click", function () {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
      });
    }
  
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const confirmPasswordField = document.getElementById("confirmPassword");
    if (toggleConfirmPassword) {
      toggleConfirmPassword.addEventListener("click", function () {
        const type = confirmPasswordField.getAttribute("type") === "password" ? "text" : "password";
        confirmPasswordField.setAttribute("type", type);
        this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
      });
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Basculer la visibilité du mot de passe pour le formulaire de connexion
    const toggleLoginPassword = document.getElementById("toggleLoginPassword");
    const loginPasswordField = document.getElementById("loginPassword");
  
    if (toggleLoginPassword && loginPasswordField) {
      toggleLoginPassword.addEventListener("click", function () {
        const type = loginPasswordField.getAttribute("type") === "password" ? "text" : "password";
        loginPasswordField.setAttribute("type", type);
        this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
      });
    }
  });
  