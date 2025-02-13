const weatherAPIKey = 'bfba7f78869e4222b89154845251302';
let currentUser = '';

// Initialize App
window.onload = function() {
    populateSubjects();
    setupEventListeners();
    loadReminder();
    fetchWeather();
};

// Event Listeners
function setupEventListeners() {
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
    document.getElementById('setReminderBtn').addEventListener('click', setReminder);
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

// Populate Subjects Dynamically
function populateSubjects() {
    const subjects = ['עברית', 'מתמטיקה', 'אנגלית', 'היסטוריה', 'מדעים', 'ספורט', 'תורה', 'מוסיקה', 'אחר'];
    const daysContainer = document.getElementById('days');
    for (let day = 1; day <= 5; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `
            <div>יום ${day}:</div>
            <select id="day${day}" multiple>
                ${subjects.map(subject => `<option value="${subject}">${subject}</option>`).join('')}
            </select>
            <button onclick="saveDay(${day})">שמור</button>
        `;
        daysContainer.appendChild(dayDiv);
    }
}

// Weather Fetch & Display
async function fetchWeather() {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=Tel Aviv&lang=he`);
        const weatherData = await response.json();
        const weather = weatherData.current.condition.text;
        const temperature = weatherData.current.temp_c;

        document.getElementById('weather').textContent = `מזג האוויר: ${weather} - ${temperature}°C`;

        const outfitSuggestion = (weather.toLowerCase().includes("rain"))
            ? "אל תשכח/י את המטריה!"
            : "היום חמים! לבוש קל מומלץ.";

        document.getElementById('outfitSuggestion').textContent = outfitSuggestion;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather').textContent = "לא ניתן להשיג נתוני מזג אוויר.";
    }
}

// Save User's Day Schedule
function saveDay(day) {
    const selectedOptions = Array.from(document.getElementById(`day${day}`).selectedOptions).map(o => o.value);
    localStorage.setItem(`${currentUser}_day${day}`, selectedOptions.join(', '));
    document.getElementById('savedMessage').innerText = `יום ${day} נשמר עם המקצועות: ${selectedOptions.join(', ')}`;
    setTimeout(() => { document.getElementById('savedMessage').innerText = ''; }, 3000);
    showTomorrowItems();
}

// Show Tomorrow's Schedule
function showTomorrowItems() {
    const today = new Date().getDay();
    let tomorrow = today + 1;
    if (tomorrow > 5) tomorrow = 1;
    const items = localStorage.getItem(`${currentUser}_day${tomorrow}`) || 'אין מקצועות למחר';
    document.getElementById('tomorrowItems').innerText = `פריטים למחר: ${items}`;
}

// Set Reminder for Tomorrow
function setReminder() {
    const reminder = document.getElementById('tomorrowReminder').value.trim();
    if (reminder) {
        localStorage.setItem(`${currentUser}_reminder`, reminder);
        document.getElementById('reminderDisplay').textContent = `תזכורת: ${reminder}`;
    }
}

// Load Reminder
function loadReminder() {
    const reminder = localStorage.getItem(`${currentUser}_reminder`);
    if (reminder) {
        document.getElementById('reminderDisplay').textContent = `תזכורת: ${reminder}`;
    }
}

// Login User
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const storedPass = localStorage.getItem(user);
    if (storedPass && storedPass === pass) {
        currentUser = user;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('bagScreen').classList.remove('hidden');
        loadSchedule(user);
        showTomorrowItems();
    } else {
        document.getElementById('loginMessage').innerText = 'שם משתמש או סיסמה שגויים';
    }
}

// Register User
function register() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user && pass) {
        localStorage.setItem(user, pass);
        document.getElementById('loginMessage').innerText = 'נרשמת בהצלחה! כעת תוכל להתחבר';
    } else {
        document.getElementById('loginMessage').innerText = 'יש להזין שם משתמש וסיסמה';
    }
}

// Logout User
function logout() {
    document.getElementById('bagScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    currentUser = '';
}
