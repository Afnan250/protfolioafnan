let currentRole = "student";
let captcha = "";

const students = {
    "USTM001": {
        name: "Arun Sarkar",
        room: "A-101"
    },
    "USTM002": {
        name: "Afnan Al Jedid",
        room: "B-202"
    }
};

const admins = {
    "ADMIN001": {
        name: "Admin"
    }
};

function showLogin(){
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");

    document.getElementById("message").innerText = "";
}

function showRegister(){
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";

    document.getElementById("registerTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");

    document.getElementById("message").innerText = "";
}

function setRole(role){
    currentRole = role;

    document.getElementById("studentBtn").classList.remove("active");
    document.getElementById("adminBtn").classList.remove("active");

    if(role === "student"){
        document.getElementById("studentBtn").classList.add("active");
        document.getElementById("userId").placeholder = "Enter Roll Number";
    }else{
        document.getElementById("adminBtn").classList.add("active");
        document.getElementById("userId").placeholder = "Enter Admin ID";
    }

    document.getElementById("userId").value = "";
    document.getElementById("captchaInput").value = "";
    document.getElementById("message").innerText = "";

    generateCaptcha();
}

function generateCaptcha(){
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    captcha = "";

    for(let i = 0; i < 6; i++){
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("captchaText").innerText = captcha;
}

function loginUser(){
    const userId = document.getElementById("userId").value.trim().toUpperCase();
    const captchaInput = document.getElementById("captchaInput").value.trim().toUpperCase();
    const message = document.getElementById("message");

    if(userId === ""){
        message.innerText = "Please enter your ID";
        return;
    }

    if(captchaInput === ""){
        message.innerText = "Please enter captcha";
        return;
    }

    if(captchaInput !== captcha){
        message.innerText = "Captcha is incorrect";
        generateCaptcha();
        return;
    }

    if(currentRole === "student"){
        if(!students[userId]){
            message.innerText = "Student roll number not found";
            return;
        }

        localStorage.setItem("studentName", students[userId].name);
        localStorage.setItem("studentRoom", students[userId].room);
        window.location.href = "student-dashboard.html";
    }else{
        if(!admins[userId]){
            message.innerText = "Admin ID not found";
            return;
        }

        localStorage.setItem("adminName", admins[userId].name);
        window.location.href = "dashboard.html";
    }
}

function registerUser(){
    const name = document.getElementById("regName").value.trim();
    const roll = document.getElementById("regRoll").value.trim().toUpperCase();
    const dept = document.getElementById("regDept").value.trim();
    const room = document.getElementById("regRoom").value.trim();

    if(name === "" || roll === "" || dept === "" || room === ""){
        document.getElementById("message").innerText = "Please fill all details";
        return;
    }

    students[roll] = {
        name: name,
        room: room
    };

    document.getElementById("message").style.color = "#22c55e";
    document.getElementById("message").innerText = "Registration successful. Now login.";

    showLogin();
}

window.onload = function(){
    showLogin();
    setRole("student");
    generateCaptcha();
};