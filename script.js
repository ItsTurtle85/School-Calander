document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const subjectSelect = document.getElementById("subjectSelect");
    const addSubjectBtn = document.getElementById("addSubject");
    const removeSubjectBtn = document.getElementById("removeSubject");
    const customSubjectInput = document.getElementById("customSubject");
    const changeLanguageBtn = document.getElementById("changeLanguageBtn");
    const timeDisplay = document.getElementById("timeDisplay");
    const weatherInfo = document.getElementById("weatherInfo");
    const getWeatherBtn = document.getElementById("getWeather");
    const countryInput = document.getElementById("country");
    const cityInput = document.getElementById("city");

    // Initialize subjects
    const subjects = ["Math", "Science", "History", "English", "Physics", "Art"];
    function populateSubjects() {
        subjectSelect.innerHTML = "";
        subjects.forEach(subject => {
            let option = document.createElement("option");
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }
    populateSubjects();

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Add custom subject
    addSubjectBtn.addEventListener("click", () => {
        const newSubject = customSubjectInput.value.trim();
        if (newSubject && !subjects.includes(newSubject)) {
            subjects.push(newSubject);
            populateSubjects();
            customSubjectInput.value = "";
        }
    });

    // Remove selected subject
    removeSubjectBtn.addEventListener("click", () => {
        const selectedSubject = subjectSelect.value;
        if (subjects.includes(selectedSubject)) {
            subjects.splice(subjects.indexOf(selectedSubject), 1);
            populateSubjects();
        }
    });

    // Real-time clock
    function updateTime() {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Fetch weather data
    getWeatherBtn.addEventListener("click", () => {
        const country = countryInput.value.trim();
        const city = cityInput.value.trim();
        if (country && city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=YOUR_API_KEY&units=metric`)
                .then(response => response.json())
                .then(data => {
                    const temp = data.main.temp;
                    const weather = data.weather[0].main;
                    let suggestion = "";
                    if (temp < 10) suggestion = "Wear a coat!";
                    else if (temp < 20) suggestion = "Wear a jacket!";
                    else suggestion = "Short sleeves are fine!";
                    if (weather.includes("Rain")) suggestion += " Don't forget an umbrella!";
                    weatherInfo.textContent = `🌡️ ${temp}°C - ${weather}. ${suggestion}`;
                })
                .catch(() => weatherInfo.textContent = "Error fetching weather");
        }
    });

    // Change language (simple example)
    let lang = "en";
    const translations = {
        en: { title: "Ultimate School Calendar", button: "Change Language" },
        he: { title: "לוח שנה אולטימטיבי לבית הספר", button: "שנה שפה" }
    };
    changeLanguageBtn.addEventListener("click", () => {
        lang = lang === "en" ? "he" : "en";
        document.querySelector("h1").textContent = translations[lang].title;
        changeLanguageBtn.textContent = translations[lang].button;
    });
});
