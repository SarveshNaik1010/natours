const form = document.querySelector(".form-contact-us");
const num1 = document.querySelector(".num1");
const num2 = document.querySelector(".num2");
const answer = document.querySelector(".captcha-sum");
const incorrectMessage = document.querySelector(".incorrect-message");
const btnSubmit = document.querySelector(".btn-submit");

const verifyCaptcha = function (num1, num2, ans) {
  const sum = +num1 + +num2;
  return sum === +ans;
};

const generateCaptchaNumbers = function() {
   const num1 = Math.floor(Math.random() * 5) + 1;
   const num2 = Math.floor(Math.random() * 5) + 1;
   document.querySelector('.num1').textContent = num1;
   document.querySelector('.num2').textContent = num2;
}

const insertData = async function (form) {
  // 1. Get the data
  const name = form.get("name");
  const email = form.get("email");
  const phoneNumber = form.get("phNumber");
  const message = form.get("message");
  const recepientsAddress = form.get("address");

  const data = {
    name,
    email,
    phoneNumber,
    message,
    recepientsAddress,
  };

  if (!name || !email || !phoneNumber) {
    showAlert("error", "Name, email & phone number are mandatory", "close");
    return;
  }

  console.log("next");
  // 2. Insert the data in DB
  const res = await axios({
    method: "POST",
    url: `/api/v1/contact`,
    data,
  });

  //   3. Give a success acknowledgement
  if (res.status === 200) {
    showAlert("success", "Success! We will contact you soon", "checkmark");
    btnSubmit.style.display = "none";
  }
};

const submitForm = function (e) {
  e.preventDefault();
  // 1. Remove incorrect message markup
  // incorrectMessage.classList.add("msg-hidden");

  // 2. Get the form data
  const data = new FormData(form);

  // 3. Verify the captcha
  if (!verifyCaptcha(num1.textContent, num2.textContent, answer.value)) {
    showAlert("error", "Captcha verification failed", "close");
    generateCaptchaNumbers();
    return;
  }
  // 4. Once verified add the data to the DB.
  insertData(data);
};

btnSubmit.addEventListener("click", submitForm);
