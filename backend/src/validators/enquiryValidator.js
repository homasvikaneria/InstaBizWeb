const ALLOWED_SERVICES = [
  'Website Development',
  'Web/Mobile App Development',
  'CRM',
  'ERP/Odoo',
  'Custom Software',
  'Business Automation',
  'AI Automation',
  'API Integration',
  'Digital Marketing',
  'Other'
];

const validateEnquiry = (data) => {
  const errors = [];

  let { fullName, email, phone, companyName, service, message } = data || {};

  fullName = typeof fullName === 'string' ? fullName.trim() : '';
  email = typeof email === 'string' ? email.trim() : '';
  phone = typeof phone === 'string' ? phone.trim() : '';
  companyName = typeof companyName === 'string' ? companyName.trim() : '';
  service = typeof service === 'string' ? service.trim() : '';
  message = typeof message === 'string' ? message.trim() : '';

  if (!fullName) {
    errors.push('Full name is required.');
  } else if (fullName.length > 100) {
    errors.push('Full name cannot exceed 100 characters.');
  }

  if (!email) {
    errors.push('Email is required.');
  } else if (email.length > 255) {
    errors.push('Email cannot exceed 255 characters.');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format.');
    }
  }

  if (!phone) {
    errors.push('Phone number is required.');
  } else if (phone.length > 30) {
    errors.push('Phone number cannot exceed 30 characters.');
  } else {
    const phoneRegex = /^[0-9\s\-\+\(\)]{7,30}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Invalid phone number format.');
    }
  }

  if (!companyName) {
    errors.push('Company name is required.');
  } else if (companyName.length > 150) {
    errors.push('Company name cannot exceed 150 characters.');
  }

  if (!service) {
    errors.push('Service is required.');
  } else if (!ALLOWED_SERVICES.includes(service)) {
    errors.push('Invalid service selection.');
  }

  if (!message) {
    errors.push('Message is required.');
  } else if (message.length > 2000) {
    errors.push('Message cannot exceed 2000 characters.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      fullName,
      email,
      phone,
      companyName,
      service,
      message
    }
  };
};

module.exports = {
  validateEnquiry,
  ALLOWED_SERVICES
};
