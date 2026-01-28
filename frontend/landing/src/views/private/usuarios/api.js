import { apiOrigin } from "services/api";
import { privateOptions } from "utils";

export const getAllUsers = async () => {
  const response = await fetch(apiOrigin + "/usuarios", privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const getUser = async (id) => {
  const response = await fetch(apiOrigin + `/usuario/${id}`, privateOptions('GET'));
  const data = await response.json();
  return data;
}

export const updateUser = async (id, data) => {
  const response = await fetch(apiOrigin + `/usuario/${id}`, privateOptions('PUT', data));
  const res = await response.json();
  return res;
}