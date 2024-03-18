import { http } from "@config/httpClient"

export const create_sav = async (data) => {
    try{
        const res = await http.post(`/sav/`, data)
        console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error', error.response.data)
        return error.response.data
    }
}