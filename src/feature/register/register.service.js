import { http } from '@config/httpClient'


export const register_prestataire = async (data) => {
    try{
        const res = await http.post(`/prestataire/`, data)
        console.log("res register prestaire", res)
        return res.data
    }catch(error){
        console.log("error register prestaire", error.response.data)
        return error.response.data
    }
}

export const register_etablissement = async (data) => {
    try{
        const res = await http.post(`/etablissement/`, data, {headers: {"Content-Type": "application/json"}})
        console.log("res register etablissement", res)
        return res.data
    }catch(error){
        console.log("error register etablissement", error.response.data)
        return error.response.data
    }
}