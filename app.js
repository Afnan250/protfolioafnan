const role = localStorage.getItem("role");

if(role !== "admin"){

    window.location.href = "login.html";

} 

// ---- Current page state ----
let currentPage = 'dashboard';

// ---- Page config: title, subtitle, topbar action ----
const pageConfig = {
  dashboard:  { title: 'Dashboard',     subtitle: 'Overview of hostel operations',          actionLabel: 'Add Student',     actionIcon: '＋' },
  students:   { title: 'Students',      subtitle: 'Manage enrolled students',                actionLabel: 'Add Student',     actionIcon: '＋' },
rooms: {
    title: 'Rooms',
    subtitle: 'Room availability and occupancy',
    hideAction: true
},
  entryexit:  { title: 'Entry / Exit',  subtitle: 'Gate entry and exit records',             actionLabel: 'Log Entry/Exit',  actionIcon: '🚪' },
  complaints: { title: 'Complaints',    subtitle: 'Student complaints and grievances',        actionLabel: 'New Complaint',   actionIcon: '＋' },
  food:       { title: 'Food & Menu',   subtitle: 'Weekly menu and food preparation log',    actionLabel: 'Log Food',        actionIcon: '＋' },
  medical:    { title: 'Medical Help',  subtitle: 'Doctor contacts and patient records',     actionLabel: 'Add Student',     actionIcon: '＋' },
};

// ======================================================================
// NAVIGATION
// ======================================================================
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  // Remove active from all nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  currentPage = page;
  document.getElementById('page-' + page).style.display = 'block';
  document.getElementById('nav-' + page).classList.add('active');

 const cfg = pageConfig[page];

document.getElementById('page-title').textContent = cfg.title;
document.getElementById('page-subtitle').textContent = cfg.subtitle;

const actionBtn =
document.getElementById('topbar-action-btn');

if (cfg.hideAction) {

    actionBtn.style.display = 'none';

} else {

    actionBtn.style.display = 'flex';

    document.getElementById('topbar-action-label').textContent =
        cfg.actionLabel;

    document.getElementById('topbar-action-icon').textContent =
        cfg.actionIcon;
}
  // Render page content
  renderPage(page);
}

function renderPage(page) {
  switch(page) {
    case 'dashboard':  renderDashboard();         break;
    case 'students':   renderStudentsTable();      break;
    case 'rooms':      renderRoomsGrid();          break;
    case 'entryexit':  renderEntryExitTable();     break;
    case 'complaints': renderComplaintsTable();    break;
    case 'food':       renderFoodPage();           break;
  }
}

function topbarAction() {
  switch(currentPage) {
    case 'dashboard':
    case 'students':   openAddStudentModal(); break;
    case 'entryexit':  openAddEEModal();      break;
    case 'complaints': openAddComplaintModal(); break;
    case 'food':       openAddFoodModal();    break;
    case 'rooms':      openAddRoomModal();    break;
    
  }
}

// ======================================================================
// MODALS
// ======================================================================
function openModal(id) {

    const modal =
        document.getElementById(id);

    if(!modal) return;

    modal.style.display = "flex";

    modal.classList.add("open");

}
function closeModal(id) {

    const modal =
        document.getElementById(id);

    if(!modal) return;

    modal.classList.remove("open");

    setTimeout(() => {

        modal.style.display = "none";

    },200);

}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ======================================================================
// TOAST NOTIFICATIONS
// ======================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(60px)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ======================================================================
// HELPERS
// ======================================================================
function getStudentById(id) {
  return studentsData.find(s => s.student_id === id);
}

function getStudentName(id) {
  const s = getStudentById(id);
  return s ? s.name : 'Unknown';
}

function formatTime(t) {
  if (!t) return '—';
  const [h, m] = t.split(':');
  const hr = parseInt(h);
  return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
}

