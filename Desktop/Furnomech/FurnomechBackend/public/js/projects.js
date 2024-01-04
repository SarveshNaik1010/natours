"use strict";

const projectDiv = document.querySelector(".div-projects");

const renderProjects = async function () {
  // 1. Get all the projects
  const res = (
    await axios({
      method: "GET",
      url: `/api/v1/project`,
    })
  ).data.projects;

  // projectDiv.innerHTML = '';
  // 2. Generate markup
  res.forEach((pro, i) => {
    let markup;
    console.log(pro.imageCover);
    if ((i + 1) % 2 === 0) {
      markup = `
            <div class="project project-left animate-card-left">
            <div class="div-project-img"><img class="project-img" src="data/projectImages/${pro.imageCover}" alt=""/></div>
            <div class="div-project-desc">
              <div class="div-project-title">
                <p class="project-title">${pro.projectName}</p>
              </div>
              <div class="div-project-text">
                <p class="project-text">${pro.projectDescription}</p><a class="secondary-link project-link" href="/${pro.slug}">view project</a>
              </div>
            </div>
          </div>
              `;
    } else {
      markup = `
            <div class="project project-right animate-card-right">
            <div class="div-project-desc">
              <div class="div-project-title">
                <p class="project-title">${pro.projectName}</p>
              </div>
              <div class="div-project-text">
                <p class="project-text">${pro.projectDescription}</p><a class="secondary-link project-link" href="/${pro.slug}">view project</a>
              </div>
            </div>
            <div class="div-project-img"><img class="project-img" src="data/projectImages/${pro.imageCover}" alt=""/></div>
          </div>
            `;
    }
    projectDiv.insertAdjacentHTML("afterbegin", markup);
    const projectLeft = document.querySelectorAll(".animate-card-left");
    const projectRight = document.querySelectorAll(".animate-card-right");

    setTimeout(() => {
      projectLeft.forEach((project, i) => {
        swipeObserver.observe(project);
      });
      projectRight.forEach((project, i) => {
        swipeObserver.observe(project);
      });
    }, 2000);
  });
};

renderProjects();
