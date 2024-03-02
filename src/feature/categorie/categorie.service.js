import { http } from "@config/httpClient"

export const get_all_categorie = async () => {
    try{
        const res = await http.get(`/categorie/`)
        console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error', error)
        return error.response.data
    }
}