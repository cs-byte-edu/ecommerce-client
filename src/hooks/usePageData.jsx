import { useEffect, useMemo } from "react";
import { useBoundStore } from "../store";

// function stableKey(obj) {
//   return Object.keys(obj)
//     .sort()
//     .map((k) => `${k}:${obj[k]}`)
//     .join("|");
// }

export const usePageData = (type, slugOrId, options = {}) => {
  const loadPageData = useBoundStore((s) => s.loadPageData);

  const key = useMemo(() => `${type}-${slugOrId}`, [type, slugOrId]);

  const data = useBoundStore((s) => s.pageCache[key]);
  const loading = useBoundStore((s) => s.pageLoading[key] || false);
  const error = useBoundStore((s) => s.pageErrors[key]);

  useEffect(() => {
    loadPageData(type, slugOrId, options);
  }, [key, loadPageData, type, slugOrId, options]);

  return { data, loading, error };
};
