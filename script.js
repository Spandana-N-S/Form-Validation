// script.js file to enable form validation with password strength checker, email validation, and show/hide functionality

const form = document.querySelector("form");

// Get field elements
const fullnameField = document.querySelector(".fullname");
const fullnameInput = document.getElementById("fullname");

const usernameField = document.querySelector(".username");
const usernameInput = document.getElementById("username");
const usernameCounter = document.querySelector(".username .counter");

const emailField = document.querySelector(".email");
const emailInput = document.getElementById("email");
const emailIcon1 = document.querySelector(".email .icon1");
const emailIcon2 = document.querySelector(".email .icon2");
const emailErrorText = document.querySelector(".email .error-text");

const passwordField = document.querySelector(".password");
const passwordInput = document.getElementById("password");
const passShowBtn = document.querySelector(".password .showBtn");
const passWeak = document.querySelector(".password .weak");
const passMedium = document.querySelector(".password .medium");
const passStrong = document.querySelector(".password .strong");
const passText = document.querySelector(".password .text");

const cPasswordField = document.querySelector(".confirm-password");
const cPasswordInput = document.getElementById("cPassword");
const cPassShowBtn = document.querySelector(".confirm-password .showBtn");
const cPassErrorText = document.querySelector(".confirm-password .error-text");

const requirementList = document.querySelectorAll(".requirement-list li");

// Regex patterns
let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

// Username character counter
usernameInput.onkeyup = () => {
    let maxLength = usernameInput.getAttribute("maxlength");
    usernameCounter.innerText = maxLength - usernameInput.value.length;
};

// Fullname validation - no special characters allowed
function checkFullname() {
    const fullname = fullnameInput.value.trim();
    // Allow only letters, spaces, and hyphens
    const fullnameRegex = /^[a-zA-Z\s\-]+$/;
    
    if (fullname === "") {
        fullnameInput.style.borderColor = "lightgrey";
        fullnameField.classList.remove("valid");
        fullnameField.classList.remove("error");
    } else if (!fullnameRegex.test(fullname)) {
        fullnameInput.style.borderColor = "#e74c3c";
        fullnameInput.style.background = "#fceae9";
        fullnameField.classList.add("error");
        fullnameField.classList.remove("valid");
    } else {
        fullnameInput.style.borderColor = "#27ae60";
        fullnameInput.style.background = "#eafaf1";
        fullnameField.classList.remove("error");
        fullnameField.classList.add("valid");
    }
}

// Email validation - only gmail.com and mail.com allowed
function checkEmail() {
    const email = emailInput.value.trim().toLowerCase();
    
    if (email === "") {
        emailInput.style.borderColor = "lightgrey";
        emailInput.style.background = "#fff";
        emailIcon1.style.display = "none";
        emailIcon2.style.display = "none";
        emailErrorText.style.display = "none";
        emailField.classList.remove("valid");
    } else {
        // Check if email matches the pattern and has allowed domains
        const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+)$/;
        
        if (emailRegex.test(email)) {
            const domain = email.split('@')[1];
            
            // Check if domain is gmail.com or mail.com
            if (domain === 'gmail.com' || domain === 'mail.com') {
                // Valid email with allowed domain
                emailInput.style.borderColor = "#27ae60";
                emailInput.style.background = "#eafaf1";
                emailIcon1.style.display = "none";
                emailIcon2.style.display = "block";
                emailErrorText.style.display = "none";
                emailField.classList.add("valid");
            } else {
                // Invalid domain - show specific error messages
                emailInput.style.borderColor = "#e74c3c";
                emailInput.style.background = "#fceae9";
                emailIcon1.style.display = "block";
                emailIcon2.style.display = "none";
                emailField.classList.remove("valid");
                
                if (domain === 'gail.com') {
                    emailErrorText.textContent = "Did you mean gmail.com?";
                } else if (domain === 'mil.com') {
                    emailErrorText.textContent = "Did you mean mail.com?";
                } else if (domain === 'gmal.com' || domain === 'gmial.com' || domain === 'gamil.com') {
                    emailErrorText.textContent = "Did you mean gmail.com? (check spelling)";
                } else if (domain === 'mal.com' || domain === 'maill.com' || domain === 'maill.com') {
                    emailErrorText.textContent = "Did you mean mail.com? (check spelling)";
                } else {
                    emailErrorText.textContent = "Only gmail.com and mail.com are allowed";
                }
                emailErrorText.style.display = "block";
            }
        } else {
            // Invalid email format
            emailInput.style.borderColor = "#e74c3c";
            emailInput.style.background = "#fceae9";
            emailIcon1.style.display = "block";
            emailIcon2.style.display = "none";
            emailErrorText.textContent = "Please enter a valid email address";
            emailErrorText.style.display = "block";
            emailField.classList.remove("valid");
        }
    }
}

