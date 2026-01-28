import { config } from "services/config";
import { privateOptions } from "utils";

export const getAllTables = async (q = '') => {
  const url = `${config.URL_API}/mesas?${q}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const getTable = async (id) => {
  const url = `${config.URL_API}/mesa/${id}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const createTable = async (data) => {
  const url = `${config.URL_API}/mesa`;
  const response = await fetch(url, privateOptions('POST', data));
  const res = await response.json();
  return res;
}

export const updateTable = async (id, data) => {
  const url = `${config.URL_API}/mesa/${id}`;
  const response = await fetch(url, privateOptions('PUT', data));
  const res = await response.json();
  return res;
}