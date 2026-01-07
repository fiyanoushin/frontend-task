import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
})

const PUBLIC_URLS = ["login/", "register/", "token/refresh/"]

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access")

  const isPublic = PUBLIC_URLS.some((url) =>
    config.url?.includes(url)
  )

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const refresh = localStorage.getItem("refresh")

        const res = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          { refresh }
        )

        localStorage.setItem("access", res.data.access)

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`

        return api(originalRequest)
      } catch {
        
        localStorage.clear()
        window.location.href = "/"
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default api
