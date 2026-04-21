let likes = getCookie("likes") ? parseInt(getCookie("likes")) : 0;
let dislikes = getCookie("dislikes") ? parseInt(getCookie("dislikes")) : 0;
let voted = getCookie("voted");
let comments = getCookie("comments")
  ? JSON.parse(getCookie("comments"))
  : [];

const likeCount = document.getElementById("likeCount");
const dislikeCount = document.getElementById("dislikeCount");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const commentInput = document.getElementById("commentInput");
const submitComment = document.getElementById("submitComment");
const commentsList = document.getElementById("commentsList");
const resetBtn = document.getElementById("resetBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

updateUI();

likeBtn.addEventListener("click", () => {
  if (!voted) {
    likes++;
    voted = "like";
    saveData();
  }
});

dislikeBtn.addEventListener("click", () => {
  if (!voted) {
    dislikes++;
    voted = "dislike";
    saveData();
  }
});

submitComment.addEventListener("click", () => {
  const text = commentInput.value.trim();

  if (text && !getCookie("commented")) {
    comments.push(text);
    setCookie("commented", "yes", 7);
    saveData();
    commentInput.value = "";
  }
});

resetBtn.addEventListener("click", () => {
  likes = 0;
  dislikes = 0;
  voted = "";
  comments = [];

  deleteCookie("likes");
  deleteCookie("dislikes");
  deleteCookie("voted");
  deleteCookie("comments");
  deleteCookie("commented");

  updateUI();
});

function saveData() {
  setCookie("likes", likes, 7);
  setCookie("dislikes", dislikes, 7);
  setCookie("voted", voted, 7);
  setCookie("comments", JSON.stringify(comments), 7);
  updateUI();
}

function updateUI() {
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;

  commentsList.innerHTML = "";
  comments.forEach(comment => {
    const div = document.createElement("div");
    div.className = "comment";
    div.textContent = comment;
    commentsList.appendChild(div);
  });
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
if(getCookie("darkMode") === "on"){
  document.body.classList.add("dark");
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    setCookie("darkMode", "on", 7);
  } else {
    setCookie("darkMode", "off", 7);
  }
});