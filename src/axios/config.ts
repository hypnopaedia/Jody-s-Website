import axios from "axios";

export const BACKEND_URL = 'http://127.0.0.1:8000/api';
// export const BACKEND_URL = '/api/';

export const backend = axios.create({
    baseURL: BACKEND_URL,
    timeout: 3000,
    headers: { 
      phrase: "615d1ba6c1d047606e256dc6a41335d6ac19d89863b95eea2ce7237bfe9400cb",
    }
});
