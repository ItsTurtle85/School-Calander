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

    // Populating the city dropdown based on the selected country
    countrySelect.addEventListener("change", () => {
        const cities = {
            Israel: ["Tel Aviv", "Jerusalem", "Haifa", "Eilat"],
            "United States": ["New York", "Los Angeles", "Chicago", "Miami"],
            "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh"]
        };

        const selectedCountry = countrySelect.value;
        if (selectedCountry) {
            citySelect.innerHTML = '<option value="">Select a city</option>';
            cities[selectedCountry].forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    // Set a reminder for tomorrow
    setReminderBtn.addEventListener("click", () => {
        const reminder = tomorrowReminder.value;
        if (reminder) {
            localStorage.setItem("tomorrowReminder", reminder);
            reminderDisplay.textContent = `Reminder set: ${reminder}`;
        } else {
            reminderDisplay.textContent = "Please enter a reminder.";
        }
    });

    // Fetch weather data and outfit suggestion
    getWeatherBtn.addEventListener("click", () => {
        const city = citySelect.value;
        if (city) {
            fetch(`https://api.weatherapi.com/v1/current.json?key=bfba7f78869e4222b89154845251302&q=${city}`)
                .then(response => response.json())
                .then(data => {
                    const weather = data.current;
                    weatherInfo.innerHTML = `
                        <p>Temperature: ${weather.temp_c}°C</p>
                        <p>Condition: ${weather.condition.text}</p>
                    `;
                    suggestOutfit(weather);
                });
        }
    });

    function suggestOutfit(weather) {
        let suggestion = "Weather is fine!";
        if (weather.temp_c < 10) {
            suggestion = "It's cold! Wear a coat and scarf.";
        } else if (weather.temp_c < 20) {
            suggestion = "It's chilly! A jacket would be good.";
        } else {
            suggestion = "It's warm! Wear something light.";
        }

        if (weather.condition.text.toLowerCase().includes("rain")) {
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
});
