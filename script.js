document.addEventListener("DOMContentLoaded", () => {
  // Gestion des tableaux dynamiques
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
  
  const tableBody = document.querySelector("#forumTable tbody");
  if (window.location.pathname.includes("web-development.html")) {
    populateTable(dataWebDevelopment, tableBody);
  } else if (window.location.pathname.includes("programming.html")) {
    populateTable(dataProgramming, tableBody);
  } else if (window.location.pathname.includes("design.html")) {
    populateTable(dataDesign, tableBody);
  }

  function populateTable(data, tableBody) {
    if (tableBody) {
      tableBody.innerHTML = ""; // Nettoie les anciennes données
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
      localStorage.setItem("dernierUtilisateur", email); // Sauvegarde le dernier utilisateur
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
        localStorage.setItem("dernierUtilisateur", loginEmail); // Met à jour le dernier utilisateur connecté
        alert(`Connexion réussie ! Bienvenue ${user.prenom}.`);
        window.location.href = "forum.html";
      } else {
        alert("Email ou mot de passe incorrect.");
      }
    });
  }

  // Affichage du message de bienvenue
  const utilisateurEmail = localStorage.getItem("dernierUtilisateur"); // Email du dernier utilisateur connecté
  const utilisateur = utilisateurEmail ? JSON.parse(localStorage.getItem(utilisateurEmail)) : null;
  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    if (utilisateur) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = currentDate.toLocaleTimeString("fr-FR");
      welcomeMessage.innerHTML = `Bienvenue, ${utilisateur.prenom} ${utilisateur.nom} ! Aujourd'hui, nous sommes le <strong>${formattedDate}</strong>. <br>Heure de connexion : <strong>${formattedTime}</strong>.`;
    } else {
      welcomeMessage.textContent = "Bienvenue, invité ! Veuillez vous connecter.";
    }
  }

  // Basculer la visibilité du mot de passe
  togglePasswordVisibility("togglePassword", "password");
  togglePasswordVisibility("toggleConfirmPassword", "confirmPassword");
  togglePasswordVisibility("toggleLoginPassword", "loginPassword");

  function togglePasswordVisibility(toggleId, passwordId) {
    const toggleButton = document.getElementById(toggleId);
    const passwordField = document.getElementById(passwordId);
    if (toggleButton && passwordField) {
      toggleButton.addEventListener("click", function () {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        this.innerHTML = type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
      });
    }
  }
});
