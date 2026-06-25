
let roomsData =
JSON.parse(localStorage.getItem("roomsData")) || [];


let studentsData =
JSON.parse(localStorage.getItem("studentsData")) || [];


const entryExitData = [
  { record_id: 1001, student_id: 20230001, date: "2026-05-31", entry_time: "06:15", exit_time: null },
  { record_id: 1002, student_id: 20230002, date: "2026-05-31", entry_time: "07:00", exit_time: null },
  { record_id: 1003, student_id: 20230003, date: "2026-05-31", entry_time: null,    exit_time: "08:30" },
  { record_id: 1004, student_id: 20230004, date: "2026-05-31", entry_time: "09:00", exit_time: null },
  { record_id: 1005, student_id: 20230005, date: "2026-05-30", entry_time: "18:00", exit_time: "22:45" },
  { record_id: 1006, student_id: 20230006, date: "2026-05-30", entry_time: "07:30", exit_time: "21:00" },
  { record_id: 1007, student_id: 20230007, date: "2026-05-30", entry_time: "08:00", exit_time: "20:30" },
  { record_id: 1008, student_id: 20230008, date: "2026-05-29", entry_time: "06:45", exit_time: "22:00" },
  { record_id: 1009, student_id: 20230009, date: "2026-05-29", entry_time: "07:15", exit_time: "21:30" },
  { record_id: 1010, student_id: 20230010, date: "2026-05-31", entry_time: "10:00", exit_time: null },
  { record_id: 1011, student_id: 20230011, date: "2026-05-31", entry_time: null,    exit_time: "07:00" },
  { record_id: 1012, student_id: 20230012, date: "2026-05-30", entry_time: "09:30", exit_time: "19:00" },
  { record_id: 1013, student_id: 20230013, date: "2026-05-31", entry_time: "08:45", exit_time: null },
  { record_id: 1014, student_id: 20230014, date: "2026-05-31", entry_time: null,    exit_time: "09:00" },
  { record_id: 1015, student_id: 20230015, date: "2026-05-29", entry_time: "16:00", exit_time: "23:00" },
];


const complaintsData = [
  { complaint_id: 501, student_id: 20230001, type: "Maintenance",    status: "Pending",    description: "Fan not working in room 101", date: "2026-05-28" },
  { complaint_id: 502, student_id: 20230004, type: "Food",           status: "Resolved",   description: "Food quality was poor at lunch", date: "2026-05-27" },
  { complaint_id: 503, student_id: 20230007, type: "Cleanliness",    status: "In Progress",description: "Bathroom not cleaned for 2 days", date: "2026-05-29" },
  { complaint_id: 504, student_id: 20230010, type: "Security",       status: "Pending",    description: "Main gate was left open at night", date: "2026-05-30" },
  { complaint_id: 505, student_id: 20230012, type: "Maintenance",    status: "Resolved",   description: "Water leakage in room 202", date: "2026-05-25" },
  { complaint_id: 506, student_id: 20230015, type: "WiFi",           status: "Pending",    description: "Internet not working in Block B", date: "2026-05-31" },
  { complaint_id: 507, student_id: 20230003, type: "Noise",          status: "Resolved",   description: "Noisy roommates after 11 PM", date: "2026-05-24" },
  { complaint_id: 508, student_id: 20230016, type: "Food",           status: "In Progress",description: "Breakfast served late on weekdays", date: "2026-05-30" },
  { complaint_id: 509, student_id: 20230009, type: "Cleanliness",    status: "Pending",    description: "Common area not swept regularly", date: "2026-05-31" },
  { complaint_id: 510, student_id: 20230013, type: "Maintenance",    status: "In Progress",description: "Cupboard door hinge broken", date: "2026-05-29" },
];

// TABLE: MENU
const menuData = [
  { item_no: 1, food_item: "Idli Sambar",       day: "Monday",    time: "08:00" },
  { item_no: 2, food_item: "Dal Rice",           day: "Monday",    time: "13:00" },
  { item_no: 3, food_item: "Chapati & Sabzi",   day: "Monday",    time: "20:00" },
  { item_no: 4, food_item: "Poha",              day: "Tuesday",   time: "08:00" },
  { item_no: 5, food_item: "Rajma Rice",         day: "Tuesday",   time: "13:00" },
  { item_no: 6, food_item: "Puri Bhaji",        day: "Tuesday",   time: "20:00" },
  { item_no: 7, food_item: "Upma",              day: "Wednesday", time: "08:00" },
  { item_no: 8, food_item: "Chole Rice",         day: "Wednesday", time: "13:00" },
  { item_no: 9, food_item: "Khichdi",           day: "Wednesday", time: "20:00" },
  { item_no: 10, food_item: "Paratha Curd",     day: "Thursday",  time: "08:00" },
  { item_no: 11, food_item: "Mixed Veg Curry",  day: "Thursday",  time: "13:00" },
  { item_no: 12, food_item: "Roti Dal",         day: "Thursday",  time: "20:00" },
  { item_no: 13, food_item: "Bread Omelette",   day: "Friday",    time: "08:00" },
  { item_no: 14, food_item: "Biryani",          day: "Friday",    time: "13:00" },
  { item_no: 15, food_item: "Paneer Butter",    day: "Friday",    time: "20:00" },
  { item_no: 16, food_item: "Dosa Chutney",     day: "Saturday",  time: "08:00" },
  { item_no: 17, food_item: "Fried Rice",       day: "Saturday",  time: "13:00" },
  { item_no: 18, food_item: "Aloo Gobi Roti",   day: "Saturday",  time: "20:00" },
  { item_no: 19, food_item: "Pongal",           day: "Sunday",    time: "08:00" },
  { item_no: 20, food_item: "Pulao",            day: "Sunday",    time: "13:00" },
  { item_no: 21, food_item: "Special Thali",    day: "Sunday",    time: "20:00" },
];

// TABLE: FOOD_PREPARED
const foodPreparedData = [
  { item_no: 1, item: "Idli Sambar",     day: "Monday",    time: "07:30", status: "Prepared" },
  { item_no: 2, item: "Dal Rice",        day: "Monday",    time: "12:30", status: "Prepared" },
  { item_no: 3, item: "Chapati & Sabzi",day: "Monday",    time: "19:30", status: "Prepared" },
  { item_no: 4, item: "Poha",           day: "Tuesday",   time: "07:45", status: "Prepared" },
  { item_no: 5, item: "Rajma Rice",     day: "Tuesday",   time: "12:45", status: "Preparing" },
  { item_no: 6, item: "Puri Bhaji",     day: "Tuesday",   time: "19:45", status: "Pending" },
  { item_no: 7, item: "Upma",           day: "Wednesday", time: "07:30", status: "Prepared" },
  { item_no: 8, item: "Chole Rice",     day: "Wednesday", time: "12:30", status: "Preparing" },
  { item_no: 9, item: "Khichdi",        day: "Wednesday", time: "19:30", status: "Pending" },
  { item_no: 10, item: "Paratha Curd",  day: "Thursday",  time: "07:45", status: "Prepared" },
  { item_no: 11, item: "Mixed Veg",     day: "Thursday",  time: "12:45", status: "Pending" },
  { item_no: 12, item: "Bread Omelette",day: "Friday",    time: "07:30", status: "Prepared" },
  { item_no: 13, item: "Biryani",       day: "Friday",    time: "12:30", status: "Preparing" },
];

// ---- Helper auto-increment counters ----
let nextStudentId   = 20230018;
let nextComplaintId = 511;
let nextRecordId    = 1016;
let nextMenuItemNo  = 22;
let nextFoodItemNo  = 14;
