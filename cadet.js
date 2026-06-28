const cadetId = localStorage.getItem("activeCadetId");

if(!cadetId){
  alert("Please login first.");
  window.location.href = "ncc.html";
}

const status = localStorage.getItem("cadetStatus_" + cadetId);
const joinYear = parseInt(localStorage.getItem("joinYear_" + cadetId));
const currentYear = new Date().getFullYear();

const passoutMessage =
  "Thank you for your dedicated service to USTM NCC. Your commitment, discipline, and leadership have helped guide the next generation of cadets. The legacy you built is now being carried forward by new cadets. We wish them strength, success, and honour as they continue this journey. Jai Hind.";

if(status === "cancelled"){
  alert("Your NCC enrollment has been cancelled by the authority.");
  localStorage.removeItem("activeCadetId");
  window.location.href = "ncc.html";
}

if(status === "completed"){
  alert(passoutMessage);
  localStorage.removeItem("activeCadetId");
  window.location.href = "ncc.html";
}

if(joinYear && currentYear - joinYear >= 3){
  localStorage.setItem("cadetStatus_" + cadetId, "completed");
  alert(passoutMessage);
  localStorage.removeItem("activeCadetId");
  window.location.href = "ncc.html";
}

document.getElementById("cadetIdText").innerText = cadetId;

const parts = cadetId.split("/");

let rank = "Cadet";
let name = "Cadet Name";

if(parts.length >= 6){
  rank = parts[4];
  name = parts[5];
}

document.getElementById("cadetName").innerText = name;
document.getElementById("cadetRank").innerText = "Rank: " + rank;
document.getElementById("rankStat").innerText = rank;

document.getElementById("headerCadetName").innerText = name;
document.getElementById("headerCadetRank").innerText = "Rank: " + rank;

const serviceYear = document.getElementById("serviceYear");
const yearStat = document.getElementById("yearStat");

const savedServiceYear = localStorage.getItem("serviceYear_" + cadetId);

if(savedServiceYear){
  serviceYear.value = savedServiceYear;
  yearStat.innerText = savedServiceYear.replace(" Year", "");
}

serviceYear.addEventListener("change", function(){
  localStorage.setItem("serviceYear_" + cadetId, this.value);
  yearStat.innerText = this.value.replace(" Year", "");
});

const noticeTitle = localStorage.getItem("nccNoticeTitle");
const noticeContent = localStorage.getItem("nccNoticeContent");
const noticeBy = localStorage.getItem("nccNoticeBy");
const noticeDate = localStorage.getItem("nccNoticeDate");

if(noticeTitle && noticeContent){
  document.getElementById("noticeTitle").innerText = noticeTitle;
  document.getElementById("noticeContent").innerText = noticeContent;
  document.getElementById("noticeBy").innerText =
    "Published by: " + noticeBy + " | " + noticeDate;
}

const upload = document.getElementById("photoUpload");
const image = document.getElementById("cadetPhoto");
const headerPhoto = document.getElementById("headerCadetPhoto");

const savedPhoto = localStorage.getItem("cadetPhoto_" + cadetId);

if(savedPhoto){
  image.src = savedPhoto;
  headerPhoto.src = savedPhoto;
}

upload.addEventListener("change", function(){
  const file = this.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(e){
    image.src = e.target.result;
    headerPhoto.src = e.target.result;

    localStorage.setItem(
      "cadetPhoto_" + cadetId,
      e.target.result
    );
  };

  reader.readAsDataURL(file);
});

function showContact(){
  const selected = document.getElementById("contactSelect").value;
  const contactBox = document.getElementById("contactInfo");

  if(selected === "ano1"){
    contactBox.innerHTML = `
      <h4>Lt. Rizaul Karim Ahmed</h4>
      <p>ANO</p>
      <a href="tel:9678226474">📞 9678226474</a>
    `;
  }

  else if(selected === "ano2"){
    contactBox.innerHTML = `
      <h4>Lt. Dr. Fahmida S. Bora</h4>
      <p>ANO</p>
      <a href="tel:9706151620">📞 9706151620</a>
    `;
  }

  else if(selected === "senior"){
    contactBox.innerHTML = `
      <h4>Sgt. Afnan Al Jedid</h4>
      <p>Senior In-Charge</p>
      <a href="tel:6900638787">📞 6900638787</a>
    `;
  }

  else{
    contactBox.innerHTML = "<p>Select a contact from the dropdown.</p>";
  }
}

function logoutCadet(){
  localStorage.removeItem("activeCadetId");
}
