import { useMutation, useQuery } from "react-query"
import { get_prestataire_service } from "./service.service"
import { useServiceStore } from "src/store/service.store"

export const useService = () => {

    const getListeServicePrestataire = (prestataire_id) => {
        return useQuery(["service_prestataire", prestataire_id], get_prestataire_service, {
            onSuccess: (data) => {
                const {setListServicePrestataire} = useServiceStore.getState()
                setListServicePrestataire(data)
            },
            onError: (error) => {

            }
        })
    }

    const createService = () => {
        return useMutation(create_service, {
            onSuccess: (data) => {
                
            },
            onError: (error) => {

            }
        })
    }

    return {
        getListeServicePrestataire,
        createService
    }

}