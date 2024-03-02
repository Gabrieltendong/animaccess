import { http } from "@config/httpClient"

export const add_service_to_favorite = async ({data, etablissement_id}) => {
    try{
        const res = await http.patch(`/etablissement/${etablissement_id}/`, data)
        console.log("res add service to favorite", JSON.stringify(res.data))
        return res.data
    }catch(error){
        console.log('error add service to favorite', error)
        return error.response.data
    }
}

export const get_my_favorite = async ({queryKey}) => {
    const [_key, etablissement_id] = queryKey
    try{
        const res = await http.get(`/list-favorie-etablissement/${etablissement_id}/`)
        console.log("res list to favorite", JSON.stringify(res.data))
        return res.data
    }catch(error){
        console.log('error list to favorite', error)
        return error.response.data
    }
}

