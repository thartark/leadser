const API_BASE = '/api';
export const fetchLeads = () => fetch(`${API_BASE}/leads`).then(res => res.json());
export const createLead = (data) => fetch(`${API_BASE}/leads`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(res => res.json());
export default { fetchLeads, createLead };
