import { config } from "./config";
import { publicOptions, privateOptions } from "utils";

export const publicOrigin = config.URL_PUBLIC;
export const apiOrigin = config.URL_API;

export const api = {
  auth: {
    async login(data) {
      const response = await fetch(publicOrigin + "/login", publicOptions('POST', data));
      const res = await response.json();
      return res;
    },
    async register(data) {
      const response = await fetch(publicOrigin + "/register", publicOptions('POST', data));
      const res = await response.json();
      return res;
    }
  },

  /* usuarios: {
    async getAllUsers() {
      const response = await fetch(apiOrigin + "/usuarios", privateOptions('GET'));
      const data = await response.json();
      return data;
    },
    async getUser(id) {
      const response = await fetch(apiOrigin + `/usuario/${id}`, privateOptions('GET'));
      const data = await response.json();
      return data;
    },
    async updateUser(id, data) {
      const response = await fetch(apiOrigin + `/usuario/${id}`, privateOptions('PUT', data));
      const res = await response.json();
      return res;
    }
  }, */

  categorias: {
    async getAllCategories() {
      const response = await fetch(apiOrigin + "/categorias", privateOptions('GET'));
      const data = await response.json();
      return data;
    },
  },

  subcategorias: {
    async getSubcategorie(id) {
      const response = await fetch(apiOrigin + `/subcategoria/${id}`, privateOptions('GET'));
      const data = await response.json();
      return data;
    },
  },

  promociones: {
    async getAllPromotions() {
      const response = await fetch(apiOrigin + "/promociones", privateOptions('GET'));
      const data = await response.json();
      return data;
    },
    async getPromotion(id) {
      const response = await fetch(apiOrigin + `/promocion/${id}`, privateOptions('GET'));
      const data = await response.json();
      return data;
    },
    async createPromotion(data) {
      const response = await fetch(apiOrigin + "/promocion", privateOptions('POST', data));
      const res = await response.json();
      return res;
    },
    async updatePromotion(id, data) {
      const response = await fetch(apiOrigin + `/promocion/${id}`, privateOptions('PUT', data));
      const res = await response.json();
      return res;
    }
  },

  clientes: {
    async getAllCustomers() {
      const response = await fetch(apiOrigin + "/clientes", privateOptions('GET'));
      const data = await response.json();
      return data;
    },
    async getCustomer(id) {
      const response = await fetch(apiOrigin + `/cliente/${id}`, privateOptions('GET'));
      const data = await response.json();
      return data;
    }
  }
}

export const getAllSubcategories = async (q = '') => {
  const url = `${apiOrigin}/subcategorias?${q}`;
  const response = await fetch(url, privateOptions('GET'));
  const data = await response.json();
  return data;
}