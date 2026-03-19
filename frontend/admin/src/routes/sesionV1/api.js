import { config } from "services/config";
import { publicOptions } from "services/helpers";

export const getSesionPedidos = async (id) => {
  const url = `${config.URL_PUBLIC}/pedidos/${id}`;
  const response = await fetch(url, publicOptions('GET'));
  const data = await response.json();
  return data;
}