// Password strength checker
let no = 0;
function trigger() {
    let val = passwordInput.value;
    
    if (val != "") {
        document.querySelector(".password .indicator").style.display = "flex";
        document.querySelector(".password .showBtn").style.display = "block";
        
        // Check password strength
        if ((val.length <= 3 && (val.match(regExpWeak) || val.match(regExpMedium) || val.match(regExpStrong)))) {
            no = 1;
        }
        if ((val.length >= 6 && ((val.match(regExpWeak) && val.match(regExpMedium)) || (val.match(regExpMedium) && val.match(regExpStrong)) || (val.match(regExpWeak) && val.match(regExpStrong))))) {
            no = 2;
        }
        if ((val.length >= 6 && val.match(regExpWeak) && val.match(regExpMedium) && val.match(regExpStrong))) {
            no = 3;
        }
        
        // Weak password
        if (no == 1) {
            passWeak.classList.add("active");
            passText.style.display = "block";
            passText.textContent = "Your password is too weak";
            passText.classList.add("weak");
            passText.classList.remove("medium");
            passText.classList.remove("strong");
            passMedium.classList.remove("active");
            passStrong.classList.remove("active");
        }
        
        // Medium password
        if (no == 2) {
            passMedium.classList.add("active");
            passText.textContent = "Your password is medium";
            passText.classList.add("medium");
            passText.classList.remove("weak");
            passText.classList.remove("strong");
        } else {
            passMedium.classList.remove("active");
            passText.classList.remove("medium");
        }
        
        // Strong password
        if (no == 3) {
            passWeak.classList.add("active");
            passMedium.classList.add("active");
            passStrong.classList.add("active");
            passText.textContent = "Your password is strong";
            passText.classList.add("strong");
            passText.classList.remove("weak");
            passText.classList.remove("medium");
        } else {
            passStrong.classList.remove("active");
            passText.classList.remove("strong");
        }
    } else {
        document.querySelector(".password .indicator").style.display = "none";
        document.querySelector(".password .showBtn").style.display = "none";
        passText.style.display = "none";
        passWeak.classList.remove("active");
        passMedium.classList.remove("active");
        passStrong.classList.remove("active");
        no = 0;
    }
}

// Password show/hide toggle
passShowBtn.onclick = function() {
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
        passShowBtn.textContent = "HIDE";
        passShowBtn.style.color = "#23ad5c";
    } else {
        passwordInput.type = "password";
        passShowBtn.textContent = "SHOW";
        passShowBtn.style.color = "#000";
    }
};

// Confirm password show/hide toggle
cPassShowBtn.onclick = function() {
    if (cPasswordInput.type == "password") {
        cPasswordInput.type = "text";
        cPassShowBtn.textContent = "HIDE";
        cPassShowBtn.style.color = "#23ad5c";
    } else {
        cPasswordInput.type = "password";
        cPassShowBtn.textContent = "SHOW";
        cPassShowBtn.style.color = "#000";
    }
};

