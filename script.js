document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const changeLanguageBtn = document.getElementById("changeLanguageBtn");
    const countrySelect = document.getElementById("country");
    const citySelect = document.getElementById("city");
    const getWeatherBtn = document.getElementById("getWeather");
    const timeDisplay = document.getElementById("timeDisplay");
    const weatherInfo = document.getElementById("weatherInfo");
    const subjectSelect = document.getElementById("subjectSelect");
    const customSubjectInput = document.getElementById("customSubject");
    const addSubjectBtn = document.getElementById("addSubject");
    const removeSubjectBtn = document.getElementById("removeSubject");
    
    const cityData = {
        Israel: ["Tel Aviv", "Jerusalem", "Haifa", "Eilat"],
        "United States": ["New York", "Los Angeles", "Chicago", "Miami"],
        "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh"]
    };

    const weatherAPIKey = "bfba7f78869e4222b89154845251302"; // Replace with your API key
    const weatherBaseURL = "https://api.weatherapi.com/v1/current.json?key=";

    // Function to toggle theme (dark/light mode)
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Change language (English <-> Hebrew)
    changeLanguageBtn.addEventListener("click", () => {
        document.body.classList.toggle("rtl");
        const isRTL = document.body.classList.contains("rtl");
        changeLanguageBtn.textContent = isRTL ? "🌍 English / עברית" : "🌍 עברית / English";
        document.getElementById("countryLabel").textContent = isRTL ? "מדינה:" : "Country:";
        document.getElementById("cityLabel").textContent = isRTL ? "עיר:" : "City:";
        document.getElementById("subjectLabel").textContent = isRTL ? "נושא:" : "Subject:";
        document.getElementById("customSubject").placeholder = isRTL ? "הוסף נושא" : "Add a subject";
        addSubjectBtn.textContent = isRTL ? "➕ הוסף" : "➕ Add";
        removeSubjectBtn.textContent = isRTL ? "❌ הסר נבחר" : "❌ Remove Selected";
    });

    // Populating the city dropdown based on the selected country
    countrySelect.addEventListener("change", () => {
        const selectedCountry = countrySelect.value;
        if (selectedCountry) {
            citySelect.innerHTML = '<option value="">Select a city</option>';
            cityData[selectedCountry].forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            citySelect.innerHTML = '<option value="">Select a city</option>';
        }
    });

    // Fetching weather data using the OpenWeather API
    getWeatherBtn.addEventListener("click", () => {
        const city = citySelect.value;
        const country = countrySelect.value;

        if (city && country) {
            const url = `${weatherBaseURL}&q=${city},${country}&appid=${weatherAPIKey}`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === 200) {
                        const { main, weather } = data;
                        weatherInfo.innerHTML = `
                            <h3>Weather in ${city}</h3>
                            <p>Temperature: ${main.temp}°C</p>
                            <p>Humidity: ${main.humidity}%</p>
                            <p>Condition: ${weather[0].description}</p>
                        `;
                    } else {
                        weatherInfo.innerHTML = `<p>Weather data not found for ${city}, ${country}. Try again!</p>`;
                    }
                })
                .catch(() => {
                    weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
                });
        } else {
            weatherInfo.innerHTML = `<p>Please select a country and city first.</p>`;
        }
    });

    // Time display function
    function updateTime() {
        const date = new Date();
        const timeString = date.toLocaleTimeString();
        timeDisplay.textContent = `Current Time: ${timeString}`;
    }

    setInterval(updateTime, 1000); // Update every second

    // Subject handling
    const subjects = ["Math", "English", "Science", "History"];
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });

    addSubjectBtn.addEventListener("click", () => {
        const newSubject = customSubjectInput.value.trim();
        if (newSubject && !subjects.includes(newSubject)) {
            subjects.push(newSubject);
            const option = document.createElement("option");
            option.value = newSubject;
            option.textContent = newSubject;
            subjectSelect.appendChild(option);
            customSubjectInput.value = ''; // Clear the input
        }
    });

    removeSubjectBtn.addEventListener("click", () => {
        const selectedSubject = subjectSelect.value;
        if (selectedSubject && subjects.includes(selectedSubject)) {
            subjects.splice(subjects.indexOf(selectedSubject), 1);
            subjectSelect.removeChild(subjectSelect.querySelector(`option[value="${selectedSubject}"]`));
        }
    });

});
