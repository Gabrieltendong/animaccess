import { API_URL } from "@env";
import axios from "axios";
import { auth } from "src/feature/auth/auth.service";
import { useLogin } from "src/feature/auth/useLogin";
import { getAuthUser } from "src/store/auth.store";
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

// http.interceptors.response.use( 
//   async response => {
//     const user_session = JSON.parse(await getAuthUser())

//     // const res = await http.post(`/login/`, user_session)
//     // console.log("response axios------", res) 
//     return Promise.resolve(response);
//   }, 
//   error => { 
//      if (error.response.status === 401) {
//       console.log("error resquest 401 ------------")
//      }
//     return Promise.reject(error);
//   }
// );