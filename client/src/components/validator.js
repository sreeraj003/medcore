export const validatePassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[!@#$%^&*()]/;
  const numberRegex = /[0-9]/;

  if (password.length < 6) {
    return false;
  }

  if (!uppercaseRegex.test(password)) {
    return false;
  }

  if (!symbolRegex.test(password)) {
    return false;
  }

  if (!numberRegex.test(password)) {
    return false;
  }

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobileNumber = (mobileNumber) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobileNumber);
};

export const validateCapitalLetter = (input) => {
  var firstCharacter = input.charAt(0);
  var regex = /^[A-Z]$/;
  return regex.test(firstCharacter);
};
