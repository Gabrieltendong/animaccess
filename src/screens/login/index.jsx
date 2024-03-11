//import liraries
import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { styles } from './styles'
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { ETABLISSEMENT_NAVIGATOR, FORGOT_PASSWORD, PRESTATAIRE_NAVIGATOR, SIGNUP } from '@constants/routes';
import { useForm, Controller } from 'react-hook-form';
import { useLogin } from 'src/feature/auth/useLogin';
import Alert from '@components/Alert';
import { useUserStore } from 'src/store/user.store';

// create a component
const LoginScreen = ({navigation}) => {

    const { handleSubmit, control, formState: { errors } } = useForm();
    const { mutateAsync: login, isLoading, isError } = useLogin();
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [showPassword, setShowPassword] = useState()
    const {user, setUser} = useUserStore()

    const handleLogin = async (data) => {
        const res = await login(data)
        console.log("data", data)
        if(res.error){
            setMessageError(res.error)
            setIsVisibleModalError(true)
        }else{
            setUser(res)
            console.log("login", res)
            if(res?.account?.user?.statut == "PRESTATAIRE"){
                navigation.navigate(PRESTATAIRE_NAVIGATOR)
            }
            if(res?.account?.gerant){
                navigation.navigate(ETABLISSEMENT_NAVIGATOR)
            }
        }
    }

    const handleCloseModalError = () => {
        setIsVisibleModalError(false)
    }

    return (
        <ScrollView style={styles.container} >
            <View style={styles.wrapper}>
                <ImageBackground 
                    source={require('@assets/images/banner_connexion.png')} 
                    style={styles.image_header}
                >
                    <Image 
                        source={require('@assets/images/logo/Logo-animaccess-sans-fond-blanc.png')} 
                        style={styles.logo} 
                        resizeMode='contain'
                    />
                    <Text style={styles.text_header}>Connexion</Text>
                </ImageBackground>
                <View style={styles.content}>
                    <Controller
                        control={control}
                        render = {({field: {onChange, value}}) => (
                            <Input 
                                iconName={'UserRound'} 
                                placeholder={'Email'}
                                keyboardType='email-address'
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        )}
                        name='email'
                        rules={{ required: true }}
                    />
                    {errors.email && <Text style={styles.error}>L'email est obligatoire</Text>}
                    <Controller
                        control={control}
                        render = {({field: {onChange, value}}) => (
                            <Input 
                                iconName={'LockKeyhole'} 
                                placeholder={'Mot de passe'}
                                leftIcon={showPassword?"Eye":"EyeOff"}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                secureTextEntry={!showPassword}
                                onPressLeftIcon={() => setShowPassword(!showPassword)}
                            />
                        )}
                        name='password'
                        rules={{ required: true }}
                    />
                    {errors.password && <Text style={styles.error}>Le mot de passe est obligatoire</Text>}
                    <Button 
                        text={'Connexion'} 
                        style={styles.btn} 
                        onPress={handleSubmit(handleLogin)}
                        isLoading={isLoading}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate(FORGOT_PASSWORD)}>
                        <Text style={styles.text_forgot_password}>Mot de passe oublié?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footer_text}>Vous n'avez pas encore de compte?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(SIGNUP)}>
                        <Text style={styles.text_btn_footer}>M'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Alert 
                type={"danger"}
                isVisible={isVisibleModalError}
                title={"Echec de connexion"}
                subTitle={messageError}
                onToggle={handleCloseModalError}
            />
        </ScrollView>
    );
};

//make this component available to the app
export default LoginScreen;
