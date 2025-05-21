export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_REGEX = /^\d{10}$/;

export interface ValidationError {
  isValid: boolean;
  error: string;
}

export const validateEmail = (email: string): ValidationError => {
  if (!email.trim()) {
    return {isValid: false, error: 'Email is required'};
  }
  if (!EMAIL_REGEX.test(email)) {
    return {isValid: false, error: 'Please enter a valid email address'};
  }
  return {isValid: true, error: ''};
};

export const validatePassword = (password: string): ValidationError => {
  if (!password) {
    return {isValid: false, error: 'Password is required'};
  }
  if (password.length < 6) {
    return {isValid: false, error: 'Password must be at least 6 characters'};
  }
  return {isValid: true, error: ''};
};

export const validatePhone = (phone: string): ValidationError => {
  if (!phone.trim()) {
    return {isValid: false, error: 'Mobile number is required'};
  }
  if (!PHONE_REGEX.test(phone)) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit mobile number',
    };
  }
  return {isValid: true, error: ''};
};

export const validateName = (name: string): ValidationError => {
  if (!name.trim()) {
    return {isValid: false, error: 'Name is required'};
  }
  return {isValid: true, error: ''};
};

export const validateLoginForm = (email: string, password: string) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: {
      email: emailValidation.error,
      password: passwordValidation.error,
    },
  };
};

export const validateSignUpForm = (
  name: string,
  email: string,
  phone: string,
  password: string,
) => {
  const nameValidation = validateName(name);
  const emailValidation = validateEmail(email);
  const phoneValidation = validatePhone(phone);
  const passwordValidation = validatePassword(password);

  return {
    isValid:
      nameValidation.isValid &&
      emailValidation.isValid &&
      phoneValidation.isValid &&
      passwordValidation.isValid,
    errors: {
      name: nameValidation.error,
      email: emailValidation.error,
      mobile: phoneValidation.error,
      password: passwordValidation.error,
    },
  };
};

export const validateCardHolder = (name: string): ValidationError => {
  if (!name.trim()) {
    return {isValid: false, error: 'Cardholder name is required'};
  }
  return {isValid: true, error: ''};
};

export const validateCardNumber = (number: string): ValidationError => {
  const cleaned = number.replace(/\s/g, '');
  if (!cleaned) {
    return {isValid: false, error: 'Card number is required'};
  }
  if (cleaned.length < 16) {
    return {isValid: false, error: 'Card number must be 16 digits'};
  }
  return {isValid: true, error: ''};
};

export const validateExpiry = (expiry: string): ValidationError => {
  if (!expiry.trim()) {
    return {isValid: false, error: 'Expiry date is required'};
  }
  if (!/^\d{2} \/ \d{2}$/.test(expiry)) {
    return {isValid: false, error: 'Expiry must be in MM / YY format'};
  }
  // Optionally, add logic to check if expiry is in the future
  return {isValid: true, error: ''};
};

export const validateCVV = (cvv: string): ValidationError => {
  if (!cvv.trim()) {
    return {isValid: false, error: 'CVV is required'};
  }
  if (!/^\d{3,4}$/.test(cvv)) {
    return {isValid: false, error: 'CVV must be 3 or 4 digits'};
  }
  return {isValid: true, error: ''};
};

export const validateCardForm = (
  cardHolder: string,
  cardNumber: string,
  expiry: string,
  cvv: string,
) => {
  const nameValidation = validateCardHolder(cardHolder);
  const numberValidation = validateCardNumber(cardNumber);
  const expiryValidation = validateExpiry(expiry);
  const cvvValidation = validateCVV(cvv);

  return {
    isValid:
      nameValidation.isValid &&
      numberValidation.isValid &&
      expiryValidation.isValid &&
      cvvValidation.isValid,
    errors: {
      cardHolder: nameValidation.error,
      cardNumber: numberValidation.error,
      expiry: expiryValidation.error,
      cvv: cvvValidation.error,
    },
  };
};
