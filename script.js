function flipCard() {
    document.getElementById("card").classList.toggle("flip");
}


function registerUser() {

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
        user => user.email === email
    );

    if (exists) {
        alert("Student already registered!");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registration Successful!");

    document.getElementById("reg-name").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-password").value = "";

    flipCard();
}

// ===========================
// LOGIN
// ===========================

function login() {

    const email =
        document.getElementById("login-email").value.trim();

    const password =
        document.getElementById("login-password").value.trim();

    const role =
        document.getElementById("role").value;

    // ===================
    // ADMIN LOGIN
    // ===================

    if (
        role === "admin" &&
        email === "admin@unihostel.com" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "role",
            "admin"
        );

        window.location.href = "dashboard.html";
        return;
    }

    // ===================
    // STUDENT LOGIN
    // ===================

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const student =
        users.find(user =>
            user.email === email &&
            user.password === password
        );

    if (student && role === "student") {

        localStorage.setItem(
            "role",
            "student"
        );

        localStorage.setItem(
            "studentName",
            student.name
        );

        localStorage.setItem(
            "currentStudent",
            JSON.stringify(student)
        );

        window.location.href = "student.html";
        return;
    }

    alert("Invalid Login Credentials!");
}

// ===========================
// LOGOUT
// ===========================

function logout() {

    localStorage.removeItem("role");
    localStorage.removeItem("studentName");
    localStorage.removeItem("currentStudent");

    window.location.href = "login.html";
}

// ===========================
// FORGOT PASSWORD
// ===========================

function forgotPassword() {

    const email =
        prompt("Enter your registered Email:");

    if (!email) return;

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const userIndex =
        users.findIndex(
            user => user.email === email
        );

    if (userIndex === -1) {

        alert("Email not found!");
        return;
    }

    const newPassword =
        prompt("Enter New Password:");

    if (!newPassword) {

        alert("Password reset cancelled!");
        return;
    }

    users[userIndex].password =
        newPassword;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Password changed successfully!");
}

// ===========================
// STUDENT DASHBOARD
// SHOW STUDENT NAME
// ===========================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const studentNameElement =
            document.getElementById(
                "student-name"
            );

        if (studentNameElement) {

            const studentName =
                localStorage.getItem(
                    "studentName"
                );

            if (studentName) {

                studentNameElement.textContent =
                    studentName;

            } else {

                studentNameElement.textContent =
                    "Student";
            }
        }
    }
);

// ===========================
// PORTFOLIO UI HELPERS
// ===========================
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const themeBtn = document.getElementById("themeBtn");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");
            const icon = themeBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-moon");
                icon.classList.toggle("fa-sun");
            }
        });
    }

    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = function () {
        revealElements.forEach(function (element) {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                element.classList.add("active");
            }
        });
    };
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
});

function sendWhatsApp() {
    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    if (!name || !email || !message) {
        alert("Please fill Name, Email and Message before sending to WhatsApp.");
        return;
    }

    const text = `Portfolio Message%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/918638536744?text=${text}`, "_blank");
}
