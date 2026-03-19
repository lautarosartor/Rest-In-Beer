import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");
export const getClientToken = () => localStorage.getItem("client_token");

export const getClientClaims = () => {
  const token = getClientToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const publicOptions = (method, body) => ({
  method,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body),
});

export const privateOptions = (method, body) => ({
  method,
  headers: {
    "Authorization": "Bearer " + getToken(),
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body),
});

export const privateClientOptions = (method, body) => ({
  method,
  headers: {
    "Authorization": "Bearer " + getClientToken(),
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body),
});