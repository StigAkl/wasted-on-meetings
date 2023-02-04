const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const emailValidator = (email) => {
  if (!email) {
    return false;
  }

  if (!email.match(emailRegex)) {
    return false;
  }

  return true;
};

const passwordValidator = (password) => {
  if (!password) {
    return false;
  }

  if (!password.match(passwordRegex)) {
    return false;
  }

  return true;
};

module.exports = {
  emailValidator,
  passwordValidator,
};
