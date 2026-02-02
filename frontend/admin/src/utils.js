import { Modal, notification } from "antd";
import dayjs from "dayjs";

export const getToken = () => localStorage.getItem("token");

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

export const formatLocale = (value) => {
  return value?.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 10 });
};

export const formatCurrency = (value) => {
  if (!value) return `$${formatLocale(0)}`;
  const fixed = Number(value)?.toFixed(2);
  return `$${formatLocale(Number(fixed))}`;
};

export const formatPercentage = (value) => {
  if (!value) return `${formatLocale(0)}%`;
  const fixed = Number(value)?.toFixed(2);
  return `${formatLocale(Number(fixed))}%`;
};

export const formatQuantity = (value) => {
  if ((!value || value === 0)) return 0;
  return `${formatLocale(value ?? 0)}`;
};

export const formatDate = (value, format = "DD/MM/YYYY") => {
  if (!value || value === "0001-01-01T00:00:00Z") return '';
  return dayjs(value).utc().format(format);
  // return dayjs.tz(value, "America/Argentina/Buenos_Aires").format(format);
};

export const eliminarTildes = text => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
};

export const filterOption = (inputValue, option) => {
  const parsedOption = eliminarTildes(option.label.toLowerCase());
  const parsedInput = eliminarTildes(inputValue.normalize().toLowerCase());
  return parsedOption.includes(parsedInput);
};