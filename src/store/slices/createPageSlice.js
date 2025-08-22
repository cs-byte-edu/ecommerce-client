// import api from "../../api/apiClient";

// function stableKey(obj) {
//   return Object.keys(obj)
//     .sort()
//     .map((k) => `${k}:${obj[k]}`)
//     .join("|");
// }

// store/slices/createPageSlice.js
import { pageService } from "../../api/services/pageService";

export const createPageSlice = (set, get) => ({
  pageCache: {},
  pageLoading: {},
  pageErrors: {},

  getPageState: (key) => {
    const state = get();
    return {
      data: state.pageCache[key],
      loading: state.pageLoading[key] || false,
      error: state.pageErrors[key],
    };
  },

  loadPageData: async (type, slugOrId, options = {}, force = false) => {
    const key = `${type}-${slugOrId}`;
    const state = get();

    if (state.pageLoading[key] && !force) return;
    if (state.pageCache[key] && !force) return state.pageCache[key];

    set((s) => ({
      pageLoading: { ...s.pageLoading, [key]: true },
      pageErrors: { ...s.pageErrors, [key]: null },
    }));

    try {
      let data;
      switch (type) {
        case "dynamic":
          data = await pageService.fetchPage(slugOrId);
          break;
        case "products":
          data = await pageService.fetchCollection("products", options);
          break;
        case "product":
          data = await pageService.fetchSingle("products", slugOrId);
          break;
        case "categories":
          data = await pageService.fetchCollection("categories", options);
          break;
        case "collection":
          data = await pageService.fetchCollection(slugOrId, options);
          break;
        case "collection-item":
          data = await pageService.fetchSingle("products", slugOrId);
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }

      set((s) => ({
        pageCache: { ...s.pageCache, [key]: data },
        pageLoading: { ...s.pageLoading, [key]: false },
      }));

      return data;
    } catch (err) {
      const errorObj = {
        message:
          err.response?.status === 404 ? "Дані не знайдено" : err.message,
        retry: () => get().loadPageData(type, slugOrId, options, true),
      };

      set((s) => ({
        pageLoading: { ...s.pageLoading, [key]: false },
        pageErrors: { ...s.pageErrors, [key]: errorObj },
      }));

      throw err;
    }
  },
});
