document.addEventListener("DOMContentLoaded", () => {
    const authScreen = document.getElementById("authScreen");
    const mainContent = document.getElementById("mainContent");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");
    const loginUsername = document.getElementById("loginUsername");
    const loginPassword = document.getElementById("loginPassword");
    const registerUsername = document.getElementById("registerUsername");
    const registerPassword = document.getElementById("registerPassword");
    const themeToggle = document.getElementById("themeToggle");
    const countrySelect = document.getElementById("country");
    const citySelect = document.getElementById("city");
    const getWeatherBtn = document.getElementById("getWeather");
    const weatherInfo = document.getElementById("weatherInfo");
    const outfitSuggestion = document.getElementById("outfitSuggestion");
    const subjectSelect = document.getElementById("subjectSelect");
    const customSubjectInput = document.getElementById("customSubject");
    const addSubjectBtn = document.getElementById("addSubject");
    const removeSubjectBtn = document.getElementById("removeSubject");
    const mondaySubjectsInput = document.getElementById("mondaySubjects");
    const tuesdaySubjectsInput = document.getElementById("tuesdaySubjects");
    const wednesdaySubjectsInput = document.getElementById("wednesdaySubjects");
    const thursdaySubjectsInput = document.getElementById("thursdaySubjects");
    const fridaySubjectsInput = document.getElementById("fridaySubjects");
    const saveScheduleBtn = document.getElementById("saveSchedule");
    const tomorrowReminder = document.getElementById("tomorrowReminder");
    const setReminderBtn = document.getElementById("setReminder");
    const reminderDisplay = document.getElementById("reminderDisplay");

    // Dummy users for login/register
    const users = [];
    let currentUser = null;

    // Toggle between Login and Register
    showRegister.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });

    showLogin.addEventListener("click", () => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // Login functionality
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = loginUsername.value;
        const password = loginPassword.value;

        currentUser = users.find(user => user.username === username && user.password === password);

        if (currentUser) {
            authScreen.style.display = "none";
            mainContent.style.display = "block";
        } else {
            alert("Invalid login credentials");
        }
    });

    // Register functionality
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = registerUsername.value;
        const password = registerPassword.value;

        if (users.some(user => user.username === username)) {
            alert("Username already exists");
        } else {
            users.push({ username, password });
            alert("Registration successful! You can now log in.");
            showLogin.click();
        }
    });

    // Toggle Theme
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Set Weekly Schedule
    saveScheduleBtn.addEventListener("click", () => {
        const schedule = {
            monday: mondaySubjectsInput.value.trim(),
            tuesday: tuesdaySubjectsInput.value.trim(),
            wednesday: wednesdaySubjectsInput.value.trim(),
            thursday: thursdaySubjectsInput.value.trim(),
            friday: fridaySubjectsInput.value.trim(),
        };

        localStorage.setItem("weeklySchedule", JSON.stringify(schedule));
        alert("Schedule saved!");
    });

    // Set Reminder
    setReminderBtn.addEventListener("click", () => {
        const reminder = tomorrowReminder.value.trim();
        localStorage.setItem("tomorrowReminder", reminder);
        reminderDisplay.textContent = `Reminder: ${reminder}`;
    });

    // Fetch Weather and Suggest Outfit
    getWeatherBtn.addEventListener("click", async () => {
        const city = citySelect.value;
        const country = countrySelect.value;

        if (city && country) {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=bfba7f78869e4222b89154845251302&q=${city},${country}`);
            const weather = await response.json();

            weatherInfo.textContent = `Weather in ${city}: ${weather.current.temp_c}°C, ${weather.current.condition.text}`;
            suggestOutfit(weather);
        }
    });

    // Outfit suggestion based on weather
    function suggestOutfit(weather) {
        let suggestion = "";

        if (weather.current.temp_c < 10) {
            suggestion = "It's cold! You should take a coat and scarf.";
        } else if (weather.current.temp_c < 20) {
            suggestion = "It's chilly! A jacket would be good.";
        } else {
            suggestion = "It's warm! Wear something light.";
        }

        if (weather.current.condition.text.toLowerCase().includes("rain")) {
            suggestion += " Don't forget your umbrella!";
        }

        outfitSuggestion.textContent = suggestion;
    }

    // Subject management
    addSubjectBtn.addEventListener("click", () => {
        const customSubject = customSubjectInput.value.trim();
        if (customSubject) {
            const option = document.createElement("option");
            option.textContent = customSubject;
            subjectSelect.appendChild(option);
            customSubjectInput.value = "";
        }
    });

    removeSubjectBtn.addEventListener("click", () => {
        const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
        if (selectedOption) {
            subjectSelect.removeChild(selectedOption);
        }
    });

    // Load saved schedule and reminder on page load
    const savedSchedule = JSON.parse(localStorage.getItem("weeklySchedule"));
    if (savedSchedule) {
        mondaySubjectsInput.value = savedSchedule.monday;
        tuesdaySubjectsInput.value = savedSchedule.tuesday;
        wednesdaySubjectsInput.value = savedSchedule.wednesday;
        thursdaySubjectsInput.value = savedSchedule.thursday;
        fridaySubjectsInput.value = savedSchedule.friday;
    }

    const savedReminder = localStorage.getItem("tomorrowReminder");
    if (savedReminder) {
        reminderDisplay.textContent = `Reminder: ${savedReminder}`;
    }
});
