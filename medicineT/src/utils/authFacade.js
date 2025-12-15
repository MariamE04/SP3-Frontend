import FetchData from "./FetchData";

// ---------- LOGIN ----------
async function login(username, password) {
  const data = await FetchData("/auth/login", "POST", {
    username,
    password,
  });

  if (data && data.token) {
    localStorage.setItem("jwtToken", data.token);
  }
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("jwtToken");
}

// ---------- TOKEN INFO ----------
function getUserNameAndRoles() {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return ["", ""];
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  const username = payload.username;
  const roles = payload.roles;

  return [username, roles];
}

export default {
  login,
  logout,
  getUserNameAndRoles,
};
