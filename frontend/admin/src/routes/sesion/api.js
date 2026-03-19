import { config } from "services/config";
import { privateClientOptions } from "services/helpers";

export const getSesion = async (q = '') => {
  const url = `${config.URL_CLIENT}/sesion?${q}`;
  const response = await fetch(url, privateClientOptions('GET'));
  const data = await response.json();
  return data;
}

export const createSesion = async (body) => {
  const url = `${config.URL_CLIENT}/sesion`;
  const response = await fetch(url, privateClientOptions('POST', body));
  const data = await response.json();
  return data;
}

export const getSesionPedidos = async (id) => {
  const url = `${config.URL_CLIENT}/pedidos/${id}`;
  const response = await fetch(url, privateClientOptions('GET'));
  const data = await response.json();
  return data;
}