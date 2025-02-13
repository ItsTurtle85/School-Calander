document.addEventListener("DOMContentLoaded", () => {
    const authScreen = document.getElementById("authScreen");
    const mainContent = document.getElementById("mainContent");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const themeToggle = document.getElementById("themeToggle");
    const changeLanguageBtn = document.getElementById("changeLanguageBtn");
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const newTask = document.getElementById("newTask");

    let currentLanguage = 'he'; // Default language is Hebrew

    // Toggle language
    changeLanguageBtn.addEventListener("click", () => {
        currentLanguage = currentLanguage === 'he' ? 'en' : 'he';
        toggleLanguage(currentLanguage);
    });

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

    // Handle theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.querySelectorAll('button').forEach(btn => btn.classList.toggle('dark-mode'));
        document.querySelectorAll('input').forEach(input => input.classList.toggle('dark-mode'));
    });

    // Task Management
    addTaskBtn.addEventListener("click", () => {
        if (newTask.value.trim()) {
            const newTaskItem = document.createElement("li");
            newTaskItem.textContent = newTask.value;
            taskList.appendChild(newTaskItem);
            newTask.value = '';
        }
    });

    // Show Login Screen
    document.getElementById("showLogin").addEventListener("click", () => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // Show Register Screen
    document.getElementById("showRegister").addEventListener("click", () => {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });

    // Login Form Submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // Simple validation
        if (username && password) {
            authScreen.style.display = 'none';
            mainContent.style.display = 'block';
            document.getElementById("greeting").textContent = `שלום ${username}`;
            updateTime();
        }
    });

    // Register Form Submission
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;

        if (password === confirmPassword && password.length >= 6) {
            authScreen.style.display = 'none';
            mainContent.style.display = 'block';
            document.getElementById("greeting").textContent = `שלום ${username}`;
            updateTime();
        } else {
            alert("סיסמאות לא תואמות או סיסמה חלשה");
        }
    });

    // Time and date updates
    function updateTime() {
        setInterval(() => {
            const now = new Date();
            document.getElementById("timeDisplay").textContent = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        }, 1000);
    }
});
