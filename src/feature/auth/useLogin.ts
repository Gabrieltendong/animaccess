import { useMutation } from 'react-query';
import { auth } from './auth.service';
import { User } from '@interfaces/User';
import { useNavigation } from '@react-navigation/native';
import { ETABLISSEMENT_NAVIGATOR, PRESTATAIRE_NAVIGATOR } from '@constants/routes';

export const useLogin = () => {

    const navigation = useNavigation()

    return useMutation<User, Error, User>(auth, {
        onSuccess: (user) => {
            console.log("user", user)
        },
        onError: (error) => {
            console.log("error", error)
        }
    })

}