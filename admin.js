let adminId = localStorage.getItem("adminId");

if(!adminId){
    window.location.href = "login.html";
}

function showPage(pageId){
    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

function loadAllStudents(){
    let students = JSON.parse(localStorage.getItem("students")) || {};
    let assignedRooms = JSON.parse(localStorage.getItem("assignedRooms")) || [];
    let table = document.getElementById("studentsTable");

    table.innerHTML = "";

    Object.keys(students).forEach(roll=>{
        let student = students[roll];
        let room = assignedRooms.find(item => item.roll === roll);

let photo =
localStorage.getItem("profilePicture_" + roll);

if(!photo){
    photo =
    "https://via.placeholder.com/60";
}

table.innerHTML += `
<tr>

<td>
<img
src="${photo}"
class="student-photo">
</td>

<td>${student.name}</td>

<td>${roll}</td>

<td>${student.dept || "-"}</td>

<td>${room ? room.room : "Not Assigned"}</td>

<td>${room ? "Allocated" : "Pending"}</td>

</tr>
`;

        `;
    });

    document.getElementById("studentCount").innerText = Object.keys(students).length;
}

function loadRequests(){
    let requests = JSON.parse(localStorage.getItem("roomRequests")) || [];
    let pending = requests.filter(item => item.status === "Pending");
    let table = document.getElementById("requestTable");

    table.innerHTML = "";

    pending.forEach((item,index)=>{
        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.roll}</td>
            <td>${item.hostel}</td>
            <td>${item.roomType}</td>
            <td>${item.bathroom}</td>
            <td>${item.reason}</td>
            <td>
                <select id="assignHostel${index}">
                    <option>${item.hostel}</option>
                    <option>Boys Hostel 1</option>
                    <option>Boys Hostel 2</option>
                    <option>Boys Hostel 3</option>
                    <option>Girls Hostel 1</option>
                    <option>Girls Hostel 2</option>
                    <option>Girls Hostel 3</option>
                </select>

                <select id="assignType${index}">
                    <option>${item.roomType}</option>
                    <option>2 Seater</option>
                    <option>3 Seater</option>
                    <option>4 Seater</option>
                </select>

                <select id="assignBathroom${index}">
                    <option>${item.bathroom}</option>
                    <option>Attached Bathroom</option>
                    <option>Common Bathroom</option>
                </select>

                <input id="assignRoom${index}" placeholder="Room Number">

                <button onclick="assignRoom('${item.roll}', ${index})">Assign</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("requestCount").innerText = pending.length;
}

function assignRoom(roll,index){
    let hostel = document.getElementById("assignHostel" + index).value;
    let roomType = document.getElementById("assignType" + index).value;
    let bathroom = document.getElementById("assignBathroom" + index).value;
    let room = document.getElementById("assignRoom" + index).value.trim();

    if(room === ""){
        alert("Please enter room number");
        return;
    }

    let requests = JSON.parse(localStorage.getItem("roomRequests")) || [];
    let assignedRooms = JSON.parse(localStorage.getItem("assignedRooms")) || [];

    let request = requests.find(item => item.roll === roll);

    assignedRooms = assignedRooms.filter(item => item.roll !== roll);

    assignedRooms.push({
        name: request.name,
        roll: request.roll,
        dept: request.dept,
        hostel: hostel,
        room: room,
        roomType: roomType,
        bathroom: bathroom
    });

    requests = requests.map(item=>{
        if(item.roll === roll){
            item.status = "Approved";
        }
        return item;
    });

    localStorage.setItem("assignedRooms", JSON.stringify(assignedRooms));
    localStorage.setItem("roomRequests", JSON.stringify(requests));

    loadAllStudents();
    loadRequests();
    loadAssignedRooms();
}

function loadAssignedRooms(){
    let assignedRooms = JSON.parse(localStorage.getItem("assignedRooms")) || [];
    let table = document.getElementById("assignedTable");

    table.innerHTML = "";

    assignedRooms.forEach(item=>{
        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.roll}</td>
            <td>${item.hostel}</td>
            <td>${item.room}</td>
            <td>${item.roomType}</td>
            <td>${item.bathroom}</td>
        </tr>
        `;
    });

    document.getElementById("assignedCount").innerText = assignedRooms.length;
}

function loadComplaints(){
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let table = document.getElementById("adminComplaintTable");

    table.innerHTML = "";

    complaints.forEach(item=>{
        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.roll}</td>
            <td>${item.complaint}</td>
            <td>${item.status}</td>
        </tr>
        `;
    });

    document.getElementById("complaintCountAdmin").innerText = complaints.length;
}

function logout(){
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");
    window.location.href = "login.html";
}

loadAllStudents();
loadRequests();
loadAssignedRooms();
loadComplaints();
