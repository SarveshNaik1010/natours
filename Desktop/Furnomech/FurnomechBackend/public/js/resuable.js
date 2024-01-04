"use strict";
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM Elements
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const btnMenue = document.querySelector(".btn-menu");
const nav = document.querySelector(".nav");
const navigation = document.querySelector(".navigation");
const home = document.querySelector(".section-home");
const logo = document.querySelector(".logo");
const link = document.querySelectorAll(".link");
const overlay = document.querySelector(".overlay");
const overlayTitle = document.querySelector(".title");
const overlayImg = document.querySelector(".overImg");
const movingImages = document.querySelectorAll(".move-img");

// Gloal Variables
const timePri = 1000;
const timeSec = 650;
let preDisTop = 0;

// Functions
const blurNavBackground = function () {
  if (navigation.classList.contains("active")) return;
  if (window.scrollY > 10) {
    nav.classList.add("blur-background");
  } else {
    nav.classList.remove("blur-background");
  }
};

// Opens Navigation dropdown
const openMenu = function () {
  // Untimmed changes & alignment
  navigation.style.transform = `translateY(0)`;
  btnMenue.style.color = `var(--light-text-color)`;
  nav.style.opacaty = 0;
  btnMenue.name = `close-outline`;
  nav.classList.remove("blur-background");

  // ************************************
  // Review Later
  // MUST BE CHANGED IN MEDIA QUERIES
  // logo.style.paddingLeft = "100%";
  // logo.style.transform = `translate(-50%)`;

  // Timmed Alignment
  setTimeout(() => (logo.src = `data/Logos/white-furnomech-logo.png`), 50);
  setTimeout(() => {
    link.forEach((e, i) => {
      setTimeout(() => (e.style.transform = `rotateX(0deg)`), 100 * i);
    });
  }, 800);
};

// Closes Navigation dropdown
const closeMenu = function () {
  // Untimmed changes & alignment
  logo.style.paddingLeft = "0";
  logo.style.transform = `translate(0)`;
  const linkTemp = [...link].reverse();
  linkTemp.forEach((e, i) => {
    setTimeout(() => (e.style.transform = `rotateX(90deg)`), 100 * i);
  });

  // Timmed changes & alignment
  setTimeout(
    () => (logo.src = `data/Logos/main-furnomech-logo.png`),
    timePri + timeSec
  );
  setTimeout(() => (navigation.style.transform = `translateY(-100%)`), 1000);
  setTimeout(() => {
    btnMenue.name = `menu-outline`;
    btnMenue.style.color = `var(--dark-text-color)`;
    blurNavBackground();
  }, timePri + timeSec);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Intro Animation
//////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", function () {
  this.setTimeout(() => {
    overlay.style.transform = `translateY(-100%)`;
    // overlay.style.opacaty = 0;
    // overlay.style.display = `none`;
  }, 1000);

  this.setTimeout(() => {
    overlayTitle.style.scale = `0`;
  }, 500);

  this.setTimeout(() => {
    overlayImg.style.opacity = 0;
  }, 1000);
});

