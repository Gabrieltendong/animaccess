import { http } from "@config/httpClient"


export const get_service = async () => {
    try{
        const res = await http.get(`/categorie-serevice/`)
        console.log("res", JSON.stringify(res.data))
        return res.data
    }catch(error){
        console.log('error service', error)
        return error.response.data
    }
}

export const get_list_service_by_categorie = async ({queryKey}) => {
    const [_key, categorie_id] = queryKey
    try{
        const res = await http.get(`/list-service-by-categorie/${categorie_id}/`)
        console.log("res list-service-by-categorie", JSON.stringify(res.data))
        return res.data
    }catch(error){
        console.log('error list-service-by-categorie', error)
        return error.response.data
    }
}

export const get_all_prestataire_service = async () => {
    try{
        const res = await http.get(`/prestataire-service/`)
        console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error ll_prestataire_service', error)
        return error.response.data
    }
}

export const get_prestataire_service = async ({queryKey}) => {
    const [_key, prestataire_id] = queryKey
    try{
        const res = await http.get(`/list-service-prestataire/${prestataire_id}/`)
        console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error prestataire_service', error)
        return error.response.data
    }
}

export const create_service = async (data) => {
    try{
        const res = await http.post(`/prestataire-service/`, data)
        return res.data
    }catch(error){
        console.log('error create_service', error)
        return error.response.data
    }
}

export const search_service = async ({queryKey}) => {
    const [_key, query] = queryKey
    try{
        const res = await http.get(`/search/?q=${query}`)
        return res.data
    }catch(error){
        console.log('error create_service', error)
        return error.response.data
    }
}