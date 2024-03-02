import { API_URL } from "@env";
import axios from "axios";
import { useUserStore } from "src/store/user.store";

export const http = axios.create({
    baseURL: API_URL
})

http.interceptors.request.use(
    async config => {
      const user = useUserStore.getState().user
      if(user.access){
        config.headers = { 
            'Authorization': `Bearer ${user.access}`,
          }
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });