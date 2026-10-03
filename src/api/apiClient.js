const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const CATEGORIES = [
  'Infrastructure & Facilities',
  'IT & Technical',
  'Water & Sanitation',
  'Academic',
  'Fees & Accounts',
  'Library',
  'Hostel & Accommodation'
];

export const STATUSES = [
  'SUBMITTED',
  'UNDER REVIEW',
  'IN PROGRESS',
  'RESOLVED'
];

export const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

async function fetchApi(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Try to parse error message from backend
      let errorMessage = 'Network response was not ok';
      try {
        const errData = await response.json();
        errorMessage = errData.message || errorMessage;
      } catch (e) {
        errorMessage = `Error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please make sure the backend is running.');
    }
    throw error;
  }
}

export const authApi = {
  login: (email, password) => fetchApi('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  register: (name, email, password) => fetchApi('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  }),
};

export const complaintApi = {
  create: (data) => fetchApi('/api/complaints', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getMyComplaints: (userId) => fetchApi(`/api/complaints/my?userId=${userId}`),
  getById: (complaintId) => fetchApi(`/api/complaints/${complaintId}`),
};

export const adminApi = {
  getDashboard: () => fetchApi('/api/admin/dashboard/full'),
  getComplaints: (params = {}) => {
    const queryStr = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return fetchApi(`/api/admin/complaints${queryStr ? `?${queryStr}` : ''}`);
  },
  updateStatus: (complaintId, status) => fetchApi(`/api/admin/complaints/${complaintId}/status?status=${encodeURIComponent(status)}`, {
    method: 'PUT',
  }),
  updatePriority: (complaintId, priority) => fetchApi(`/api/admin/complaints/${complaintId}/priority?priority=${encodeURIComponent(priority)}`, {
    method: 'PUT',
  }),
};

export const feedbackApi = {
  submit: (data) => fetchApi('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  get: (complaintId) => fetchApi(`/api/feedback/${complaintId}`),
  getByComplaintId: (complaintId) => fetchApi(`/api/feedback/${complaintId}`),
};

export function formatStatus(status) {
  if (!status) return 'Unknown';
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function getStatusColor(status) {
  switch (status?.toUpperCase()) {
    case 'SUBMITTED': return 'secondary';
    case 'UNDER REVIEW': return 'warning';
    case 'IN PROGRESS': return 'info';
    case 'RESOLVED': return 'success';
    default: return 'outline';
  }
}
