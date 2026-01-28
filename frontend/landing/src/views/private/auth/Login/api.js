import { config } from "../../../../services/config";
import { publicOptions } from "../../../../utils";

export const login = async (data) => {
  const url = `${config.URL_PUBLIC}/login`
  const response = await fetch(url, publicOptions('POST', data));
  const res = await response.json();
  return res;
}