function formatDate(d) {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function statusBadge(status) {
  const map = {
    'Pending':     'badge-red',
    'In Progress': 'badge-amber',
    'Resolved':    'badge-green',
    'Prepared':    'badge-green',
    'Preparing':   'badge-amber',
    'Available':   'badge-green',
    'Full':        'badge-red',
    'Partial':     'badge-amber',
    'Active':      'badge-cyan',
    'Inside':      'badge-cyan',
    'Outside':     'badge-gray',
  };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

// ======================================================================
// DASHBOARD
// ======================================================================
function renderDashboard() {
  const totalBeds = roomsData.reduce((a, r) => a + r.capacity, 0);
  const occupiedBeds = studentsData.length;
  const pendingComplaints = complaintsData.filter(c => c.status === 'Pending').length;
  const today = todayStr();
  const todayEntries = entryExitData.filter(r => r.date === today && r.entry_time).length;
  const todayExits   = entryExitData.filter(r => r.date === today && r.exit_time).length;

  document.getElementById('m-total-rooms').textContent    = roomsData.length;
  document.getElementById('m-total-students').textContent = studentsData.length;
  document.getElementById('m-occupied').textContent       = occupiedBeds;
  document.getElementById('m-beds-sub').textContent       = `of ${totalBeds} total beds`;
  document.getElementById('m-complaints').textContent     = pendingComplaints;
  document.getElementById('m-entries-today').textContent  = todayEntries;
  document.getElementById('m-exits-today').textContent    = `${todayExits} exits`;
  document.getElementById('m-meals-today').textContent    = '3';

  const occPct = Math.round((occupiedBeds / totalBeds) * 100);
  document.getElementById('occ-pct-badge').textContent = occPct + '%';

  // Occupancy bars
  const barsEl = document.getElementById('room-occupancy-bars');
  barsEl.innerHTML = roomsData.map(r => {
    const pct = r.capacity > 0 ? Math.round((r.occupied / r.capacity) * 100) : 0;
    const color = pct === 100 ? 'var(--red)' : pct >= 50 ? 'var(--amber)' : 'var(--green)';
    return `
      <div class="occupancy-bar-wrap">
        <div class="occupancy-bar-label">
          <span>Room ${r.room_no} — ${r.hostel_name}</span>
          <span style="color:${color};font-weight:600;">${r.occupied}/${r.capacity}</span>
        </div>
        <div class="occupancy-bar">
          <div class="occupancy-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${color},${color}aa);"></div>
        </div>
      </div>`;
  }).join('');

  // Weekly chart (mock data)
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [8, 5, 12, 7, 10, 4, 6];
  const max  = Math.max(...vals);
  const chartEl = document.getElementById('weekly-chart');
  const labelsEl = document.getElementById('weekly-chart-labels');
  chartEl.innerHTML = vals.map((v, i) => `
    <div class="chart-bar-col">
      <div class="chart-bar" style="height:${(v/max)*100}%;" title="${v} entries on ${days[i]}"></div>
    </div>`).join('');
  labelsEl.innerHTML = days.map(d => `
    <div class="chart-bar-col"><div class="chart-bar-label">${d}</div></div>`).join('');

  // Activity feed
  const feed = document.getElementById('activity-feed');
  const activities = [
    { dot: 'var(--green)',  text: `<strong>${getStudentName(20230001)}</strong> entered the hostel`, time: 'Today, 6:15 AM' },
    { dot: 'var(--red)',    text: `New complaint raised by <strong>${getStudentName(20230009)}</strong>`, time: 'Today, 5:50 AM' },
    { dot: 'var(--accent)', text: `<strong>${getStudentName(20230010)}</strong> entered the hostel`, time: 'Today, 10:00 AM' },
    { dot: 'var(--amber)',  text: `Complaint #506 status updated to <strong>Pending</strong>`, time: 'Today, 9:30 AM' },
    { dot: 'var(--purple)', text: `<strong>${getStudentName(20230011)}</strong> exited the hostel`, time: 'Today, 7:00 AM' },
    { dot: 'var(--green)',  text: `Breakfast <strong>Idli Sambar</strong> prepared successfully`, time: 'Today, 7:30 AM' },
    { dot: 'var(--red)',    text: `Complaint #504 raised by <strong>${getStudentName(20230010)}</strong>`, time: 'Yesterday, 11:00 PM' },
  ];
  feed.innerHTML = activities.map(a => `
    <li class="activity-item">
      <div class="activity-dot" style="background:${a.dot};box-shadow:0 0 6px ${a.dot};"></div>
      <div>
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </li>`).join('');

  // Update complaint badge
  document.getElementById('complaint-badge').textContent = pendingComplaints;
}

// ======================================================================
// STUDENTS
// ======================================================================
function renderStudentsTable() {
  const search  = (document.getElementById('student-search')?.value || '').toLowerCase();
  const course  = document.getElementById('student-course-filter')?.value || '';
  const roomNo  = document.getElementById('student-room-filter')?.value || '';

  // Populate course filter options dynamically
  const courseFilter = document.getElementById('student-course-filter');
  if (courseFilter && courseFilter.options.length <= 1) {
    const courses = [...new Set(studentsData.map(s => s.course))].sort();
    courses.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; courseFilter.appendChild(o); });
  }
  // Populate room filter
  const roomFilter = document.getElementById('student-room-filter');
  if (roomFilter && roomFilter.options.length <= 1) {
    const rooms = [...new Set(studentsData.map(s => s.room_no))].sort((a,b)=>a-b);
    rooms.forEach(r => { const o = document.createElement('option'); o.value = r; o.textContent = `Room ${r}`; roomFilter.appendChild(o); });
  }

  const filtered = studentsData.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search) || String(s.student_id).includes(search) || s.course.toLowerCase().includes(search);
    const matchCourse = !course || s.course === course;
    const matchRoom   = !roomNo || String(s.room_no) === String(roomNo);
    return matchSearch && matchCourse && matchRoom;
  });

  const tbody = document.getElementById('students-tbody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">🎓</div><p>No students found.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(s => `
    <tr>
      <td><span style="font-family:monospace;color:var(--accent);">${s.student_id}</span></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.course}</td>
      <td><span class="badge badge-cyan">Room ${s.room_no}</span></td>
      <td>${s.phone_number}</td>
      <td>${formatDate(s.date_of_join)}</td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="viewStudent(${s.student_id})">View</button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent(${s.student_id})">Delete</button>
        </div>
      </td>
    </tr>`).join('');
}

function openAddStudentModal() {
  document.getElementById('s-id').value = nextStudentId;
  document.getElementById('s-name').value = '';
  document.getElementById('s-address').value = '';
  document.getElementById('s-course').value = '';
  document.getElementById('s-phone').value = '';
  document.getElementById('s-doj').value = todayStr();
  document.getElementById('s-guardian').value = '';

  const roomSel = document.getElementById('s-room');
  roomSel.innerHTML = roomsData
    .filter(r => r.occupied < r.capacity)
    .map(r => `<option value="${r.room_no}">Room ${r.room_no} — ${r.hostel_name} (${r.capacity - r.occupied} beds free)</option>`)
    .join('');

  openModal('modal-add-student');
}

function saveStudent() {
  const name = document.getElementById('s-name').value.trim();
  const course = document.getElementById('s-course').value.trim();
  const room = parseInt(document.getElementById('s-room').value);

  if (!name || !course || !room) { showToast('Please fill in all required fields.', 'error'); return; }

  const newStudent = {
    student_id: nextStudentId++,
    name,
    address: document.getElementById('s-address').value.trim(),
    course,
    room_no: room,
    phone_number: document.getElementById('s-phone').value.trim(),
    date_of_join: document.getElementById('s-doj').value,
    guardian_phone: document.getElementById('s-guardian').value.trim(),
  };

  studentsData.push(newStudent);
  localStorage.setItem(
    "studentsData",
    JSON.stringify(studentsData)
);
  // Update room occupancy
  const roomObj = roomsData.find(r => r.room_no === room);
  if (roomObj) roomObj.occupied++;

  closeModal('modal-add-student');
  showToast(`Student ${name} added successfully!`, 'success');
  renderStudentsTable();
  if(currentPage === 'dashboard') renderDashboard();
}

function viewStudent(id) {
  const s = getStudentById(id);
  if (!s) return;
  const room = roomsData.find(r => r.room_no === s.room_no);
  document.getElementById('view-student-body').innerHTML = `
    <div style="display:grid;gap:16px;">
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--bg-card);border-radius:10px;border:1px solid var(--border);">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--purple));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;flex-shrink:0;">${s.name[0]}</div>
        <div>
          <div style="font-size:18px;font-weight:800;color:var(--text-primary);">${s.name}</div>
          <div style="font-size:13px;color:var(--accent);font-weight:600;">${s.course}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:3px;">ID: ${s.student_id}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        ${infoRow('🏠', 'Room', `Room ${s.room_no} — ${room ? room.hostel_name : 'N/A'}`)}
        ${infoRow('📞', 'Phone', s.phone_number || '—')}
        ${infoRow('📅', 'Date of Join', formatDate(s.date_of_join))}
        ${infoRow('🛡️', 'Guardian Phone', s.guardian_phone || '—')}
        ${infoRow('📍', 'Address', s.address || '—')}
        ${infoRow('🍽️', 'Menu Type', room ? room.menu : '—')}
      </div>
    </div>`;
  openModal('modal-view-student');
}

function infoRow(icon, label, value) {
  return `<div style="padding:12px;background:var(--bg-card);border-radius:8px;border:1px solid var(--border);">
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">${icon} ${label}</div>
    <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${value}</div>
  </div>`;
}

function deleteStudent(id) {
  if (!confirm('Delete this student record?')) return;
  const idx = studentsData.findIndex(s => s.student_id === id);
  if (idx === -1) return;
  const s = studentsData[idx];
  const room = roomsData.find(r => r.room_no === s.room_no);
  if (room && room.occupied > 0) room.occupied--;
  studentsData.splice(idx, 1);
  showToast('Student record deleted.', 'success');
  renderStudentsTable();
}

function deleteRoom(roomNo){

    if(!confirm("Delete Room?"))
        return;

    roomsData =
        roomsData.filter(
            r => r.room_no !== roomNo
        );

    localStorage.setItem(
        "roomsData",
        JSON.stringify(roomsData)
    );

    renderRoomsGrid();
}

// ======================================================================
// ROOMS
// ======================================================================

function renderRoomsGrid() {

    const block =
        document.getElementById("room-block-filter")?.value || "";

    const status =
        document.getElementById("room-status-filter")?.value || "";

    const filtered = roomsData.filter(room => {

        const blockMatch =
            !block || room.hostel_name === block;

        const roomStatus =
            room.occupied >= room.capacity
                ? "full"
                : room.occupied === 0
                ? "available"
                : "partial";

        const statusMatch =
            !status || roomStatus === status;

        return blockMatch && statusMatch;

    });

    const grid = document.getElementById("rooms-grid");

    if (!grid) return;

    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛏️</div>
                <p>No Rooms Found</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = filtered.map(room => {

        const percentage =
            (room.occupied / room.capacity) * 100;

        const statusLabel =
            room.occupied >= room.capacity
                ? "Full"
                : room.occupied === 0
                ? "Available"
                : "Partial";

        const color =
            statusLabel === "Full"
                ? "var(--red)"
                : statusLabel === "Available"
                ? "var(--green)"
                : "var(--amber)";

        return `
            <div class="room-card"
                 onclick="viewRoom(${room.room_no})">

                <div class="room-number">
                    Room ${room.room_no}
                </div>

                <div class="room-block">
                    ${room.hostel_name}
                </div>

                ${statusBadge(statusLabel)}

                <div class="room-capacity-bar">
                    <div class="room-capacity-fill"
                         style="
                         width:${percentage}%;
                         background:${color};
                         ">
                    </div>
                </div>

                <div class="room-info-row">

                    <span>
                        👤 ${room.occupied}/${room.capacity}
                    </span>

                    <span>
                        🍽️ ${room.menu}
                    </span>

                </div>

            </div>
        `;

    }).join("");
}

function openAddRoomModal() {

    const roomNo = prompt("Enter Room Number");
    if (!roomNo) return;

    const block = prompt("Enter Block (A/B/C)");
    if (!block) return;

    const capacity = parseInt(prompt("Enter Capacity"));
    if (!capacity) return;

    const menu = prompt("Menu Type (Veg/Non-Veg)") || "Veg";

   localStorage.setItem(
    "roomsData",
    JSON.stringify(roomsData)
);

    renderRoomsGrid();

    showToast("Room Added Successfully", "success");
}

function editRoom(roomNo) {

    const room =
        roomsData.find(
            r => r.room_no === roomNo
        );

    if(!room) return;

    const newCapacity =
        prompt(
            "Update Capacity",
            room.capacity
        );

    if(newCapacity) {

        room.capacity =
            parseInt(newCapacity);

    }

    const newMenu =
        prompt(
            "Update Menu",
            room.menu
        );

    if(newMenu) {

        room.menu =
            newMenu;

    }

    renderRoomsGrid();

    viewRoom(roomNo);

    showToast(
        "Room Updated Successfully",
        "success"
    );

}

// ======================================================
// VIEW ROOM
// ======================================================

function viewRoom(roomNo) {

    const room =
        roomsData.find(r => r.room_no === roomNo);

    if (!room) return;

    const students =
        studentsData.filter(
            s => s.room_no === roomNo
        );

    const percentage =
        Math.round(
            (room.occupied / room.capacity) * 100
        );

    const statusLabel =
        room.occupied >= room.capacity
            ? "Full"
            : room.occupied === 0
            ? "Available"
            : "Partial";

    document.getElementById("view-room-body").innerHTML = `

        <div style="display:grid;gap:16px;">

            <div class="room-header">

                <h2>
                    Room ${room.room_no}
                </h2>

                ${statusBadge(statusLabel)}

            </div>

            <div>

                <div style="
                    margin-bottom:8px;
                    font-size:13px;
                    color:var(--text-muted);
                ">
                    Occupancy :
                    ${room.occupied}/${room.capacity}
                    (${percentage}%)
                </div>

                <div class="occupancy-bar">

                    <div class="occupancy-bar-fill"
                         style="
                         width:${percentage}%;
                         ">
                    </div>

                </div>

            </div>

            <div class="room-card"
     style="cursor:pointer;"
     data-room="${room.room_no}"
     onclick="viewRoom(${room.room_no});>
     </div>
            <div class="room-actions">
