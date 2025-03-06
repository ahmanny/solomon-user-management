import axios from "axios"

console.log("API:", process.env.NEXT_PUBLIC_API_PUBLIC_URL);

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_PUBLIC_URL,
    // cookes are sent with requests if needed
    // withCredentials: true,
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // console.error("error from backend:", error.response.data);
            return Promise.reject(error.response.data);
        }
        console.error("network error:", error.message);
        return Promise.reject({ message: "Network error, plaese try again later" });
    }
);

export default API;