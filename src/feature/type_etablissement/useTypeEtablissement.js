import { useQuery } from "react-query"
import { get_type_etablissement } from "./type_etablissement.service"


export const useTypeEtablissement = () => {
    return useQuery("type-etablissement", get_type_etablissement)
}