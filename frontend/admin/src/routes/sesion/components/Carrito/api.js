import { config } from "services/config";
import { privateClientOptions } from "services/helpers";

export const createPedido = async (body, idem) => {
  const url = `${config.URL_PUBLIC}/pedido`;
  const response = await fetch(url, privateClientOptions('POST', body, idem));
  const data = await response.json();
  return data;
}