import axios, { type AxiosRequestConfig } from "axios";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem("session-storage");
  if (stored) {
    try {
      const { state } = JSON.parse(stored);
      if (state?.session?.accessToken) {
        config.headers.Authorization = `Bearer ${state.session.accessToken}`;
      }
    } catch {
      // ignore
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const messages: Record<number, string> = {
        400: "Некорректный запрос",
        401: "Необходима авторизация",
        403: "Доступ запрещён",
        404: "Ресурс не найден",
        500: "Ошибка сервера",
      };
      const message = (status && messages[status]) || "Неизвестная ошибка";
      if (status === 401) {
        localStorage.removeItem("session-storage");
      }
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);


export const axiosInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const data = options?.body ? JSON.parse(options.body as string) : undefined;

  const response = await apiClient({
    url,
    method: options?.method as AxiosRequestConfig["method"],
    headers: options?.headers as AxiosRequestConfig["headers"],
    data,
  });

  return response as unknown as Promise<T>;
};
