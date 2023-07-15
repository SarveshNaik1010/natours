/* eslint-disable */

const hideAlert = function () {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is success or error
const showAlert = function (type, message) {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
