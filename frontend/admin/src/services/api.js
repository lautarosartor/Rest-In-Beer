import { privateOptions, publicOptions } from "utils";
import { config } from "./config";

const publicOrigin = config.URL_PUBLIC;
const privateOrigin = config.URL_API;

export const login = async (data) => {
  const response = await fetch(publicOrigin + "/login", publicOptions('POST', data));
  const res = await response.json();
  return res;
}

export const register = async (data) => {
  const response = await fetch(publicOrigin + "/register", publicOptions('POST', data));
  const res = await response.json();
  return res;
}

export const getAllSubcategories = async (q = '') => {
  const url = `${privateOrigin}/subcategorias-all?${q}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}