import { http } from "@config/httpClient"

export const create_planning = async (data) => {
    try{
        const res = await http.post(`/planing-horaire-prestataire/`, data)
        console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error', error)
        return error.response.data
    }
}

export const get_planning = async ({queryKey}) => {
    const [_key, planning_id] = queryKey
    try{
        const res = await http.get(`/planing-prestataire/${planning_id}/`)
        return res.data
    }catch(error){
        return error.response.data
    }
}

export const get_list_plage_horaire_status = async ({queryKey}) => {
    const [_key, {prestataire_id, selected_date}] = queryKey
    try{
        const res = await http.get(`/list-plage-horaire-status/`, {params: {prestataire: prestataire_id, date: selected_date}})
        return res.data
    }catch(error){
        console.log("error plage horaire", error.response.data)
        return error.response.data
    }
}

export const update_planning = async ({queryKey}) => {
    const [_key, {planning_id, data}] = queryKey
    try{
        const res = await http.patch(`/planing-prestataire/${planning_id}/`, data)
        console.log("res", res.data)
        return res.data
    }catch(error){
        // console.log('error', error.response.data)
        return error.response.data
    }
}

export const delete_plage_horraire = async (plage_horraire_id) => {
    try{
        const res = await http.delete(`/plage-horaire/${plage_horraire_id}/`)
        console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error', error.response.data)
        return error.response.data
    }
}



export const get_my_booking_prestataire = async ({queryKey}) => {
    const [_key, prestataire_id] = queryKey
    console.log("prestataire_id", prestataire_id)
    try{
        const res = await http.get(`/list-reservation-prestataire/${prestataire_id}/`)
        // console.log("res", res.data)
        return res.data
    }catch(error){
        // console.log('error', error.response.data)
        return error.response.data
    }
}

export const get_my_booking_etablissement = async ({queryKey}) => {
    const [_key, etablissement_id] = queryKey
    console.log("etablissement_id", etablissement_id)
    try{
        const res = await http.get(`/list-reservation-etablissement/${etablissement_id}/`)
        // console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error', error.response.data)
        return error.response.data
    }
}

export const create_booking = async (data) => {
    console.log("test----------", data)
    try{
        const res = await http.post(`/reservation/`, data)
        console.log("res", res.data)
        return res.data
    }catch(error){
        console.log('error', error)
        return error.response.data
    }
}

export const update_booking = async ({data, reservation_id}) => {
    try{
        const res = await http.patch(`/reservation/${reservation_id}/`, data)
        console.log("res", reservation_id)
        return res.data
    }catch(error){
        console.log('error', error)
        return error.response.data
    }
}

