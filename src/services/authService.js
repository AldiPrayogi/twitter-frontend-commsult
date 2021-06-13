import axios from 'axios';

const API_URL = '/api/v1/auth';

const register = async (payload) => axios.post(`${API_URL}/signup`, payload, { validateStatus: () => true });

const login = async (payload) => {
  const result = await axios.post(`${API_URL}/login`, payload, { validateStatus: () => true });
  localStorage.setItem('userData', JSON.stringify(result.data.userData));
  return result;
};

const verify = async () => axios.post(`${API_URL}/verify`, {}, { validateStatus: () => true });

const logout = async () => axios.post(`${API_URL}/logout`, {}, { validateStatus: () => true });

const authService = {
  register, login, verify, logout,
};

export default authService;
