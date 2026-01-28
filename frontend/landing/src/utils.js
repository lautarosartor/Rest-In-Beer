export const publicOptions = (method, body) => ({
  method,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});

export const privateOptions = (method, body) => ({
  method,
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});

export const showSuccessToastify = ({ toast, title, res }) => {
  toast({
    title: `${title || "Acción exitosa"}`,
    description: (res && typeof err === "string") ? res : res?.message || JSON.stringify(res),
    status: 'success',
    duration: 4000,
    isClosable: true,
    position: 'top-center',
  });
};

export const showErrorToastify = ({ toast, title, err }) => {
  toast({
    title: `${title || "Error"}`,
    description: (err && typeof err === "string") ? err : err?.message || JSON.stringify(err),
    status: 'error',
    duration: 4000,
    isClosable: true,
    position: 'top-center',
  });
};

export const showToastify = ({ toast, title, text, type = "info" }) => {
  toast({
    title: `${title || "Info"}`,
    description: `${text || "Descripción"}`,
    status: type,
    duration: 4000,
    isClosable: true,
    position: 'top-center',
  });
};

export const DNI = localStorage.getItem("dni");
export const CLIENTE = localStorage.getItem("cliente");
export const COLOR_CLIENTE = localStorage.getItem("color");