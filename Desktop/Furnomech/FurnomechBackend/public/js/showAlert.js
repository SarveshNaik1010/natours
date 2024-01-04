const divAlert = document.querySelector(".overlay-alert");

const showAlert = function (type, message, icon) {
  const markup = `
    <div class="div-alert overlay-${type}">
        <ion-icon name="${icon}-circle-outline"></ion-icon>
        <p class="alert-message">${message}</p>
    </div>
    `;
  divAlert.innerHTML = ``;
  divAlert.insertAdjacentHTML("afterbegin", markup);
  divAlert.style.display = "flex";

  setTimeout(() => {
    divAlert.style.display = 'none';
  }, 3000)
};
