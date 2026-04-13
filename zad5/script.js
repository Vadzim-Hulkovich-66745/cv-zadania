// Номер индекса в коде (ТРЕБОВАНИЕ)
console.log("Vadzim Hulkovich 66745");

// элементы
const themeBtn = document.getElementById("themeBtn");
const toggleSkillsBtn = document.getElementById("toggleSkillsBtn");
const theme = document.getElementById("theme");
const skills = document.getElementById("skills");

// переключение темы
themeBtn.addEventListener("click", () => {
    if (theme.getAttribute("href") === "style-green.css") {
        theme.setAttribute("href", "style-red.css");
    } else {
        theme.setAttribute("href", "style-green.css");
    }
});

// скрытие / показ
toggleSkillsBtn.addEventListener("click", () => {
    if (skills.style.display === "none") {
        skills.style.display = "block";
    } else {
        skills.style.display = "none";
    }
});

// ===== ZADANIE 5 - WALIDACJA =====

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // поля
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // ошибки (div)
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // очистка
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    // === WALIDACJA IMIĘ ===
    if (firstName === "") {
        firstNameError.textContent = "Imię jest wymagane";
        isValid = false;
    } else if (/\d/.test(firstName)) {
        firstNameError.textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    // === NAZWISKO ===
    if (lastName === "") {
        lastNameError.textContent = "Nazwisko jest wymagane";
        isValid = false;
    } else if (/\d/.test(lastName)) {
        lastNameError.textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    // === EMAIL ===
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email jest wymagany";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Niepoprawny email";
        isValid = false;
    }

    // === MESSAGE ===
    if (message === "") {
        messageError.textContent = "Wiadomość jest wymagana";
        isValid = false;
    }

    // SUCCESS
    if (isValid) {
        alert("Formularz wysłany poprawnie!");
        form.reset();
    }
});