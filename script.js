document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const changeLanguageBtn = document.getElementById("changeLanguageBtn");
    const countrySelect = document.getElementById("country");
    const citySelect = document.getElementById("city");
    const getWeatherBtn = document.getElementById("getWeather");
    const timeDisplay = document.getElementById("timeDisplay");
    const weatherInfo = document.getElementById("weatherInfo");
    const outfitSuggestion = document.getElementById("outfitSuggestion");
    const subjectSelect = document.getElementById("subjectSelect");
    const customSubjectInput = document.getElementById("customSubject");
    const addSubjectBtn = document.getElementById("addSubject");
    const removeSubjectBtn = document.getElementById("removeSubject");

    const cityData = {
        Israel: ["Tel Aviv", "Jerusalem", "Haifa", "Eilat"],
        "United States": ["New York", "Los Angeles", "Chicago", "Miami"],
        "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh"]
    };

    const weatherAPIKey = "bfba7f78869e4222b89154845251302"; // Your WeatherAPI key
    const weatherBaseURL = "https://api.weatherapi.com/v1/current.json?key=" + weatherAPIKey;

    // Toggle themes
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("custom-mode");
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

    // Fetching weather data using the WeatherAPI
    getWeatherBtn.addEventListener("click", () => {
        const city = citySelect.value;
        const country = countrySelect.value;

        if (city && country) {
            const url = `${weatherBaseURL}&q=${city},${country}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        weatherInfo.innerHTML = `<p>Weather data not found for ${city}, ${country}. Try again!</p>`;
                    } else {
                        const { current, location } = data;
                        weatherInfo.innerHTML = `
                            <h3>Weather in ${location.name}, ${location.country}</h3>
                            <p>Temperature: ${current.temp_c}°C</p>
                            <p>Condition: ${current.condition.text}</p>
                        `;
                        suggestOutfit(current);
                    }
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                    weatherInfo.innerHTML = "<p>Error fetching weather data. Please try again later.</p>";
                });
        } else {
            weatherInfo.innerHTML = "<p>Please select both a country and a city.</p>";
        }
    });

    // Suggest outfit based on weather
    function suggestOutfit(weather) {
        let suggestion = "";

        if (weather.temp_c < 10) {
            suggestion = "It's cold! You should wear a coat and a scarf.";
        } else if (weather.temp_c >= 10 && weather.temp_c < 20) {
            suggestion = "It's chilly! Consider wearing a jacket.";
        } else {
            suggestion = "It's warm! A light shirt will do.";
        }

        if (weather.condition.text.toLowerCase().includes("rain")) {
            suggestion += " Don't forget to take an umbrella!";
        }

        outfitSuggestion.innerHTML = `<p>${suggestion}</p>`;
    }

    // Handle subject addition/removal
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

    // Initialize page
    document.body.classList.add("light-mode");
});
