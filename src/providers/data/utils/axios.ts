import axios from "axios"
const JWT_TOKEN_KEY = "refine-user";

const axiosInstance = axios.create({
  //baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})

axiosInstance.interceptors.request.use((config) => {
  const stringifiedToken = localStorage.getItem(JWT_TOKEN_KEY)
  if (stringifiedToken) {
    const token = JSON.parse(stringifiedToken)
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export {axiosInstance}