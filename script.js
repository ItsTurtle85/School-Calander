// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Real-time clock
function updateClock() {
    const now = new Date();
    document.getElementById("timeDisplay").innerText = `⏳ Time: ${now.toLocaleTimeString()}`;
}
setInterval(updateClock, 1000);
updateClock();

// Weather API (OpenWeatherMap)
document.getElementById("getWeather").addEventListener("click", () => {
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    if (!city || !country) return alert("Please enter a city and country!");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=YOUR_API_KEY&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            let clothingAdvice = "Wear whatever you like.";
            if (temp < 10) clothingAdvice = "🧥 Wear a warm coat!";
            else if (temp < 20) clothingAdvice = "🧣 Wear a jacket!";
            else if (temp > 30) clothingAdvice = "🩳 Wear light clothes!";
            
            document.getElementById("weatherInfo").innerText = `🌡️ Temp: ${temp}°C - ${clothingAdvice}`;
        })
        .catch(() => alert("Failed to get weather data"));
});

// Subject Management
const subjects = ["Math", "Science", "History"];
const subjectSelect = document.getElementById("subjectSelect");

function updateSubjects() {
    subjectSelect.innerHTML = "";
    subjects.forEach(sub => {
        const option = document.createElement("option");
        option.value = sub.toLowerCase();
        option.textContent = sub;
        subjectSelect.appendChild(option);
    });
}

document.getElementById("addSubject").addEventListener("click", () => {
    const newSubject = document.getElementById("customSubject").value;
    if (newSubject && !subjects.includes(newSubject)) {
        subjects.push(newSubject);
        updateSubjects();
    }
});

document.getElementById("removeSubject").addEventListener("click", () => {
    const selectedSubject = subjectSelect.value;
    const index = subjects.indexOf(selectedSubject);
    if (index > -1) {
        subjects.splice(index, 1);
        updateSubjects();
    }
});

updateSubjects();
