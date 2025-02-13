document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const langToggle = document.getElementById("changeLanguageBtn");
    const timeDisplay = document.getElementById("timeDisplay");
    const getWeatherBtn = document.getElementById("getWeather");
    const addSubjectBtn = document.getElementById("addSubject");
    const removeSubjectBtn = document.getElementById("removeSubject");
    const subjectSelect = document.getElementById("subjectSelect");
    const countryInput = document.getElementById("country");
    const cityInput = document.getElementById("city");
    
    let isHebrew = false;

    // Dark Mode Toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Language Toggle (Hebrew/English)
    langToggle.addEventListener("click", () => {
        isHebrew = !isHebrew;
        document.body.classList.toggle("rtl", isHebrew);

        const translations = {
            en: {
                title: "📆 Ultimate School Calendar",
                country: "Country:",
                city: "City:",
                subject: "Subject:",
                addSubject: "➕ Add",
                removeSubject: "❌ Remove Selected"
            },
            he: {
                title: "📆 לוח שנה לבית ספר",
                country: "מדינה:",
                city: "עיר:",
                subject: "נושא:",
                addSubject: "➕ הוסף",
                removeSubject: "❌ מחק נבחר"
            }
        };

        const lang = isHebrew ? "he" : "en";
        document.getElementById("title").textContent = translations[lang].title;
        document.getElementById("countryLabel").textContent = translations[lang].country;
        document.getElementById("cityLabel").textContent = translations[lang].city;
        document.getElementById("subjectLabel").textContent = translations[lang].subject;
        addSubjectBtn.textContent = translations[lang].addSubject;
        removeSubjectBtn.textContent = translations[lang].removeSubject;
    });

    // Live Time Update
    function updateTime() {
        timeDisplay.textContent = new Date().toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Fetch Weather (Fake API Placeholder)
    getWeatherBtn.addEventListener("click", () => {
        const city = cityInput.value;
        const country = countryInput.value;
        if (city && country) {
            document.getElementById("weatherInfo").textContent = `🌤️ Weather in ${city}, ${country}: 25°C`;
        }
    });

    // Add Subject
    addSubjectBtn.addEventListener("click", () => {
        const newSubject = document.getElementById("customSubject").value;
        if (newSubject) {
            const option = document.createElement("option");
            option.textContent = newSubject;
            subjectSelect.appendChild(option);
        }
    });

    // Remove Subject
    removeSubjectBtn.addEventListener("click", () => {
        if (subjectSelect.selectedIndex !== -1) {
            subjectSelect.remove(subjectSelect.selectedIndex);
        }
    });
});
