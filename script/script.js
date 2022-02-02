const username = document.getElementById("Name");
const email = document.getElementById("Email");
const phoneNumber = document.getElementById("phoneNumber");
const DateofBirth = document.getElementById("DateofBirth");
const gender = document.getElementById("gender");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("registration");
const success = document.getElementById("success");

//------------------------------------- Preventing default actions ----------------------------------
form.addEventListener("submit", (x) => {
  x.preventDefault();
  if (validate()) {
    success.innerText = "Submitted successfully!";
  }
});

//------------------------------------- For printing the error -------------------------------------
const setError = (node, err) => {
  const nodeGet = node.parentNode;
  const displayError = nodeGet.querySelector(".error");
  displayError.innerText = err;
};

//------------------------------------- For removing the error -------------------------------------
const setSuccess = (node) => {
  const nodeGet = node.parentNode;
  const displayError = nodeGet.querySelector(".error");
  displayError.innerText = "";
};

// ------------------------------------- Validation functions --------------------------------------

// const checkUsername = (user) => {
//   return user === "" && user.length < 2  ? false : true;
// };
const checkPassword = (pw) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(pw);
};
const emailCheck = (mail) => {
  let regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
  return regex.test(mail);
};
const checkDOB = (dob) => {
  const now = new Date();
  const newDate = new Date(dob);
  const difference = now - newDate;
  const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
  console.log(age);
  return age > 18 ? true : false;
};
const checkPhone = (num) => {
  const reg = /[6-9]{1}[0-9]{9}/;
  return reg.test(num);
};
const validate = () => {
  const name = username.value.trim();
  const emailValidate = email.value.trim();
  const DOB = DateofBirth.value;
  const genderSelected = gender.value;
  const phoneNo = phoneNumber.value;
  const mainPassword = password.value.trim();
  const confirmPasswordValidate = confirmPassword.value.trim();
  let nameFlag = false,
    emailFlag = false,
    dobFlag = false,
    genderFlag = false,
    phoneNumberFlag = false,
    mainPasswordFlag = false,
    confirmPasswordFlag = false;

  if (name === "") {
    setError(username, "Name field cannot be empty.");
  } else if (name.length < 2 || name.length > 120) {
    setError(
      username,
      "Name must have atleast 2 characters and less than 120 characters"
    );
  } else {
    setSuccess(username), (nameFlag = true);
  }

  !emailCheck(emailValidate)
    ? setError(email, "Kindly enter valid email address")
    : (setSuccess(email), (emailFlag = true));

  DOB === ""
    ? setError(DateofBirth, "Kindly select a date.")
    : !checkDOB(DOB)
    ? setError(DateofBirth, "Your age must be greater than 18")
    : (setSuccess(DateofBirth), (dobFlag = true));

  !checkPassword(mainPassword)
    ? setError(
        password,
        "Password must contain atleast 8 characters, Uppercase & lowercase characters, one special character, and numbers."
      )
    : (setSuccess(password), (mainPasswordFlag = true));

  confirmPasswordValidate !== mainPassword
    ? setError(confirmPassword, "Password doesn't match. Kindly try again.")
    : (setSuccess(confirmPassword), (confirmPasswordFlag = true));

  genderSelected === "-1"
    ? setError(gender, "Please select a gender")
    : (setSuccess(gender), (genderFlag = true));

  !checkPhone(phoneNo)
    ? setError(phoneNumber, "Please enter valid mobile number.")
    : (setSuccess(phoneNumber), (phoneNumberFlag = true));

  return (
    nameFlag &&
    emailFlag &&
    dobFlag &&
    genderFlag &&
    phoneNumberFlag &&
    mainPasswordFlag &&
    confirmPasswordFlag
  );
};
