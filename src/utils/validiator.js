export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  password: (password) => {
    return password.length >= 6;
  },

  username: (username) => {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  },

  phoneNumber: (phone) => {
    return /^\+?[\d\s-()]+$/.test(phone);
  },

  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  required: (value) => {
    return value !== null && value !== undefined && value !== '';
  },
};

export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];

    fieldRules.forEach(rule => {
      if (rule.validator && !rule.validator(value)) {
        errors[field] = rule.message;
      }
    });
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};