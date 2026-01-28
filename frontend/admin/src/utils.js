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
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body),
});