// Navigation Dropdown
btnMenue.addEventListener("click", function () {
  navigation.classList.toggle("active");
  if (this.classList.contains("open")) openMenu();
  else closeMenu();
  this.classList.toggle("open");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scroll To Top
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const scrollToTopBtn = document.querySelector(".scroll-to-top");
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// FOOTER LINKS
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Image & Text Animation
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Images
const optionImage = {
  root: null,
  threshold: 0,
  // rootMargin: "-100px 0px",
  rootMargin: "0px 0px 0px 0px",
};

const animateImg = document.querySelectorAll(".animate-img");
const observeImage = function (entries, observer) {
  entries.forEach((el, i) => {
    // console.log(el.target);
    if (el.isIntersecting) {
      el.target.style.transform = `translateX(0)`;
    }

    if (!el.isIntersecting) {
      el.target.style.transform = `translateX(100%)`;
    }
  });
};
const imageObserver = new IntersectionObserver(observeImage, optionImage);

//////////////////////////////////////////////////////////////////////////////////////
// Texts
const optionTitle = {
  root: null,
  threshold: 1,
  rootMargin: "-40px",
};
const animateTitle = document.querySelectorAll(".animate-title");

const observeTitle = function (entries, observer) {
  entries.forEach((txt, i) => {
    if (txt.isIntersecting) {
      setTimeout(() => (txt.target.style.transform = `rotate(0)`), 150 * i);
    }
  });
};
const titleObserver = new IntersectionObserver(observeTitle, optionTitle);

//////////////////////////////////////////////////////////////////////////////////////
// Links
const optionLink = {
  root: null,
  threshold: 0,
  rootMargin: "240px",
};
const animateLink = document.querySelectorAll(".animate-link");

const observeLink = function (entries, observer) {
  entries.forEach((link, i) => {
    if (link.isIntersecting) {
      link.target.style.opacity = 1;
    }
  });
};
const linkObserver = new IntersectionObserver(observeLink, optionLink);

//////////////////////////////////////////////////////////////////////////////////////
// Section Reveal
const optionReveal = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};
const animateElement = document.querySelectorAll(".animate-element");

const observeReveal = function (entries, observer) {
  entries.forEach((ele, i) => {
    if (ele.isIntersecting) {
      ele.target.style.opacity = 1;
      ele.target.style.transform = `translateY(0)`;
    }
  });
};

const revealObserver = new IntersectionObserver(observeReveal, optionReveal);

//////////////////////////////////////////////////////////////////////////////////////
// Section Reveal
const [cardLeft, cardRight] = [
  document.querySelectorAll(".animate-card-left"),
  document.querySelectorAll(".animate-card-right"),
];

const optionSwipe = {
  root: null,
  threshold: 0,
  rootMargin: "-150px",
};

const observeSwipe = function (entries, observer) {
  entries.forEach((ele, i) => {
    if (!ele.isIntersecting) return;
    ele.target.style.opacity = 1;
    ele.target.style.transform = `translateX(0)`;
  });
};

const swipeObserver = new IntersectionObserver(observeSwipe, optionSwipe);

setTimeout(() => {
  // 1. Observer For images
  animateImg.forEach((img, i) => {
    imageObserver.observe(img);
  });
  // 2. Observer for titles
  animateTitle.forEach((tit, i) => {
    titleObserver.observe(tit);
  });
  // 3. Observe for reveal
  animateElement.forEach((el, i) => {
    revealObserver.observe(el);
  });
  // 4. Observe for links
  animateLink.forEach((link, i) => {
    linkObserver.observe(link);
  });
  // 5. Observe for cards
  cardLeft.forEach((card, i) => {
    swipeObserver.observe(card);
  });
  cardRight.forEach((card, i) => {
    swipeObserver.observe(card);
  });
}, 2000);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parallax Scrolling & Scrolling
//////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("scroll", blurNavBackground);

// window.addEventListener("scroll", function (e) {
//   const currDisTop = this.scrollY;
//   const diff = (preDisTop - currDisTop) * 2.1;
//   console.log(diff);
//   movingImages.forEach((img, i) => {
//     const style = this.getComputedStyle(img).transform;
//     console.log(img);
//     console.log(style);
//     console.log("******************************");
//     const { e: X, f: Y } = new WebKitCSSMatrix(style);
//     img.style.transform = `translate(${X}px, ${Y + diff}px)`;
//   });
//   preDisTop = currDisTop;
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Overlay Controll
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const displayImage = function (carouselDiv, contentDiv, imgPath, folderName) {
  const markup = `<img class="imgCarousel" src="data/${folderName}/${imgPath}" />`;
  contentDiv.innerHTML = "";
  contentDiv.insertAdjacentHTML("afterbegin", markup);
};

const accessCarousel = function (
  carouselDiv,
  contentDiv,
  img,
  photos,
  folderName
) {
  let markup = "";

  carouselDiv.classList.remove("hidden-carousel");
  displayImage(carouselDiv, contentDiv, img, folderName);

  let currImageCount = img.slice(
    img.indexOf("_") + 1,
    img.indexOf("-", img.indexOf("_"))
  );
  console.log(currImageCount);

  const scrollLeft = document.querySelector(".scroll-left");
  const scrollRight = document.querySelector(".scroll-right");
  const closeCarousel = document.querySelector(".btn-close-carousel");
  const overlayBlue = document.querySelector(".carousel-overlay-blur");

  contentDiv.scrollTo(0, 0);

  scrollLeft.addEventListener("click", function () {
    const i = photos.filter((i) =>
      i.includes(`count_${currImageCount - 1}`)
    )[0];
    console.log(i);
    if (!i) return;
    displayImage(carouselDiv, contentDiv, i, folderName);
    currImageCount--;
  });

  scrollRight.addEventListener("click", function () {
    console.log(photos);
    const i = photos.filter((i) =>
      i.includes(`count_${currImageCount + 1}`)
    )[0];
    console.log(i);
    if (!i) return;
    displayImage(carouselDiv, contentDiv, i, folderName);
    currImageCount++;
  });

  closeCarousel.addEventListener("click", function () {
    carouselDiv.classList.add("hidden-carousel");
  });

  overlayBlue.addEventListener("click", function () {
    carouselDiv.classList.add("hidden-carousel");
  });
};
