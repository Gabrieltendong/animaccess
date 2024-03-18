import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import EtablissementNavigator from './etablissement/TabsNavigator';
import PrestataireNavigator from './prestataire/TabsNavigator';
import { BOOKING_DETAIL_PRESTATAIRE, BOOKING_SERVICE, CHANGE_PASSWORD, DETAIL_SERVICE, EDIT_EMAIL, EDIT_ETABLISSEMENT_NAME, EDIT_NAME, EDIT_PHONE, EDIT_TYPE_ETABLISSEMENT, ETABLISSEMENT_NAVIGATOR, HELP, PRESTATAIRE_NAVIGATOR, PROFIL_PRESTATAIRE, WELCOME } from '@constants/routes';
import WelcomeScreen from '@screens/welcome';
import DetailServiceScreen from '@screens/etablissement/detail-service';
import BookingServiceScreen from '@screens/etablissement/booking';
import ChangePasswordScreen from '@screens/change-password';
import EditEmailScreen from '@screens/edit-profile/EditEmail';
import EditNameScreen from '@screens/edit-profile/EditName';
import EditPhoneScreen from '@screens/edit-profile/EditPhone';
import EditEtablissementNameScreen from '@screens/edit-profile/EditEtablissmentName';
import EditTypeEtablissementScreen from '@screens/edit-profile/EditTypeEtablissement';
import { storage, useUserStore } from 'src/store/user.store';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@themes/index';
import BookingPrestataireDetailScreen from '@screens/prestataire/booking-detail';
import HelpScreen from '@screens/help';
import ProfilePrestataireScreen from '@screens/etablissement/profile-prestataire';


const Stack = createNativeStackNavigator();

const Rooter = () => {
    const {setUser} = useUserStore()
    const [statut_user, setStatutUser] = React.useState(null)
    const user_store = storage.getString("user-persist-storage")
    const user = user_store?JSON.parse(user_store):{}
    console.log("user navigation--")


    React.useEffect(() => {
        setUser(user)
        if(user?.account?.user?.statut == "PRESTATAIRE"){
            setStatutUser(user?.account?.user?.statut)
        }
        else if(user?.account?.gerant?.statut == "GERANT_ETABLISSEMENT"){
            setStatutUser(user?.account?.gerant?.statut)
        }else{
            console.log("statut vide")
            setStatutUser("")
        }
    }, []) 

    if(statut_user == null){
        console.log("user in null--------------")
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.PRIMARY} />
            </View>
        )
    }

    console.log("object", statut_user)
    return (
        <Stack.Navigator 
            screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}
            initialRouteName={
                statut_user == "PRESTATAIRE"?
                PRESTATAIRE_NAVIGATOR
                :statut_user == "GERANT_ETABLISSEMENT"?
                ETABLISSEMENT_NAVIGATOR
                :
                WELCOME
            }
        >
            <Stack.Screen name={WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={"Auth"} component={AuthNavigator} />
            <Stack.Screen name={ETABLISSEMENT_NAVIGATOR} component={EtablissementNavigator} />
            <Stack.Screen name={PRESTATAIRE_NAVIGATOR} component={PrestataireNavigator} />
            <Stack.Screen name={DETAIL_SERVICE} component={DetailServiceScreen} />
            <Stack.Screen name={BOOKING_SERVICE} component={BookingServiceScreen} />
            <Stack.Screen name={CHANGE_PASSWORD} component={ChangePasswordScreen} />
            <Stack.Screen name={EDIT_EMAIL} component={EditEmailScreen} />
            <Stack.Screen name={EDIT_NAME} component={EditNameScreen} />
            <Stack.Screen name={EDIT_PHONE} component={EditPhoneScreen} />
            <Stack.Screen name={EDIT_ETABLISSEMENT_NAME} component={EditEtablissementNameScreen} />
            <Stack.Screen name={EDIT_TYPE_ETABLISSEMENT} component={EditTypeEtablissementScreen} />
            <Stack.Screen
                name={BOOKING_DETAIL_PRESTATAIRE} 
                component={BookingPrestataireDetailScreen} 
            />
            <Stack.Screen
                name={HELP} 
                component={HelpScreen} 
            />
            <Stack.Screen
                name={PROFIL_PRESTATAIRE} 
                component={ProfilePrestataireScreen} 
            />
        </Stack.Navigator>
    )
}

export default Rooter


