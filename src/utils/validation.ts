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