<button onclick="editRoom(roomNo)">
Edit Room
</button>

<button onclick="deleteRoom(roomNo)">
Delete Room
</button>
                <button
                    class="btn btn-success"
                    onclick="addRoommate(${room.room_no})">

                    Add Student

                </button>

            </div>

            <h3>
                Room Occupants
            </h3>

            ${
                students.length === 0
                ?
                `<p>No Students Assigned</p>`
                :
                students.map(student => `

                    <div class="student-room-card">

                        <div>

                           <strong>
    ${student.name}
</strong>

<br>

<small>
    ID : ${student.student_id}
</small>

<br>

<small>
    📞 ${student.phone_number}
</small>
                        </div>

                        <div style="
                            display:flex;
                            gap:10px;
                        ">

                            <button
                                class="btn btn-primary"
                                onclick="changeRoom(${student.student_id})">

                                Change

                            </button>

                            <button
                                class="btn btn-danger"
                                onclick="removeStudentFromRoom(${student.student_id})">

                                Remove

                            </button>

                        </div>

                    </div>

                `).join("")
            }

        </div>

    `;
    

    closeModal("modal-view-room");

setTimeout(() => {

    openModal("modal-view-room");

},100);
}

function openAddRoomModal() {

    const roomNo = prompt("Enter Room Number");

    if (!roomNo) return;

    const block = prompt("Enter Block Name (A/B/C)");

    if (!block) return;

    const capacity = parseInt(
        prompt("Enter Capacity")
    );

    if (!capacity || capacity <= 0) {

        showToast(
            "Invalid Capacity",
            "error"
        );

        return;
    }


    roomsData.push({

        room_no: Number(roomNo),

        hostel_id: Date.now(),

        hostel_name: "Block " + block,

        capacity: capacity,

        occupied: 0,

    });

    renderRoomsGrid();

    showToast(
        "Room Added Successfully",
        "success"
    );
}

function editRoom(roomNo) {

    const room =
        roomsData.find(
            r => r.room_no === roomNo
        );

    if(!room) return;

    const newCapacity =
        prompt(
            "Update Capacity",
            room.capacity
        );

    if(newCapacity) {

        room.capacity =
            parseInt(newCapacity);

    }

    const newMenu =
        prompt(
            "Update Menu",
            room.menu
        );

    if(newMenu) {

        room.menu =
            newMenu;

    }

    renderRoomsGrid();

    viewRoom(roomNo);

    showToast(
        "Room Updated Successfully",
        "success"
    );

}

// ======================================================
// ADD STUDENT TO ROOM
// ======================================================

function addRoommate(roomNo){

    const name =
        prompt("Student Name");

    if(!name) return;

    const phone =
        prompt("Phone Number");

    if(!phone) return;

    const guardian =
        prompt("Guardian Number");

    const course =
        prompt("Course");

    const address =
        prompt("Address");

    const room =
        roomsData.find(
            r => r.room_no === roomNo
        );

    if(!room) return;

    if(room.occupied >= room.capacity){

        showToast(
            "Room Full",
            "error"
        );

        return;
    }

    const newStudent = {

        student_id: nextStudentId++,

        name: name,

        address: address || "",

        course: course || "",

        room_no: roomNo,

        phone_number: phone,

        guardian_phone: guardian || "",

        date_of_join: todayStr()

    };

    studentsData.push(newStudent);

    room.occupied++;
    localStorage.setItem(
    "roomsData",
    JSON.stringify(roomsData)
);

    renderStudentsTable();

    renderRoomsGrid();

    viewRoom(roomNo);

    showToast(
        "Student Added Successfully",
        "success"
    );
}

// ======================================================
// REMOVE STUDENT
// ======================================================

function removeStudentFromRoom(studentId) {

    if (
        !confirm(
            "Remove Student From Room?"
        )
    ) return;

    const student =
        studentsData.find(
            s =>
            String(s.student_id)
            ===
            String(studentId)
        );

    if (!student) return;

    const room =
        roomsData.find(
            r => r.room_no === student.room_no
        );

    if (room) {

        room.occupied =
            Math.max(
                0,
                room.occupied - 1
            );
    }

    student.room_no = null;

    renderRoomsGrid();

    closeModal("modal-view-room");

    showToast(
        "Student Removed",
        "success"
    );
}


// ======================================================
// CHANGE ROOM
// ======================================================

function changeRoom(studentId) {

    const student =
        studentsData.find(
            s =>
            String(s.student_id)
            ===
            String(studentId)
        );

    if (!student) return;

    const roomNo =
        parseInt(
            prompt(
                "Enter New Room Number"
            )
        );

    if (!roomNo) return;

    const newRoom =
        roomsData.find(
            r => r.room_no === roomNo
        );

    if (!newRoom) {

        showToast(
            "Room Not Found",
            "error"
        );

        return;
    }

    if (
        newRoom.occupied >=
        newRoom.capacity
    ) {

        showToast(
            "Room Full",
            "error"
        );

        return;
    }

    const oldRoom =
        roomsData.find(
            r => r.room_no === student.room_no
        );

    if (oldRoom) {

        oldRoom.occupied =
            Math.max(
                0,
                oldRoom.occupied - 1
            );
    }

    newRoom.occupied++;

    student.room_no = roomNo;

    renderRoomsGrid();

setTimeout(() => {

    viewRoom(roomNo);

},100);

    showToast(
        "Room Changed Successfully",
        "success"
    );
}

// ======================================================================
// ENTRY / EXIT
// ======================================================================
function renderEntryExitTable() {
  const search = (document.getElementById('ee-search')?.value || '').toLowerCase();
  const dateF  = document.getElementById('ee-date-filter')?.value || '';

  updateEEStats();

  const filtered = entryExitData.filter(r => {
    const name = getStudentName(r.student_id).toLowerCase();
    const matchSearch = !search || name.includes(search) || String(r.student_id).includes(search) || String(r.record_id).includes(search);
    const matchDate   = !dateF || r.date === dateF;
    return matchSearch && matchDate;
  }).sort((a, b) => b.record_id - a.record_id);

  const tbody = document.getElementById('ee-tbody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">🚪</div><p>No records found.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    const hasEntry = !!r.entry_time;
    const hasExit  = !!r.exit_time;
    const inside   = hasEntry && !hasExit;
    const status   = inside ? 'Inside' : 'Outside';
    return `
      <tr>
        <td><span style="font-family:monospace;color:var(--accent);">#${r.record_id}</span></td>
        <td><span style="font-family:monospace;font-size:12px;">${r.student_id}</span></td>
        <td><strong>${getStudentName(r.student_id)}</strong></td>
        <td>${formatDate(r.date)}</td>
        <td>${r.entry_time ? `<span style="color:var(--green);">↓ ${formatTime(r.entry_time)}</span>` : '<span style="color:var(--text-muted);">—</span>'}</td>
        <td>${r.exit_time  ? `<span style="color:var(--red);">↑ ${formatTime(r.exit_time)}</span>` : '<span style="color:var(--text-muted);">—</span>'}</td>
        <td>${statusBadge(status)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteEERecord(${r.record_id})">Delete</button>
        </td>
      </tr>`;
  }).join('');
}

function updateEEStats() {
  const today = todayStr();
  const todayRecords = entryExitData.filter(r => r.date === today);
  const entries = todayRecords.filter(r => r.entry_time).length;
  const exits   = todayRecords.filter(r => r.exit_time).length;
  // Students currently inside = have entry but no exit today
  const inside = entryExitData.filter(r => r.date === today && r.entry_time && !r.exit_time).length;
  document.getElementById('ee-entries-today').textContent = entries;
  document.getElementById('ee-exits-today').textContent   = exits;
  document.getElementById('ee-inside-count').textContent  = inside;
}

function openAddEEModal() {
  const sel = document.getElementById('ee-student-select');
  sel.innerHTML = studentsData.map(s => `<option value="${s.student_id}">${s.name} (${s.student_id})</option>`).join('');
  document.getElementById('ee-date').value = todayStr();
  document.getElementById('ee-time').value = new Date().toTimeString().slice(0,5);
  openModal('modal-add-ee');
}

function saveEntryExit() {
  const studentId = parseInt(document.getElementById('ee-student-select').value);
  const date      = document.getElementById('ee-date').value;
  const type      = document.getElementById('ee-type').value;
  const time      = document.getElementById('ee-time').value;

  if (!date || !time) { showToast('Please fill in all fields.', 'error'); return; }

  const rec = {
    record_id:    nextRecordId++,
    student_id:   studentId,
    date,
    entry_time:   type === 'entry' ? time : null,
    exit_time:    type === 'exit'  ? time : null,
  };

  entryExitData.push(rec);
  closeModal('modal-add-ee');
  showToast(`${type === 'entry' ? 'Entry' : 'Exit'} logged for ${getStudentName(studentId)}.`, 'success');
  renderEntryExitTable();
}

function deleteEERecord(id) {
  if (!confirm('Delete this entry/exit record?')) return;
  const idx = entryExitData.findIndex(r => r.record_id === id);
  if (idx !== -1) entryExitData.splice(idx, 1);
  showToast('Record deleted.', 'success');
  renderEntryExitTable();
}

// ======================================================================
// COMPLAINTS
// ======================================================================
function loadComplaints() {

    const studentComplaints =
        JSON.parse(
            localStorage.getItem("complaints")
        ) || [];

    complaintsData.length = 0;

    studentComplaints.forEach(c => {

        complaintsData.push({

            complaint_id:
                nextComplaintId++,

            student_id: 1,

            type: c.type,

            status: "Pending",

            description: c.description,

            date: c.date

        });

    });

}

function renderComplaintsTable() {
  const localComplaints =
JSON.parse(localStorage.getItem("complaints")) || [];

localComplaints.forEach((c,index) => {

    complaintsData.push({
        complaint_id: 9000 + index,
        student_id: 1,
        type: c.type,
        status: "Pending",
        description: c.description,
        date: c.date
    });

});
  const search = (document.getElementById('complaint-search')?.value || '').toLowerCase();
  const type   = document.getElementById('complaint-type-filter')?.value || '';
  const status = document.getElementById('complaint-status-filter')?.value || '';

  const pending    = complaintsData.filter(c => c.status === 'Pending').length;
  const inprogress = complaintsData.filter(c => c.status === 'In Progress').length;
  const resolved   = complaintsData.filter(c => c.status === 'Resolved').length;

  document.getElementById('c-pending').textContent    = pending;
  document.getElementById('c-inprogress').textContent = inprogress;
  document.getElementById('c-resolved').textContent   = resolved;
  document.getElementById('complaint-badge').textContent = pending;

  const filtered = complaintsData.filter(c => {
    const name = getStudentName(c.student_id).toLowerCase();
    const matchSearch = !search || name.includes(search) || c.description?.toLowerCase().includes(search) || c.type.toLowerCase().includes(search);
    const matchType   = !type   || c.type === type;
    const matchStatus = !status || c.status === status;
    return matchSearch && matchType && matchStatus;
  }).sort((a, b) => b.complaint_id - a.complaint_id);

  const tbody = document.getElementById('complaints-tbody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📢</div><p>No complaints found.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td><span style="font-family:monospace;color:var(--accent);">#${c.complaint_id}</span></td>
      <td><strong>${getStudentName(c.student_id)}</strong></td>
      <td><span class="badge badge-purple">${c.type}</span></td>
      <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${c.description || ''}">${c.description || '—'}</td>
      <td>${formatDate(c.date)}</td>
      <td>${statusBadge(c.status)}</td>
      <td>
        <div class="flex gap-2">
          <select class="filter-select" style="padding:5px 8px;font-size:12px;" onchange="updateComplaintStatus(${c.complaint_id}, this.value)">
            <option ${c.status==='Pending'?'selected':''}>Pending</option>
            <option ${c.status==='In Progress'?'selected':''}>In Progress</option>
            <option ${c.status==='Resolved'?'selected':''}>Resolved</option>
          </select>
          <button class="btn btn-danger btn-sm" onclick="deleteComplaint(${c.complaint_id})">✕</button>
        </div>
      </td>
    </tr>`).join('');
}

