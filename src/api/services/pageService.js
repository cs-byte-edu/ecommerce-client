/* 
Strapi 5 вже має чітку й уніфіковану структуру REST API:

Колекції (/api/products, /api/categories, з filters + pagination).

Сингли (/api/products/:id).

Dynamic Pages (якщо у тебе page – то /api/pages/:slug).

Strapi завжди повертає дані у форматі:

{
  "data": [...],
  "meta": { ... }
}

*/

import api from "../apiClient";

export const pageService = {
  fetchCollection: async (collection, params = {}) => {
    const query = new URLSearchParams({ populate: "*", ...params });
    const { data, meta } = (await api.get(`${collection}?${query}`)).data;
    return { data, meta };
  },

  fetchSingle: async (collection, id) => {
    const { data } = (await api.get(`${collection}/${id}?populate=*`)).data;
    return data;
  },

  fetchPage: async (slug) => {
    const { data } = (await api.get(`${slug}`)).data;
    return data;
  },
};
