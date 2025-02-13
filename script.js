document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const authScreen = document.getElementById("authScreen");
    const mainContent = document.getElementById("mainContent");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const themeToggle = document.getElementById("themeToggle");
    const changeLanguageBtn = document.getElementById("changeLanguageBtn");
    
    let currentLanguage = 'he'; // Default language is Hebrew

    // Toggle Language
    changeLanguageBtn.addEventListener("click", () => {
        currentLanguage = currentLanguage === 'he' ? 'en' : 'he';
        toggleLanguage(currentLanguage);
    });

    // Function to toggle between Hebrew and English
    function toggleLanguage(language) {
        const texts = {
            en: {
                loginText: "Login or Register",
                usernamePlaceholder: "Username",
                passwordPlaceholder: "Password",
                loginBtnText: "Login",
                registerText: "Don't have an account? Register",
                registerBtnText: "Register",
                loginExistingText: "Already have an account? Login",
                themeBtnText: "Toggle Theme",
                changeLanguageBtnText: "עברית / English"
            },
            he: {
                loginText: "התחבר או הרשם",
                usernamePlaceholder: "שם משתמש",
                passwordPlaceholder: "סיסמה",
                loginBtnText: "התחבר",
                registerText: "אין לך חשבון? הרשם",
                registerBtnText: "הירשם",
                loginExistingText: "כבר יש לך חשבון? התחבר",
                themeBtnText: "החלף ערכת צבעים",
                changeLanguageBtnText: "עברית / English"
            }
        };

        const langTexts = texts[language];
        
        // Update text content
        document.getElementById("title").textContent = langTexts.loginText;
        document.getElementById("loginUsername").placeholder = langTexts.usernamePlaceholder;
        document.getElementById("loginPassword").placeholder = langTexts.passwordPlaceholder;
        document.getElementById("loginForm").querySelector("button").textContent = langTexts.loginBtnText;
        document.getElementById("registerForm").querySelector("button").textContent = langTexts.registerBtnText;
        document.getElementById("showRegister").textContent = langTexts.registerText;
        document.getElementById("showLogin").textContent = langTexts.loginExistingText;
        themeToggle.textContent = langTexts.themeBtnText;
        changeLanguageBtn.textContent = langTexts.changeLanguageBtnText;
    }

    // Implement theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.querySelectorAll('button').forEach(btn => btn.classList.toggle('dark-mode'));
        document.querySelectorAll('input').forEach(input => input.classList.toggle('dark-mode'));
    });
});
