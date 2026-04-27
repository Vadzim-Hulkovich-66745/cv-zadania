console.log("Vadzim Hulkovich 66745");

// ===== THEME =====
const themeBtn = document.getElementById("themeBtn");
const theme = document.getElementById("theme");

themeBtn.addEventListener("click", () => {
    if (theme.getAttribute("href") === "style-green.css") {
        theme.setAttribute("href", "style-red.css");
    } else {
        theme.setAttribute("href", "style-green.css");
    }
});

// ===== SKILLS TOGGLE =====
const toggleSkillsBtn = document.getElementById("toggleSkillsBtn");
const skillsSection = document.getElementById("skills");

toggleSkillsBtn.addEventListener("click", () => {
    skillsSection.style.display =
        skillsSection.style.display === "none" ? "block" : "none";
});

// ===== FETCH JSON =====
fetch("data.json")
    .then(response => response.json())
    .then(data => {

        // BASIC INFO
        document.getElementById("name").textContent = data.name;
        document.getElementById("position").textContent = data.position;
        document.getElementById("about").textContent = data.about;

        // CONTACT
        const emailLink = document.getElementById("emailLink");
        emailLink.textContent = data.email;
        emailLink.href = "mailto:" + data.email;

        const phoneLink = document.getElementById("phoneLink");
        phoneLink.textContent = data.phone;
        phoneLink.href = "tel:" + data.phone;

        document.getElementById("city").textContent = data.city;

        // FOOTER
        document.getElementById("footer").textContent = data.name;

        // ===== SKILLS LIST =====
        const skillsList = document.getElementById("skillsList");

        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // ===== PROJECTS LIST =====
        const projectsList = document.getElementById("projectsList");

        data.projects.forEach(project => {
            const li = document.createElement("li");
            li.textContent = project;
            projectsList.appendChild(li);
        });

    });

// ===== VALIDATION =====

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    if (firstName === "") {
        firstNameError.textContent = "Imię jest wymagane";
        isValid = false;
    } else if (/\d/.test(firstName)) {
        firstNameError.textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    if (lastName === "") {
        lastNameError.textContent = "Nazwisko jest wymagane";
        isValid = false;
    } else if (/\d/.test(lastName)) {
        lastNameError.textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email jest wymagany";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Niepoprawny email";
        isValid = false;
    }

    if (message === "") {
        messageError.textContent = "Wiadomość jest wymagana";
        isValid = false;
    }

    if (isValid) {
        alert("Formularz wysłany poprawnie!");
        form.reset();
    }
});