import httpService from "../services/httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiUrl = `${config.apiUrl}/auth`;
const tokenKey = "token";

httpService.addJWTHeader(localStorage.getItem(tokenKey));

const register = (userInfo) => {
  return httpService.post(`${apiUrl}/register`, userInfo);
};

const login = async (credentials) => {
  const { data } = await httpService.post(`${apiUrl}/login`, credentials);
  setJWT(data["token"]);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const setJWT = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

const getJWT = () => {
  return localStorage.getItem(tokenKey);
};

const getCurrentUser = () => {
  try {
    const jwt = getJWT();
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
};

const exportObj = { register, login, logout, getCurrentUser, getJWT, setJWT };

export default exportObj;
