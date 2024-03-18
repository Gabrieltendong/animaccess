import { useMutation } from 'react-query';
import { auth } from './auth.service';
import { User } from '@interfaces/User';
import { useNavigation } from '@react-navigation/native';
import { ETABLISSEMENT_NAVIGATOR, PRESTATAIRE_NAVIGATOR } from '@constants/routes';
import { setAuthUser } from 'src/store/auth.store';

export const useLogin = () => {

    return useMutation<User, Error, User>(auth, {
        onSuccess: async (user) => {
            console.log("user login", user)
        },
        onError: (error) => {
            console.log("error", error)
        }
    })

}