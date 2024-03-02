import { http } from '@config/httpClient'


export const get_type_etablissement = async () => {
    try{
        const res = await http.get(`/type-etablissement/`)
        return res.data
    }catch(error){
        return {
            status: 404,
            error: "Une erreur s'est produit veuillez reéssayer plutart"
        }
    }
}