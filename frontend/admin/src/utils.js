import { Modal, notification } from "antd";

export const TOKEN = localStorage.getItem("token");

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
    "Authorization": "Bearer " + TOKEN,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body),
});

export const showErrorModal = ({ title, err, ...props }) => {
  Modal.error({
    title: title || "Error",
    content: (err && typeof err === "string") ? err : err?.message || JSON.stringify(err),
    ...props,
  });
};

export const showError = ({ title, placement, err, ...props }) => {
  notification.error({
    title: title || "Error",
    placement: placement,
    description: (err && typeof err === "string") ? err : err?.message || JSON.stringify(err),
    maxCount: 3,
    showProgress: true,
    ...props,
  });
};
