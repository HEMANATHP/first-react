import api from "../api/axios";

const login = async (userData) => {
  const response = await api.post("/auth/login", {
    username: userData.username,
    password: userData.password,
    expiresInMins: 30,
  });
  return response.data;
};

export default login;
