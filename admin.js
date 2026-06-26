function showPage(id){
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function loadRequests(){
    let requests = JSON.parse(localStorage.getItem("roomRequests")) || [];
    let table = document.getElementById("requestTable");
    table.innerHTML = "";

    let pending = requests.filter(item => item.status === "Pending");

    pending.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.roll}</td>
                <td>${item.reason}</td>
                <td>
                    <input id="room${index}" placeholder="Room No">
                    <input id="block${index}" placeholder="Block">
                    <select id="type${index}">
                        <option>1 Seater</option>
                        <option>2 Seater</option>
                        <option>3 Seater</option>
                    </select>
                    <button onclick="assignRoom('${item.roll}', ${index})">Assign</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("requestCount").innerText = pending.length;
}

function assignRoom(roll, index){
    let room = document.getElementById("room" + index).value.trim();
    let block = document.getElementById("block" + index).value.trim();
    let type = document.getElementById("type" + index).value;

    if(room === "" || block === ""){
        alert("Please enter room and block");
        return;
    }

    let requests = JSON.parse(localStorage.getItem("roomRequests")) || [];
    let assignedRooms = JSON.parse(localStorage.getItem("assignedRooms")) || [];

    let request = requests.find(item => item.roll === roll);

    assignedRooms.push({
        name:request.name,
        roll:request.roll,
        room:room,
        block:block,
        type:type
    });

    requests = requests.map(item => {
        if(item.roll === roll){
            item.status = "Approved";
        }
        return item;
    });

    localStorage.setItem("assignedRooms", JSON.stringify(assignedRooms));
    localStorage.setItem("roomRequests", JSON.stringify(requests));

    loadRequests();
    loadAssignedRooms();
}

function loadAssignedRooms(){
    let assignedRooms = JSON.parse(localStorage.getItem("assignedRooms")) || [];
    let table = document.getElementById("assignedTable");
    table.innerHTML = "";

    assignedRooms.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.roll}</td>
                <td>${item.room}</td>
                <td>${item.block}</td>
                <td>${item.type}</td>
            </tr>
        `;
    });

    document.getElementById("assignedCount").innerText = assignedRooms.length;
}

function loadComplaints(){
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let table = document.getElementById("adminComplaintTable");
    table.innerHTML = "";

    complaints.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.roll}</td>
                <td>${item.text}</td>
                <td>${item.status}</td>
            </tr>
        `;
    });

    document.getElementById("adminComplaintCount").innerText = complaints.length;
}

function logout(){
    window.location.href = "login.html";
}

loadRequests();
loadAssignedRooms();
loadComplaints();