import { config } from "services/config";
import { publicOptions } from "utils";

export const getSesion = async (q = '') => {
  const url = `${config.URL_PUBLIC}/sesion?${q}`;
  const response = await fetch(url, publicOptions('GET'));
  const data = await response.json();
  return data;
}

export const createSesion = async (qr, data) => {
  const url = `${config.URL_PUBLIC}/sesion/${qr}`
  const response = await fetch(url, publicOptions('POST', data));
  const res = await response.json();
  return res;
}

export const deleteSesion = async (id) => {
  const url = `${config.URL_PUBLIC}/sesion/${id}`
  const response = await fetch(url, publicOptions('DELETE'));
  const res = await response.json();
  return res;
}

export const createClient = async (data) => {
  const url = `${config.URL_PUBLIC}/cliente`
  const response = await fetch(url, publicOptions('POST', data));
  const res = await response.json();
  return res;
}