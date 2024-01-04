"use strict";
const carouselOverlayDiv = document.querySelector(".div-carousel");
const carouselOverlay = document.querySelector(".overlay-content");
const projectTitle = document.querySelector(".p-header-title");
const projectImageCover = document.querySelector(".p-main-img");
const divProjectGallery = document.querySelector(".div-project-gallery");

const projectName = location.pathname.split("/")[1];

const getProject = async (e) => {
  const res = await axios({
    method: "GET",
    url: `/api/v1/project/${projectName}`,
  });

  const data = res.data.data[0];

  if (!data) {
    window.location.href = "../error";
  }

  projectTitle.textContent = data.projectName;

  projectImageCover.src = `data/projectImages/${data.imageCover}`;

  divProjectGallery.innerHTML = "";
  data.photos.forEach((img, i) => {
    const markup = `
    <div class="div-project-img"> 
        <img class="project-img" src="data/projectImages/${img}" data-count=${
      i + 1
    } alt=""/>
    </div>
    `;
    divProjectGallery.insertAdjacentHTML("beforeend", markup);
  });

  const images = document.querySelectorAll(".div-project-img");

  images.forEach((img, i) => {
    img.addEventListener("click", function () {
      const imgSrc = img.children[0].src.split("/");
      console.log(imgSrc[imgSrc.length - 1]);
      accessCarousel(
        carouselOverlayDiv,
        carouselOverlay,
        imgSrc[imgSrc.length - 1],
        data.photos,
        "projectImages"
      );
    });
  });
};

window.addEventListener("load", getProject);
