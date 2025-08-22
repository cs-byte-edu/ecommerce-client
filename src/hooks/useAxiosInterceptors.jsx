// hooks/useAxiosInterceptors.ts
import { useEffect, useRef } from "react";
import { axiosInstance } from "../api/apiClient";
import { useBoundStore } from "../store";

let requestInterceptorId = null;
let responseInterceptorId = null;
let isInterceptorsSetup = false;

const setupInterceptors = () => {
  if (isInterceptorsSetup) return;

  requestInterceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      const token = useBoundStore.getState().token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  responseInterceptorId = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("401 — logout");
        // Отримуємо logout функцію зі store
        const logout = useBoundStore.getState().logout;
        logout();
      }
      return Promise.reject(error);
    }
  );

  isInterceptorsSetup = true;
  console.log("Axios interceptors налаштовано");
};

const cleanupInterceptors = () => {
  if (requestInterceptorId !== null) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
    requestInterceptorId = null;
  }

  if (responseInterceptorId !== null) {
    axiosInstance.interceptors.response.eject(responseInterceptorId);
    responseInterceptorId = null;
  }

  isInterceptorsSetup = false;
  console.log("Axios interceptors очищено");
};

export const useAxiosInterceptors = () => {
  const setupRef = useRef(false);

  useEffect(() => {
    if (!setupRef.current) {
      setupInterceptors();
      setupRef.current = true;
    }

    return () => {
      if (setupRef.current) {
        cleanupInterceptors();
        setupRef.current = false;
      }
    };
  }, []);
};
