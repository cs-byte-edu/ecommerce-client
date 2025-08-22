import { useState, useEffect, useRef } from "react";
import api from "../api/apiClient";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await api.get(url, {
          ...options,
          signal: controller.signal,
        });
        setData(response.data);
      } catch (error) {
        if (error.name === "CanceledError") return;

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    abortControllerRef.current?.abort();

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url]);

  return { data, loading, error };
};
