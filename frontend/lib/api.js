const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Normalises every response into either parsed JSON or a thrown Error whose
 * `.message` is safe to show a user. Server-side field errors (the `errors`
 * array returned by the Express validators) are joined into that message so
 * backend validation is never silently swallowed by the UI.
 */
async function parseResponse(response, fallbackMessage) {
  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    const error = new Error('Unexpected response format from server.');
    error.status = response.status;
    throw error;
  }

  if (!response.ok || !data.success) {
    let errorMessage = data?.message || fallbackMessage;
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      errorMessage = data.errors.join(' ');
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Submit a public enquiry via POST /api/enquiries.
 *
 * This is the one unauthenticated write endpoint: no token is attached, and
 * the server ignores any client-supplied `status`.
 *
 * @param {{fullName: string, email: string, phone: string, companyName: string, service: string, message: string}} payload
 * @returns {Promise<{success: boolean, message: string, enquiry: object}>}
 */
export async function createEnquiryApi(payload) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    const error = new Error('Unable to reach the server. Please check your connection and try again.');
    error.status = 0;
    throw error;
  }

  return parseResponse(response, 'Could not submit your enquiry. Please try again.');
}

/**
 * Login admin user against backend POST /api/auth/login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, token: string, admin: object, message: string}>}
 */
export async function loginApi(email, password) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    const error = new Error('Unable to connect to the server. Please try again later.');
    error.status = 0;
    throw error;
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    const error = new Error('Unexpected response format from server.');
    error.status = response.status;
    throw error;
  }

  if (!response.ok || !data.success) {
    const errorMessage = data?.message || 'Login failed. Please try again.';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Fetch list of enquiries from backend GET /api/enquiries
 * @param {string} token - JWT authentication token
 * @returns {Promise<{success: boolean, data: Array, message?: string}>}
 */
export async function getEnquiriesApi(token) {
  let response;
  try {
    response = await authFetch('/api/enquiries', { method: 'GET' }, token);
  } catch (err) {
    const error = new Error('Unable to connect to the server. Please try again later.');
    error.status = 0;
    throw error;
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    const error = new Error('Unexpected response format from server.');
    error.status = response.status;
    throw error;
  }

  if (!response.ok || !data.success) {
    const errorMessage = data?.message || 'Failed to fetch enquiries.';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Fetch single enquiry details from backend GET /api/enquiries/:id
 * @param {number|string} id - Enquiry ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<{success: boolean, data: object, message?: string}>}
 */
export async function getEnquiryApi(id, token) {
  let response;
  try {
    response = await authFetch(`/api/enquiries/${id}`, { method: 'GET' }, token);
  } catch (err) {
    const error = new Error('Unable to connect to the server. Please try again later.');
    error.status = 0;
    throw error;
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    const error = new Error('Unexpected response format from server.');
    error.status = response.status;
    throw error;
  }

  if (!response.ok || !data.success) {
    const errorMessage = data?.message || 'Failed to fetch enquiry details.';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Update single enquiry via PUT /api/enquiries/:id
 * @param {number|string} id - Enquiry ID
 * @param {object} payload - Updated enquiry fields { fullName, email, phone, companyName, service, message }
 * @param {string} token - JWT authentication token
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 */
export async function updateEnquiryApi(id, payload, token) {
  let response;
  try {
    response = await authFetch(
      `/api/enquiries/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      },
      token
    );
  } catch (err) {
    const error = new Error('Unable to connect to the server. Please try again later.');
    error.status = 0;
    throw error;
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    const error = new Error('Unexpected response format from server.');
    error.status = response.status;
    throw error;
  }

  if (!response.ok || !data.success) {
    let errorMessage = data?.message || 'Failed to update enquiry.';
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      errorMessage = data.errors.join(' ');
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Delete single enquiry via DELETE /api/enquiries/:id
 * @param {number|string} id - Enquiry ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function deleteEnquiryApi(id, token) {
  let response;
  try {
    response = await authFetch(`/api/enquiries/${id}`, { method: 'DELETE' }, token);
  } catch (err) {
    const error = new Error('Unable to connect to the server. Please try again later.');
    error.status = 0;
    throw error;
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    const error = new Error('Unexpected response format from server.');
    error.status = response.status;
    throw error;
  }

  if (!response.ok || !data.success) {
    const errorMessage = data?.message || 'Failed to delete enquiry.';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Authenticated fetch helper for making API requests with JWT header
 * @param {string} endpoint - e.g. '/api/enquiries' or full URL
 * @param {RequestInit} [options={}]
 * @param {string|null} token
 * @returns {Promise<Response>}
 */
export async function authFetch(endpoint, options = {}, token = null) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

