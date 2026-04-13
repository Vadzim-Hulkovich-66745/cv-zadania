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