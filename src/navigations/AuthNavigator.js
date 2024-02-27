import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FORGOT_PASSWORD, LOGIN, PASSWORD_ETABLISSEMENT, PASSWORD_PRESTATAIRE, SIGNUP, SIGNUPSTEP2, SIGNUPSTEP2ETABLISSEMENT, SIGNUPSTEP2PRESTATAIRE, SIGNUP_DOCUMENT } from '@constants/routes';
import LoginScreen from '@screens/login';
import SignUpScreen from '@screens/signup';
import ForgotPasswordScreen from '@screens/forgot-password';
import PersonalInfosEtablissement from '@screens/signup/etablissement/PersonalInfos';
import PersonalInfosPrestataire from '@screens/signup/prestataire/PersonalInfos';
import PasswordEtablissement from '@screens/signup/etablissement/Password';
import DocumentScreen from '@screens/signup/prestataire/Document';
import PasswordPrestataire from '@screens/signup/prestataire/Password';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
        <Stack.Screen name={LOGIN} component={LoginScreen} />
        <Stack.Screen name={SIGNUP} component={SignUpScreen} />
        <Stack.Screen name={SIGNUPSTEP2ETABLISSEMENT} component={PersonalInfosEtablissement} />
        <Stack.Screen name={SIGNUPSTEP2PRESTATAIRE} component={PersonalInfosPrestataire} />
        <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
        <Stack.Screen name={PASSWORD_ETABLISSEMENT} component={PasswordEtablissement} />
        <Stack.Screen name={PASSWORD_PRESTATAIRE} component={PasswordPrestataire} />
        <Stack.Screen name={SIGNUP_DOCUMENT} component={DocumentScreen} />
    </Stack.Navigator>
)

export default AuthNavigator
