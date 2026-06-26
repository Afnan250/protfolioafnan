let name = localStorage.getItem("studentName") || "AFNAN AL JEDID";
let roll = localStorage.getItem("studentRoll") || "USTM001";

document.getElementById("studentName").innerText = name;
document.getElementById("profileName").innerText = name;
document.getElementById("profileRoll").innerText = roll;

function showPage(id){
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function loadRoom(){
    let assignedRooms = JSON.parse(localStorage.getItem("assignedRooms")) || [];
    let room = assignedRooms.find(item => item.roll === roll);

    if(room){
        document.getElementById("roomStatus").innerText = "Assigned";
        document.getElementById("studentRoom").innerText = room.room;
        document.getElementById("profileRoom").innerText = room.room;

        document.getElementById("roomDetails").innerHTML = `
            <h2>Room ${room.room}</h2>
            <p><b>Block:</b> ${room.block}</p>
            <p><b>Room Type:</b> ${room.type}</p>
            <p><b>Status:</b> Allocated</p>
        `;
    }else{
        document.getElementById("roomStatus").innerText = "Pending";
        document.getElementById("studentRoom").innerText = "Not Assigned";
        document.getElementById("profileRoom").innerText = "Not Assigned";

        document.getElementById("roomDetails").innerHTML = `
            <h2>No Room Assigned</h2>
            <p>Please request a room and wait for admin approval.</p>
        `;
    }
}

function requestRoom(){
    let reason = document.getElementById("requestReason").value.trim();

    if(reason === ""){
        alert("Please enter reason");
        return;
    }

    let requests = JSON.parse(localStorage.getItem("roomRequests")) || [];

    let alreadyRequested = requests.find(item => item.roll === roll && item.status === "Pending");

    if(alreadyRequested){
        document.getElementById("requestMsg").innerText = "You already have a pending request.";
        return;
    }

    requests.push({
        name:name,
        roll:roll,
        reason:reason,
        status:"Pending"
    });

    localStorage.setItem("roomRequests", JSON.stringify(requests));

    document.getElementById("requestReason").value = "";
    document.getElementById("requestMsg").innerText = "Room request submitted successfully.";
}

function markEntry(){
    let now = new Date();
    let records = JSON.parse(localStorage.getItem("entryRecords")) || [];

    records.push({
        roll:roll,
        date:now.toLocaleDateString(),
        entry:now.toLocaleTimeString(),
        exit:"--"
    });

    localStorage.setItem("entryRecords", JSON.stringify(records));
    localStorage.setItem("lastEntry", now.toLocaleTimeString());
    loadEntryRecords();
}

function markExit(){
    let records = JSON.parse(localStorage.getItem("entryRecords")) || [];

    for(let i = records.length - 1; i >= 0; i--){
        if(records[i].roll === roll && records[i].exit === "--"){
            records[i].exit = new Date().toLocaleTimeString();
            break;
        }
    }

    localStorage.setItem("entryRecords", JSON.stringify(records));
    loadEntryRecords();
}

function loadEntryRecords(){
    let records = JSON.parse(localStorage.getItem("entryRecords")) || [];
    let table = document.getElementById("entryTable");
    table.innerHTML = "";

    records.filter(item => item.roll === roll).forEach(item => {
        table.innerHTML += `<tr><td>${item.date}</td><td>${item.entry}</td><td>${item.exit}</td></tr>`;
    });

    document.getElementById("lastEntry").innerText = localStorage.getItem("lastEntry") || "--";
}

function addComplaint(){
    let text = document.getElementById("complaintText").value.trim();

    if(text === ""){
        alert("Please write complaint");
        return;
    }

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push({
        roll:roll,
        name:name,
        text:text,
        status:"Pending"
    });

    localStorage.setItem("complaints", JSON.stringify(complaints));

    document.getElementById("complaintText").value = "";
    loadComplaints();
}

function loadComplaints(){
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let table = document.getElementById("complaintTable");
    table.innerHTML = "";

    let myComplaints = complaints.filter(item => item.roll === roll);

    myComplaints.forEach(item => {
        table.innerHTML += `<tr><td>${item.text}</td><td>${item.status}</td></tr>`;
    });

    document.getElementById("complaintCount").innerText = myComplaints.length;
}

function logout(){
    window.location.href = "login.html";
}

loadRoom();
loadEntryRecords();
loadComplaints();