function openAddComplaintModal() {
  const sel = document.getElementById('c-student-select');
  sel.innerHTML = studentsData.map(s => `<option value="${s.student_id}">${s.name} (${s.student_id})</option>`).join('');
  document.getElementById('c-desc').value = '';
  openModal('modal-add-complaint');
}

function saveComplaint() {
  const studentId = parseInt(document.getElementById('c-student-select').value);
  const type      = document.getElementById('c-type').value;
  const status    = document.getElementById('c-status').value;
  const desc      = document.getElementById('c-desc').value.trim();

  if (!desc) { showToast('Please enter a description.', 'error'); return; }

  complaintsData.push({ complaint_id: nextComplaintId++, student_id: studentId, type, status, description: desc, date: todayStr() });
  closeModal('modal-add-complaint');
  showToast('Complaint registered successfully!', 'success');
  renderComplaintsTable();
}

function updateComplaintStatus(id, newStatus) {
  const c = complaintsData.find(c => c.complaint_id === id);
  if (c) { c.status = newStatus; showToast(`Complaint #${id} status updated to ${newStatus}.`, 'info'); renderComplaintsTable(); }
}

function deleteComplaint(id) {
  if (!confirm('Delete this complaint?')) return;
  const idx = complaintsData.findIndex(c => c.complaint_id === id);
  if (idx !== -1) complaintsData.splice(idx, 1);
  showToast('Complaint deleted.', 'success');
  renderComplaintsTable();
}
const complaints =
JSON.parse(
 localStorage.getItem("complaints")
) || [];

