import { config } from "services/config";
import { privateOptions } from "utils";

export const getAllSesiones = async (q = '') => {
  const url = `${config.URL_API}/sesiones?${q}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}