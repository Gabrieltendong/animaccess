import { http } from '@config/httpClient'
import { User } from '@interfaces/User'


export const auth = async (data) => {
    console.log("data login", data)
    try{
        const res = await http.post(`/login/`, data)
        return res.data
    }catch(error){
        return {
            status: 401,
            error: "Email ou mot de passe incorrect"
        }
    }
}

export const sent_otp_by_email = async (data) => {
    try{
        const res = await http.post(`/sent-otp-by-email/`, data)
        return res.data
    }catch(error){
        return error.response.data
    }
} 

export const validate_otp = async (data) => {
    try{
        const res = await http.post(`/valide-code/`, data)
        return res.data
    }catch(error){
        return error.response.data
    }
}

export const forgot_password = async (data) => {
    try{
        const res = await http.post(`/fogot-password/`, data)
        console.log("res fogot-password", res.data)
        return res.data
    }catch(error){
        return error.response.data
    }
}

export const reset_password = async (data) => {
    try{
        const res = await http.post(`/reset-password/`, data)
        console.log("res reset-password", res)
        return res.data
    }catch(error){
        return error.response.data
    }
}

export const update_prestataire = async ({data, prestataire_id}) => {
    try{
        const res = await http.patch(`/prestataire/${prestataire_id}/`, data)
        console.log("res update prestataire", res.data)
        return res.data
    }catch(error){
        return error.response.data
    }
}

export const update_etablissement = async ({data, etablissement_id}) => {
    try{
        const res = await http.patch(`/etablissement/${etablissement_id}/`, data)
        console.log("res update etablissment", res.data)
        return res.data
    }catch(error){
        console.log("object", error)
        return error.response.data
    }
}