// ======================================================================
// FOOD & MENU
// ======================================================================
function renderFoodPage() {
  renderWeekMenuGrid();
  renderFoodPreparedTable();
}

function switchFoodTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'prepared') renderFoodPreparedTable();
  else renderWeekMenuGrid();
}

function renderWeekMenuGrid() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const mealTimes = { '08:00': '🌅 Breakfast', '13:00': '☀️ Lunch', '20:00': '🌙 Dinner' };

  document.getElementById('week-menu-grid').innerHTML = days.map(day => {
    const items = menuData.filter(m => m.day === day);
    const isToday = day === todayDay;
    return `
      <div class="week-day-card ${isToday ? 'today' : ''}">
        <div class="week-day-name">${day.slice(0,3)}${isToday ? ' ⭐' : ''}</div>
        ${items.map(m => `
          <div class="meal-item">
            <div class="meal-time">${mealTimes[m.time] || m.time}</div>
            <div class="meal-name">${m.food_item}</div>
          </div>`).join('')}
      </div>`;
  }).join('');
}

function renderFoodPreparedTable() {
  const dayF    = document.getElementById('fp-day-filter')?.value || '';
  const statusF = document.getElementById('fp-status-filter')?.value || '';

  const filtered = foodPreparedData.filter(f => {
    return (!dayF || f.day === dayF) && (!statusF || f.status === statusF);
  });

  const tbody = document.getElementById('fp-tbody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">🍽️</div><p>No records found.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(f => `
    <tr>
      <td><span style="font-family:monospace;color:var(--accent);">#${f.item_no}</span></td>
      <td><strong>${f.item}</strong></td>
      <td>${f.day}</td>
      <td>${formatTime(f.time)}</td>
      <td>${statusBadge(f.status)}</td>
      <td>
        <select class="filter-select" style="padding:5px 8px;font-size:12px;" onchange="updateFoodStatus(${f.item_no}, this.value)">
          <option ${f.status==='Pending'?'selected':''}>Pending</option>
          <option ${f.status==='Preparing'?'selected':''}>Preparing</option>
          <option ${f.status==='Prepared'?'selected':''}>Prepared</option>
        </select>
      </td>
    </tr>`).join('');
}

function openAddFoodModal() {
  document.getElementById('fp-item').value = '';
  document.getElementById('fp-time').value = '';
  openModal('modal-add-food');
}

function saveFoodPrepared() {
  const item   = document.getElementById('fp-item').value.trim();
  const day    = document.getElementById('fp-day').value;
  const time   = document.getElementById('fp-time').value;
  const status = document.getElementById('fp-status').value;

  if (!item || !time) { showToast('Please fill in all fields.', 'error'); return; }

  foodPreparedData.push({ item_no: nextFoodItemNo++, item, day, time, status });
  closeModal('modal-add-food');
  showToast(`Food item "${item}" logged.`, 'success');
  renderFoodPreparedTable();
}

function updateFoodStatus(itemNo, newStatus) {
  const f = foodPreparedData.find(f => f.item_no === itemNo);
  if (f) { f.status = newStatus; showToast(`"${f.item}" status updated to ${newStatus}.`, 'info'); renderFoodPreparedTable(); }
}

// ======================================================================
// INIT
// ======================================================================
function init() {
  // Set current date in topbar
  document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });

  // Attach nav click events
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
  });

  // Render initial page
  renderDashboard();
}

document.addEventListener('DOMContentLoaded', init);

let patients = [];

function savePatient() {

    const patient = {

        name: document.getElementById("p-name").value,
        department: document.getElementById("p-department").value,
        roll: document.getElementById("p-roll").value,
        course: document.getElementById("p-course").value,
        hostel: document.getElementById("p-hostel").value,
        room: document.getElementById("p-room").value,
        issue: document.getElementById("p-issue").value

    };

    patients.push(patient);

    renderPatients();

    closeModal("modal-add-patient");
}

function renderPatients() {

    const tbody = document.getElementById("patient-tbody");

    tbody.innerHTML = "";

    patients.forEach(patient => {

        tbody.innerHTML += `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.department}</td>
            <td>${patient.roll}</td>
            <td>${patient.course}</td>
            <td>${patient.hostel}</td>
            <td>${patient.room}</td>
            <td>${patient.issue}</td>
        </tr>
        `;
    });

    document.getElementById("patient-count").textContent =
        patients.length;
}



function loadEntryExitLogs() {

    let logs =
    JSON.parse(
        localStorage.getItem("hostelLogs")
    ) || [];

    const table =
    document.getElementById("entryExitTable");

    if(!table) return;

    table.innerHTML = "";

    logs.forEach(log => {

        table.innerHTML += `

        <tr>
            <td>${log.studentName}</td>
            <td>${log.roomNo}</td>
            <td>${log.date}</td>
            <td>${log.entryTime}</td>
            <td>${log.exitTime}</td>
        </tr>

        `;

    });

}


window.onload = function() {

    loadComplaints();

    renderComplaintsTable();

    loadEntryExitLogs();
};


