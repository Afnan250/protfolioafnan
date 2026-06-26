```javascript
let roll = localStorage.getItem("studentRoll");
let name = localStorage.getItem("studentName");
let dept = localStorage.getItem("studentDept");

if(!roll){
    window.location.href = "login.html";
}

document.getElementById("studentName").innerText = name || "Student";

if(document.getElementById("profileName")){
    document.getElementById("profileName").innerText = name || "-";
}

if(document.getElementById("profileRoll")){
    document.getElementById("profileRoll").innerText = roll || "-";
}

if(document.getElementById("profileDept")){
    document.getElementById("profileDept").innerText = dept || "-";
}

function showPage(pageId){
    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

function loadRoom(){
    let assignedRooms =
        JSON.parse(localStorage.getItem("assignedRooms")) || [];

    let roomData =
        assignedRooms.find(item => item.roll === roll);

    if(roomData){

        if(document.getElementById("roomStatus")){
            document.getElementById("roomStatus").innerText = "Assigned";
        }

        if(document.getElementById("studentRoom")){
            document.getElementById("studentRoom").innerText =
            roomData.room;
        }

        if(document.getElementById("profileRoom")){
            document.getElementById("profileRoom").innerText =
            roomData.room;
        }

        if(document.getElementById("roomDetails")){
            document.getElementById("roomDetails").innerHTML = `
                <h2>Room ${roomData.room}</h2>
                <p><b>Block:</b> ${roomData.block}</p>
                <p><b>Type:</b> ${roomData.type}</p>
                <p><b>Status:</b> Allocated</p>
            `;
        }

    }else{

        if(document.getElementById("roomStatus")){
            document.getElementById("roomStatus").innerText =
            "Pending";
        }

        if(document.getElementById("studentRoom")){
            document.getElementById("studentRoom").innerText =
            "Not Assigned";
        }

        if(document.getElementById("profileRoom")){
            document.getElementById("profileRoom").innerText =
            "Not Assigned";
        }

        if(document.getElementById("roomDetails")){
            document.getElementById("roomDetails").innerHTML = `
                <h2>No Room Assigned</h2>
                <p>Waiting for admin approval.</p>
            `;
        }
    }
}

function requestRoom(){

    let reason =
        document.getElementById("requestReason").value.trim();

    if(reason === ""){
        alert("Enter request reason");
        return;
    }

    let requests =
        JSON.parse(localStorage.getItem("roomRequests")) || [];

    let existing =
        requests.find(item => item.roll === roll);

    if(existing){
        alert("Request already submitted");
        return;
    }

    requests.push({
        name:name,
        roll:roll,
        dept:dept,
        reason:reason,
        status:"Pending"
    });

    localStorage.setItem(
        "roomRequests",
        JSON.stringify(requests)
    );

    document.getElementById("requestReason").value = "";

    alert("Room request submitted");
}

function logout(){

    localStorage.removeItem("studentRoll");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentDept");

    window.location.href = "login.html";
}

loadRoom();
```
