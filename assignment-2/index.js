const hamburger = document.querySelector(".hamburger");
const menu = document.getElementById("nav-items");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.addEventListener("click", function(e){
  if(!menu.contains(e.target) && !hamburger.contains(e.target)){
    menu.classList.remove("active");
  }
});
