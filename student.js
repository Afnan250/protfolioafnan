// ================================
// STUDENT PANEL PAGE NAVIGATION
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const navItems = document.querySelectorAll(".nav-item[data-page]");
    const pages = document.querySelectorAll(".page");

    navItems.forEach(item => {

        item.addEventListener("click", function () {

            const pageName = this.getAttribute("data-page");

            navItems.forEach(nav =>
                nav.classList.remove("active")
            );

            this.classList.add("active");

            pages.forEach(page =>
                page.style.display = "none"
            );

            const selectedPage =
                document.getElementById("page-" + pageName);

            if (selectedPage) {
                selectedPage.style.display = "block";
            }

        });

    });

    // Default page
    pages.forEach(page =>
        page.style.display = "none"
    );

    const dashboard =
        document.getElementById("page-dashboard");

    if (dashboard) {
        dashboard.style.display = "block";
    }

});

// ================================
// COMPLAINT SYSTEM
// ================================

function submitComplaint() {

    let type = document.getElementById("complaint-type").value;
    let description = document.getElementById("complaint-desc").value;

    if(description.trim() === ""){
        alert("Please write your complaint.");
        return;
    }

    let complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push({
        student_id: 1,
        student: "Afnan",
        type: type,
        description: description,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );

    alert(
        "Complaint Submitted Successfully!\n\n" +
        "Type: " + type + "\n" +
        "Issue: " + description
    );

    document.getElementById("complaint-desc").value = "";
}

// ================================
// ENTRY / EXIT SYSTEM
// ================================

let entryHistory =
JSON.parse(localStorage.getItem("entryHistory")) || [];

function loadEntryHistory() {

    const tbody =
    document.getElementById("entry-history");

    if(!tbody) return;

    tbody.innerHTML = "";

    entryHistory.forEach(record => {

        tbody.innerHTML += `
        <tr>
            <td>${record.date}</td>
            <td>${record.entry}</td>
            <td>${record.exit}</td>
        </tr>
        `;

    });

}

function markEntry() {

    let logs =
    JSON.parse(localStorage.getItem("hostelLogs")) || [];

    const now = new Date();

    logs.unshift({

        studentName: "Afnan",
        roomNo: "A-101",
        date: now.toLocaleDateString(),
        entryTime: now.toLocaleTimeString(),
        exitTime: "-"

    });

    localStorage.setItem(
        "hostelLogs",
        JSON.stringify(logs)
    );

    alert("Entry Recorded Successfully");

}

function markExit() {

    let logs =
    JSON.parse(localStorage.getItem("hostelLogs")) || [];

    if(logs.length === 0){

        alert("Please mark entry first");
        return;

    }

    logs[0].exitTime =
    new Date().toLocaleTimeString();

    localStorage.setItem(
        "hostelLogs",
        JSON.stringify(logs)
    );

    alert("Exit Recorded Successfully");

}

window.onload = () => {

    pages.forEach(page => {
        page.style.display = "none";
    });

    const dashboard = document.getElementById("page-dashboard");

    if(dashboard){
        dashboard.style.display = "block";
    }

    loadEntryHistory();

};



// ======================
// SWITCH LOGIN TABS
// ======================

function showLogin(type) {

    const studentLogin = document.getElementById("studentLogin");
    const adminLogin = document.getElementById("adminLogin");

    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => tab.classList.remove("active"));

    if (type === "student") {

        studentLogin.style.display = "block";
        adminLogin.style.display = "none";

        tabs[0].classList.add("active");

    } else {

        studentLogin.style.display = "none";
        adminLogin.style.display = "block";

        tabs[1].classList.add("active");
    }
}

// ======================
// DARK MODE
// ======================

function toggleTheme() {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }else{

        localStorage.setItem("theme","light");
    }
}

// Load saved theme

window.onload = function(){

    let savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark");
    }
}

// ======================
// SHOW / HIDE PASSWORD
// ======================

function togglePassword(id, eye){

    let input = document.getElementById(id);

    if(input.type === "password"){

        input.type = "text";

        eye.innerHTML = "🙈";

    }else{

        input.type = "password";

        eye.innerHTML = "👁️";
    }
}

// ======================
// ADMIN LOGIN
// ======================

function adminLogin(){

    let email =
    document.getElementById("adminEmail").value;

    let password =
    document.getElementById("adminPassword").value;

    if(
        email === "admin@unihostel.com" &&
        password === "admin123"
    ){

        alert("Admin Login Successful");

        localStorage.setItem("userRole","admin");

        window.location.href = "index.html";

    }else{

        alert("Invalid Admin Credentials");
    }
}

// ======================
// STUDENT LOGIN
// ======================

function studentLogin(){

    let email =
    document.getElementById("studentEmail").value;

    let password =
    document.getElementById("studentPassword").value;

    let user =
    JSON.parse(localStorage.getItem(email));

    if(user && user.password === password){

        alert("Student Login Successful");

        localStorage.setItem("userRole","student");

        localStorage.setItem(
            "currentStudent",
            JSON.stringify(user)
        );

        window.location.href = "student.html";

    }else{

        alert("Invalid Student Login");
    }
}

// ======================
// REGISTER STUDENT
// ======================

function registerStudent(){

    let name =
    document.getElementById("fullName").value;

    let studentId =
    document.getElementById("studentId").value;

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("password").value;

    let confirm =
    document.getElementById("confirmPassword").value;

    if(password !== confirm){

        alert("Passwords do not match");

        return;
    }

    let user = {

        name:name,
        studentId:studentId,
        email:email,
        password:password,
        role:"student"

    };

    localStorage.setItem(
        email,
        JSON.stringify(user)
    );

    alert("Registration Successful");

    window.location.href = "login.html";
}

// ======================
// FORGOT PASSWORD
// ======================

function resetPassword(){

    let email =
    document.getElementById("resetEmail").value;

    let newPassword =
    document.getElementById("newPassword").value;

    let confirmPassword =
    document.getElementById("confirmNewPassword").value;

    if(newPassword !== confirmPassword){

        alert("Passwords do not match");

        return;
    }

    let user =
    JSON.parse(localStorage.getItem(email));

    if(!user){

        alert("Email not found");

        return;
    }

    user.password = newPassword;

    localStorage.setItem(
        email,
        JSON.stringify(user)
    );

    alert("Password Reset Successful");

    window.location.href = "login.html";
}

// ======================
// LOGOUT
// ======================

function logout(){

    localStorage.removeItem("userRole");

    localStorage.removeItem("currentStudent");

    window.location.href = "login.html";
}



