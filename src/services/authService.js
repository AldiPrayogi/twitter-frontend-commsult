import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/auth';

const register = async (payload) => axios.post(`${API_URL}/signup`, payload, { validateStatus: () => true });

export default register;
