console.log("Vadzim Hulkovich 66745");

// ===== THEME =====
const themeBtn = document.getElementById("themeBtn");
const theme = document.getElementById("theme");

themeBtn.addEventListener("click", () => {
    theme.setAttribute(
        "href",
        theme.getAttribute("href") === "style-green.css"
            ? "style-red.css"
            : "style-green.css"
    );
});

// ===== SKILLS TOGGLE =====
const toggleSkillsBtn = document.getElementById("toggleSkillsBtn");
const skillsSection = document.getElementById("skills");

toggleSkillsBtn.addEventListener("click", () => {
    skillsSection.style.display =
        skillsSection.style.display === "none" ? "block" : "none";
});

// ===== LOCAL STORAGE KEY =====
const STORAGE_KEY = "projects";

// ===== FETCH JSON =====
fetch("data.json")
    .then(res => res.json())
    .then(data => {

        // BASIC
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
        document.getElementById("footer").textContent = data.name;

        // SKILLS
        const skillsList = document.getElementById("skillsList");
        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // ===== PROJECTS (JSON + LOCAL STORAGE) =====
        initProjects(data.projects);
    });

// ===== PROJECTS LOGIC =====

const projectsList = document.getElementById("projectsList");
const addProjectBtn = document.getElementById("addProjectBtn");
const newProjectInput = document.getElementById("newProjectInput");

// INIT
function initProjects(defaultProjects) {
    let storedProjects = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!storedProjects) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
        storedProjects = defaultProjects;
    }

    renderProjects(storedProjects);
}

// RENDER
function renderProjects(projects) {
    projectsList.innerHTML = "";

    projects.forEach((project, index) => {
        const li = document.createElement("li");

        li.textContent = project;

        // DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", () => {
            deleteProject(index);
        });

        li.appendChild(deleteBtn);
        projectsList.appendChild(li);
    });
}

// ADD
addProjectBtn.addEventListener("click", () => {
    const value = newProjectInput.value.trim();

    if (value === "") return;

    const projects = JSON.parse(localStorage.getItem(STORAGE_KEY));
    projects.push(value);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

    renderProjects(projects);
    newProjectInput.value = "";
});

// DELETE
function deleteProject(index) {
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEY));

    projects.splice(index, 1);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

    renderProjects(projects);
}

// ===== VALIDATION =====

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (!firstName || !lastName || !email || !message) {
        alert("Uzupełnij wszystkie pola");
        return;
    }

    const payload = {
        firstName,
        lastName,
        email,
        message
    };

    try {
        const response = await fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.status === "success") {
            alert("Formularz wysłany poprawnie!");
            form.reset();
        }

    } catch (error) {
        console.error(error);
        alert("Błąd wysyłania danych");
    }
});