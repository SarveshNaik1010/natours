/*eslint-disable*/
const updateUserForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
const updateBtn = document.querySelector('.btn--save-password');

const updateUserData = async function () {
  // Selecting Elements
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const photo = document.getElementById('photo');

  // Working on multipart form for multer
  const data = new FormData();
  data.append('name', name);
  data.append('email', email);
  data.append('photo', photo.files[0]);
  console.log(data.get('name'));

  try {
    const updatedUser = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/updateMe`,
      data,
    });
    showAlert('success', 'Data Updated Successfully!')
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async function (data) {
  updateBtn.textContent = 'Updating...';
  try {
    console.log(data);
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/users/updateMyPassword`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password Updated Successfully');
    }
  } catch (error) {
    console.log(error);
  }
};

updateUserForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  updateUserData();
});

updatePasswordForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  await updatePassword({ passwordCurrent, password, passwordConfirm });
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
  updateBtn.textContent = 'Save Password';
});
