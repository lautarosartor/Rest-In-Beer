import { config } from "services/config";
import { publicOptions } from "utils";

export const createPedido = async (body) => {
  const url = `${config.URL_PUBLIC}/pedido`;
    const response = await fetch(url, publicOptions('POST', body));
    const data = await response.json();
    return data;
}