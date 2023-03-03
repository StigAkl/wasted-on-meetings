const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const emailValidator = (email) => {
  console.log("Email:", email);
  if (!email) {
    return false;
  }

  if (!email.match(emailRegex)) {
    return false;
  }

  return true;
};

const passwordValidator = (password) => {
  console.log("PASSWORD:", password);
  if (!password) {
    return false;
  }

  if (password.length < 7) {
    return false;
  }

  return true;
};

module.exports = {
  emailValidator,
  passwordValidator,
};
