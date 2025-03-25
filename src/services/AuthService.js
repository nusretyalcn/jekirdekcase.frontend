import axios from "axios";

const API_URL = "https://localhost:7256/api/Auth";

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export default { login };
