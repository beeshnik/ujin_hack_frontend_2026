import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const stored = localStorage.getItem('session-storage')
  if (stored) {
    try {
      const { state } = JSON.parse(stored)
      if (state?.session?.accessToken) {
        config.headers.Authorization = `Bearer ${state.session.accessToken}`
      }
    } catch {
      // ignore
    }
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const messages: Record<number, string> = {
        400: 'Некорректный запрос',
        401: 'Необходима авторизация',
        403: 'Доступ запрещён',
        404: 'Ресурс не найден',
        500: 'Ошибка сервера',
      }
      const message = (status && messages[status]) || 'Неизвестная ошибка'
      return Promise.reject(new Error(message))
    }
    return Promise.reject(error)
  },
)
