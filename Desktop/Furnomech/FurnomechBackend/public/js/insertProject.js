"use strict";

const form = document.querySelector(".admin-login");
const contentDiv = document.querySelector('.content-div-admin');

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    const admin = (
      await axios({
        method: "GET",
        url: "/auth",
      })
    ).data.data[0];
    const formData = new FormData(form);

    if (!
      (formData.get("username") === admin.adminName &&
      formData.get("password") === admin.adminPassword)
    ) {
      throw new Error("Incorrect username or password")
    }

    console.log("Authenticated");

    const markup = `
    <form class="form form-project-data">
      <div class="form__group"><label class="form__label" for="">Project Name</label><input class="form__input" id="name" type="text" value="" required="required" name="projectName" /></div>
      <div class="form__group ma-bt-md"><label class="form__label" for="">client Name</label><input class="form__input" id="email" type="text" value="" required="required" name="clientName" /></div>
      <div class="form__group ma-bt-md"><label class="form__label" for="">Project description</label><input class="form__input" id="email" type="text" value="" required="required" name="projectDescription" /></div>
      <div class="form__group form__photo-upload"><img class="form__user-photo" src="" alt="User photo" /><input class="form__upload" type="file" id="photo" name="imageCover" /><label for="photo">Choose Cover image </label></div>
      <div class="form__group form__photo-upload"><img class="form__user-photo" src="" alt="User photo" /><input class="form__upload" type="file" id="photo" name="photos" multiple /><label for="photo">Choose photos </label></div>
      <div class="form__group right"><button class="btn btn--small btn--green">Save settings</button></div>
    </form>
    `;

    contentDiv.innerHTML = '';
    contentDiv.insertAdjacentHTML('afterbegin', markup);

    const uploadDataForm = document.querySelector('.form-project-data');
    uploadDataForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const projectDataForm = new FormData(this);
      const res = await axios({
        method: "POST",
        url: '/api/v1/project',
        data: projectDataForm
      })
    });

  } catch (error) {
    console.log(error);
  }
});