// Password requirements checklist
passwordInput.addEventListener("keyup", () => {
    const requirements = [
        { regex: /.{8,}/, index: 0 },
        { regex: /[0-9]/, index: 1 },
        { regex: /[a-z]/, index: 2 },
        { regex: /[^A-Za-z0-9]/, index: 3 },
        { regex: /[A-Z]/, index: 4 }
    ];
    
    requirements.forEach(item => {
        const isValid = item.regex.test(passwordInput.value);
        const requirementItem = requirementList[item.index];
        
        if (isValid) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else {
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    });
    
    trigger();
});

// Confirm password validation
cPasswordInput.addEventListener("keyup", () => {
    if (cPasswordInput.value !== "" && passwordInput.value !== cPasswordInput.value) {
        cPassErrorText.style.display = "block";
        cPasswordInput.style.borderColor = "#e74c3c";
        cPasswordInput.style.background = "#fceae9";
    } else if (cPasswordInput.value !== "" && passwordInput.value === cPasswordInput.value) {
        cPassErrorText.style.display = "none";
        cPasswordInput.style.borderColor = "#27ae60";
        cPasswordInput.style.background = "#eafaf1";
    } else {
        cPassErrorText.style.display = "none";
        cPasswordInput.style.borderColor = "lightgrey";
        cPasswordInput.style.background = "#fff";
    }
});

// Email keyup event
emailInput.addEventListener("keyup", checkEmail);

// Fullname keyup event
fullnameInput.addEventListener("keyup", checkFullname);

// Username validation
usernameInput.addEventListener("keyup", () => {
    if (usernameInput.value !== "") {
        usernameField.classList.add("valid");
    }
});

// Form submit event
form.onsubmit = (e) => {
    e.preventDefault();
    
    // Validate fullname
    checkFullname();
    
    // Validate username
    if (usernameInput.value == "") {
        usernameField.classList.add("shake");
        setTimeout(() => {
            usernameField.classList.remove("shake");
        }, 500);
    }
    
    // Validate email
    checkEmail();
    
    // Validate password
    if (passwordInput.value == "") {
        passwordField.classList.add("shake");
        setTimeout(() => {
            passwordField.classList.remove("shake");
        }, 500);
    }
    
    // Validate confirm password
    if (cPasswordInput.value == "") {
        cPasswordField.classList.add("shake");
        cPassErrorText.style.display = "block";
        setTimeout(() => {
            cPasswordField.classList.remove("shake");
        }, 500);
    }
    
    // Check if all validations pass
    const isFullnameValid = fullnameField.classList.contains("valid");
    const isEmailValid = emailField.classList.contains("valid");
    const isUsernameValid = usernameInput.value !== "";
    const isPasswordValid = passwordInput.value !== "";
    const isCPasswordValid = cPasswordInput.value !== "" && passwordInput.value === cPasswordInput.value;
    
    if (isFullnameValid && isEmailValid && isUsernameValid && isPasswordValid && isCPasswordValid) {
        window.location.href = form.getAttribute("action");
    }
};

// Date and gender validation
const dateInput = document.getElementById("date");
const genderInput = document.getElementById("gender");

form.addEventListener("submit", function(e) {
    // Check date
    if (dateInput.value === "") {
        e.preventDefault();
        dateInput.style.borderColor = "#e74c3c";
    } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        const minYear = 1900;
        const dateYear = parseInt(dateInput.value.split("-")[0]);
        
        if (dateYear < minYear || selectedDate > today) {
            e.preventDefault();
            dateInput.style.borderColor = "#e74c3c";
            alert("Please enter a valid date of birth (1900 or later, not in future)");
        } else {
            dateInput.style.borderColor = "lightgrey";
        }
    }
    
    // Check gender
    if (genderInput.value === "") {
        e.preventDefault();
        genderInput.style.borderColor = "#e74c3c";
    } else {
        genderInput.style.borderColor = "lightgrey";
    }
});

// Function to detect gender from name
const detectGenderFromName = (name) => {
    if (!name) return null;
    
    const lowerName = name.toLowerCase().trim();
    const firstName = lowerName.split(" ")[0];
    
    const femalePatterns = [
        /a$/i, /i$/i, /ee$/i, /u$/i, /ou$/i,
        /na$/i, /ni$/i, /la$/i, /ra$/i, /ma$/i, /ta$/i,
        /ika$/i, /ini$/i, /ati$/i, /ali$/i
    ];
    
    const malePatterns = [
        /n$/i, /r$/i, /l$/i, /m$/i, /s$/i, /k$/i, /t$/i,
        /an$/i, /en$/i, /in$/i, /on$/i, /ar$/i, /er$/i, /ir$/i
    ];
    
    for (let pattern of femalePatterns) {
        if (pattern.test(firstName)) {
            if (firstName.endsWith('a')) {
                const likelyMaleNames = ['spandan', 'ravan', 'krishan', 'shiva', 'arjun', 'rohan', 'vihan', 'aryan', 'aditya'];
                if (likelyMaleNames.includes(firstName)) {
                    continue;
                }
            }
            return "Female";
        }
    }
    
    for (let pattern of malePatterns) {
        if (pattern.test(firstName)) {
            return "Male";
        }
    }
    
    return null;
};

// Auto-detect gender when user leaves fullname field
fullnameInput.addEventListener("blur", function() {
    const detectedGender = detectGenderFromName(this.value);
    if (detectedGender) {
        genderInput.value = detectedGender;
    }
});
