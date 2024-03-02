import { useNavigation } from "@react-navigation/native"
import { useMutation } from "react-query"
import { register_etablissement, register_prestataire } from "./register.service"
import { useModalSuccess } from "src/hooks/useModalSuccess"
import { LOGIN } from "@constants/routes"


export const useRegisterEtablissment = () => {

    return useMutation(register_etablissement, {
        onSuccess: (user) => {
            
        },
        onError: (error) => {
            
            console.log("error", error)
        }
    })

}

export const useRegisterPrestataire = () => {
    return useMutation(register_prestataire, {
        onSuccess: (user) => {
            console.log("prestataire register ", user)
        },
        onError: (error) => {
            console.log("error", error)
        }
    })

}