import { config } from "services/config";
import { privateOptions, publicOptions } from "utils";

export const getAllOrders = async (q = '') => {
  const url = `${config.URL_API}/pedidos?${q}"`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const getOrder = async (id) => {
  const url = `${config.URL_API}/pedido/${id}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const createOrder = async (data) => {
  const url = `${config.publicOrigin}/pedido`;
  const response = await fetch(url, publicOptions('POST', data));
  const res = await response.json();
  return res;
}