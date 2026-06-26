```javascript
let roll = localStorage.getItem("studentRoll");
let name = localStorage.getItem("studentName");
let dept = localStorage.getItem("studentDept");

if(!roll){
    window.location.href = "login.html";
}

document.getElementById("studentName").innerText = name;
document.getElementById("profileName").innerText = name;
document.getElementById("profileRoll").innerText = roll;
document.getElementById("profileDept").innerText = dept;

function showPage(pageId){

    document.querySelectorAll(".page")
    .forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(pageId)
    .classList.add("active");
}

function loadRoom(){

    let assignedRooms =
    JSON.parse(localStorage.getItem("assignedRooms")) || [];

    let room =
    assignedRooms.find(item => item.roll === roll);

    if(room){

        document.getElementById("roomStatus")
        .innerText = "Allocated";

        document.getElementById("studentHostel")
        .innerText = room.hostel;

        document.getElementById("studentRoom")
        .innerText = room.room;

        document.getElementById("profileRoom")
        .innerText = room.room;

        document.getElementById("roomDetails")
        .innerHTML = `
            <h2>${room.room}</h2>
            <p><b>Hostel:</b> ${room.hostel}</p>
            <p><b>Room Type:</b> ${room.roomType}</p>
            <p><b>Bathroom:</b> ${room.bathroom}</p>
            <p><b>Status:</b> Allocated</p>
        `;

    }else{

        document.getElementById("roomStatus")
        .innerText = "Pending";
    }
}

function requestRoom(){

    let hostel =
    document.getElementById("hostelType").value;

    let roomType =
    document.getElementById("roomType").value;

    let bathroom =
    document.getElementById("bathroomType").value;

    let reason =
    document.getElementById("requestReason").value;

    if(
        hostel === "" ||
        roomType === "" ||
        bathroom === "" ||
        reason === ""
    ){
        alert("Please fill all fields");
        return;
    }

    let requests =
    JSON.parse(localStorage.getItem("roomRequests")) || [];

    requests.push({
        roll,
        name,
        dept,
        hostel,
        roomType,
        bathroom,
        reason,
        status:"Pending"
    });

    localStorage.setItem(
        "roomRequests",
        JSON.stringify(requests)
    );

    document.getElementById("requestMsg")
    .innerText =
    "Room request submitted successfully.";

    document.getElementById("requestReason").value = "";
}

function addComplaint(){

    let complaint =
    document.getElementById("complaintText").value;

    if(complaint === ""){
        return;
    }

    let complaints =
    JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push({
        roll,
        name,
        complaint,
        status:"Pending"
    });

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );

    loadComplaints();

    document.getElementById("complaintText").value = "";
}

function loadComplaints(){

    let complaints =
    JSON.parse(localStorage.getItem("complaints")) || [];

    let myComplaints =
    complaints.filter(item => item.roll === roll);

    document.getElementById("complaintCount")
    .innerText = myComplaints.length;

    let table =
    document.getElementById("complaintTable");

    table.innerHTML = "";

    myComplaints.forEach(item=>{

        table.innerHTML += `
        <tr>
            <td>${item.complaint}</td>
            <td>${item.status}</td>
        </tr>
        `;
    });
}

function logout(){

    localStorage.removeItem("studentRoll");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentDept");

    window.location.href = "login.html";
}

loadRoom();
loadComplaints();
```
