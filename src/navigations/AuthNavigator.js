import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CHANGE_PASSWORD, FORGOT_PASSWORD, LOGIN, PASSWORD_ETABLISSEMENT, PASSWORD_PRESTATAIRE, RESET_PASSWORD, SIGNUP, SIGNUPSTEP2, SIGNUPSTEP2ETABLISSEMENT, SIGNUPSTEP2PRESTATAIRE, SIGNUP_DOCUMENT, VALIDATE_OTP } from '@constants/routes';
import LoginScreen from '@screens/login';
import SignUpScreen from '@screens/signup';
import ForgotPasswordScreen from '@screens/forgot-password';
import PersonalInfosEtablissement from '@screens/signup/etablissement/PersonalInfos';
import PersonalInfosPrestataire from '@screens/signup/prestataire/PersonalInfos';
import PasswordEtablissement from '@screens/signup/etablissement/Password';
import DocumentScreen from '@screens/signup/prestataire/Document';
import PasswordPrestataire from '@screens/signup/prestataire/Password';
import ValidateOtpScreen from '@screens/validate-otp';
import ResetPasswordScreen from '@screens/reset-password';


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
        <Stack.Screen name={VALIDATE_OTP} component={ValidateOtpScreen} />
        <Stack.Screen name={RESET_PASSWORD} component={ResetPasswordScreen} />
    </Stack.Navigator>
)

export default AuthNavigator
