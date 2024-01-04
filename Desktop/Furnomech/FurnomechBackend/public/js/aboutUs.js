"use strict";

const statNumber = document.querySelectorAll(".animate-num");
const div1 = document.querySelector(".div-about-furnomech");

//////////////////////////////////////////////////////////////////////////////////////
// Card Overlay
const card = document.querySelectorAll(".card");
const blurBg = document.querySelector(".overlay-bg-blur");
const detailCard = document.querySelector(".overlay-card");

const memberData = [
  {
    id: "AnupKabra",
    name: "Mr Anup Kabra",
    photo: `https://assets.website-files.com/62dae85d36cc11580a6942ab/62eafb18abd85086451325a2_team-member-profile-01-p-500.jpg`,
    designation: "Chief Executive Officer",
    info: "Anup Kabra is the visionary CEO and Director of Furnomech, a renowned provider of designer modular furniture. With a strong background in Computer Science and Engineering, Anup's leadership drives the success of Omech Engineering Co. Pvt. Ltd., a prestigious ISO Certified group known for its 45-year legacy in Precision Engineering.",
    keyPoints: [
      "Anup has been a key member of MASSIA, the largest industrial association of Maharashtra",
      "Worked at MASSIA for over a decade under key roles ranging from Joint Secretary to President.",
      "Co-founded Furnomech in December 2013",
      "Delivering exceptional modular furniture solutions with an unwavering focus on quality and customer satisfaction",
    ],
  },
  {
    id: "AnjaliKabra",
    name: "Anjali Kabra",
    photo: `https://assets.website-files.com/62dae85d36cc11580a6942ab/62eafb18abd85086451325a2_team-member-profile-01-p-500.jpg`,
    designation: "Chief Designer",
    info: "Anjali Kabra qualified as an Interior Designer from the Marathwada Mitra Mandal School of Interior Design in 1996 after which she started out as a freelance interior design consultant based in Aurangabad. She has since designed an array of projects ranging from residences and offices to rooftop restaurants and caravans",
    keyPoints: [
      "Co-founded furnomech in 2013.",
      "She joined the Marathwada Centre of the Indian Institute of Interior Designers as a committee member in 2019.",
      "Elected to serve as Chairperson of IIID in 2021",
      "She has acted as a visionary catalyst, uniting the local community of designers and bringing. ",
    ],
  },
  {
    id: "OmprakashKabra",
    name: "O.M.Kabra",
    photo: `https://assets.website-files.com/62dae85d36cc11580a6942ab/62eafb18abd85086451325a2_team-member-profile-01-p-500.jpg`,
    designation: "Chief Designer",
    info: "Mr O.M. Kabra, the esteemed Managing Director of Furnomech, graduated with distinction from the Government College of Engineering, Aurangabad in the year 1969. Subsequently, he received management training at TELCO and after a successful stint as a Project Engineer, he began his career as a Project Manger at Auto Mughals Pvt. Ltd. where he went on to become the Chief Executive Officer.",
    keyPoints: [
      "In 1981, Mr O.M. Kabra founded Omech Engineering Co. Pvt. Ltd.",
      "Omech was the first Precision Engineering Toolroom in Aurangabad and served as the Managing Director",
      "Furthering his commitment to innovation, he also serves as Director at Omech Tooltech, diversifying the company's reach and impact.      ",
      " Under his guidance, the company continues to deliver exceptional products while maintaining a strong presence in the industry.",
    ],
  },
];

const generateList = function (list) {
  let markup = ``;
  list.forEach((l, i) => {
    markup += `<li class="card-member-list">${l}</li>`;
  });
  return markup;
};

const displayMemberInfo = function (memberData) {
  const markup = `
    <div class="div-overlay-member-img">
    <ion-icon class="close-icon" name="close-outline"></ion-icon>
        <img class="overlay-member-img" src="${memberData.photo}" alt="">
    </div>
    <div class="div-overlay-member-info">
        <div class="main-info">
            <h1 class="card-member-name">${memberData.name}</h1>
            <h1 class="card-member-designation">${memberData.designation}</h1>
            </div>
            <p class="card-member-info">${memberData.info}</p>
        </div>
    <div>
    `;

  detailCard.innerHTML = ``;
  detailCard.insertAdjacentHTML("afterbegin", markup);
  const btnClose = document.querySelector(".close-icon");
  btnClose.addEventListener("click", function () {
    blurBg.style.display = "none";
    detailCard.style.display = "none";
  });
};

blurBg.addEventListener("click", function () {
  blurBg.style.display = "none";
  detailCard.style.display = "none";
});

card.forEach((c, i) => {
  c.addEventListener("click", function () {
    const member = memberData.filter((m, i) => m.id === c.dataset.member)[0];
    displayMemberInfo(member);
    blurBg.style.display = "block";
    detailCard.style.display = "flex";
  });
});

//////////////////////////////////////////////////////////////////////////////////////
// Section Reveal

const optionIncre = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};

const observeIncre = function (entries, observer) {
  entries.forEach((e, i) => {
    if (!e.isVisible) {
      statNumber.forEach((s, i) => {
        s.textContent = 0;
      });
    }

    statNumber.forEach((s, i) => {
      const lim = s.dataset.num;
      for (let i = 1; i <= lim; i++) {
        setTimeout(() => {
          s.textContent = i;
        }, (1500 / lim) * i);
      }
    });
  });
};

const incObserver = new IntersectionObserver(observeIncre, optionIncre);

setTimeout(() => {
  // 1. Observer For Number
  incObserver.observe(div1);
}, 2000);
