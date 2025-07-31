


import axios from "axios";


const axiosInstance = axios.create({
   baseURL: "https://fakestoreapi.in/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Inject token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Handle 401 unauthorized globally
const logOut = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    window.location.href = "/";
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // logOut();
    }
    return Promise.reject(error);
  }
);

interface ApiRequestOptions {
  method?: string;
  data?: unknown;
  headers?: Record<string, string>;
}

const makeApiRequest = async (url: string, options: ApiRequestOptions = {}) => {
  const { method = "GET", data = null, headers = {} } = options;

  try {
    const response = await axiosInstance({
      url,
      method: method.toLowerCase(),
      ...(data ? { data } : {}),
      headers,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data);
      return Promise.reject(error.response.data);
    } else {
      console.error("Unexpected Error:", error);
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
};

export default makeApiRequest;
