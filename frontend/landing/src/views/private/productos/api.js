import { config } from "services/config";
import { privateOptions } from "utils";

export const getAllProducts = async (q = '') => {
  const url = `${config.URL_PUBLIC}/productos?${q}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const getProduct = async (id) => {
  const url = `${config.URL_PUBLIC}/producto/${id}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const createProduct = async (data) => {
  const url = `${config.URL_API}/producto`;
  const response = await fetch(url, privateOptions('POST', data));
  const res = await response.json();
  return res;
}

export const updateProduct = async (id, data) => {
  const url = `${config.URL_API}/producto/${id}`;
  const response = await fetch(url, privateOptions('PUT', data));
  const res = await response.json();
  return res;
}