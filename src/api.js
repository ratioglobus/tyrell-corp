const API_BASE_URL = 'https://tyrell-backend.onrender.com';

export async function fetchReplicants() {
  const res = await fetch(`${API_BASE_URL}/api/replicants`);
  if (!res.ok) throw new Error('Failed to fetch replicants');
  return res.json();
}