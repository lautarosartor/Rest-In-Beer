import { config } from "services/config";
import { publicOptions } from "services/helpers";

export const identifyClient = async (data) => {
  const url = `${config.URL_PUBLIC}/identify`
  const response = await fetch(url, publicOptions('POST', data));
  const res = await response.json();
  return res;
}

export const createClient = async (data) => {
  const url = `${config.URL_PUBLIC}/cliente`
  const response = await fetch(url, publicOptions('POST', data));
  const res = await response.json();
  return res;
}