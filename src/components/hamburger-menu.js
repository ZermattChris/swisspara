

// Vanilla JS that drives the dropdown hamburger menu.

const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
const menuLinks = document.querySelectorAll("#menu a");

const bookNowBtn = document.querySelector("#smallBookNowBtn");

button.addEventListener("click", () => {
  menu.classList.toggle("hidden");

  //bookNowBtn.classList.toggle("hidden");
});

menuLinks.forEach((mLink) => {
  mLink.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});
function onClickOutside(el, cb) {
  document.addEventListener("click", (event) => {
    if (!el.contains(event.target)) cb();
  });
}

// Close on outside clicks.
var navBar = document.getElementById("navbar");

onClickOutside(navBar, () => {
  if (!menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
});
