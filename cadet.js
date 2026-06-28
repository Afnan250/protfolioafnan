const cadetId = localStorage.getItem("activeCadetId");

if(!cadetId){
  alert("Please login first.");
  window.location.href = "ncc.html";
}

const status = localStorage.getItem("cadetStatus_" + cadetId);
const joinYear = parseInt(localStorage.getItem("joinYear_" + cadetId));
const currentYear = new Date().getFullYear();

if(status === "cancelled"){
  alert("Your NCC enrollment has been cancelled.");
  localStorage.removeItem("activeCadetId");
  window.location.href = "ncc.html";
}

if(joinYear && currentYear - joinYear >= 3){
  localStorage.removeItem("cadet_" + cadetId);
  localStorage.setItem("cadetStatus_" + cadetId, "completed");
  localStorage.removeItem("activeCadetId");

  alert("Your 3 years NCC service has been completed.");
  window.location.href = "ncc.html";
}

document.getElementById("cadetIdText").innerText = cadetId;

const parts = cadetId.split("/");

if(parts.length >= 6){
  const wing = parts[2];
  const rank = parts[4];
  const name = parts[5];

  document.getElementById("cadetName").innerText = name;
  document.getElementById("cadetRank").innerText = "Rank: " + rank;
  document.getElementById("cadetWing").innerText = "Wing: " + wing;
  document.getElementById("cadetService").innerText = "Status: Active";
}

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

const savedPhoto = localStorage.getItem("cadetPhoto_" + cadetId);

if(savedPhoto){
  image.src = savedPhoto;
}

upload.addEventListener("change", function(){
  const file = this.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(e){
    image.src = e.target.result;

    localStorage.setItem(
      "cadetPhoto_" + cadetId,
      e.target.result
    );
  };

  reader.readAsDataURL(file);
});

function logoutCadet(){
  localStorage.removeItem("activeCadetId");
}