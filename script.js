// Translations for English and Hebrew
const translations = {
    en: {
        greeting: "Hello, select a subject",
        subjectLabel: "Subject",
        changeLanguage: "Change Language",
        subjects: {
            math: "Math",
            science: "Science",
            history: "History"
        }
    },
    he: {
        greeting: "שלום, בחר נושא",
        subjectLabel: "נושא",
        changeLanguage: "שנה שפה",
        subjects: {
            math: "מתמטיקה",
            science: "מדעים",
            history: "היסטוריה"
        }
    }
};

let currentLang = 'en'; // Default language

// Function to change language
function changeLanguage() {
    currentLang = currentLang === 'en' ? 'he' : 'en';
    updateUI();
}

// Function to update UI based on current language
function updateUI() {
    // Update greeting and labels based on language
    document.getElementById("greeting").innerText = translations[currentLang].greeting;
    document.getElementById("subjectLabel").innerText = translations[currentLang].subjectLabel;
    document.getElementById("changeLanguageBtn").innerText = translations[currentLang].changeLanguage;

    // Update the subjects in the select dropdown
    const subjectSelect = document.getElementById("subjectSelect");
    subjectSelect.innerHTML = ''; // Clear existing options
    Object.keys(translations[currentLang].subjects).forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.innerText = translations[currentLang].subjects[subject];
        subjectSelect.appendChild(option);
    });
}

// Initialize the UI on page load
document.addEventListener("DOMContentLoaded", () => {
    updateUI(); // Set the initial language and UI
    document.getElementById("changeLanguageBtn").addEventListener("click", changeLanguage);
});
