import { http } from "@config/httpClient"


export const get_service = async ({queryKey}) => {
    const [_key, categorie_id] = queryKey
    try{
        const res = await http.get(`/list-categorie-service-by-categorie/${categorie_id}/`)
        console.log("get liste service", res.data)
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
        return res.data
    }catch(error){
        console.log('error list-service-by-categorie', error)
        return error.response.data
    }
}

export const get_all_prestataire_service = async () => {
    try{
        const res = await http.get(`/prestataire-service/`)
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
        return res.data
    }catch(error){
        console.log('error prestataire_service', error)
        return error.response.data
    }
}

export const create_service = async (data) => {
    console.log("test prestataire service", data)
    try{
        const res = await http.post(`/prestataire-service/`, data)
        console.log("Response", res.data)
        return res.data
    }catch(error){
        console.log('error create_service', error)
        return error.response.data
    }
}

export const update_service_pretataire = async ({data, service_prestataire_id}) => {
    try{
        const res = await http.patch(`/prestataire-service/${service_prestataire_id}/`, data)
        return res.data
    }catch(error){
        console.log('error update_service', error)
        return error.response.data
    }
}

export const delete_service_prestataire = async (service_prestataire_id) => {
    try{
        const res = await http.delete(`/prestataire-service/${service_prestataire_id}/`)
        return res.data
    }catch(error){
        console.log('error delete_service', error.response.data)
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