import { config } from "services/config";
import { privateClientOptions } from "services/helpers";

export const searchProducts = async (q = '') => {
  const url = `${config.URL_CLIENT}/productos-search?${q}`;
  const response = await fetch(url, privateClientOptions('GET'));
  const data = await response.json();
  return data;
}