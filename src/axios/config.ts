import axios from "axios";
import { BACKEND_URL, PHRASE } from "./constants";

export const backend = axios.create({
    baseURL: BACKEND_URL,
    timeout: 3000,
    headers: { 
      phrase: PHRASE,
    }
});
