import { http } from '@config/httpClient'
import { User } from '@interfaces/User'


export const auth = async (data: User) => {
    try{

        const res = await http.post(`/login/`, data)
        console.log("res login", res)
        return res.data

    }catch(error){
        return {
            status: 401,
            error: "Email ou mot de passe incorrect"
        }
    }
}