//import liraries
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { styles } from './styles';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { colors } from '@themes/index';
import Alert from '@components/Alert';
import { LOGIN } from '@constants/routes';
import { useRegisterPrestataire } from 'src/feature/register/useRegister';

const messageSuccess = "Votre compte a bien été crée, Nous vous averons un mail de confirmation dans les 24h une fois votre inscription validé"

// create a component
const PasswordPrestataire = ({navigation, route}) => {

    const { registerData } = route.params
    const {mutateAsync: signUpPrestataire, isLoading, error, data} = useRegisterPrestataire()
    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState()
    const [showConfirmPassword, setShowConfirmPassword] = useState()
    const [isVisibleModalSuccess, setIsVisibleModalSuccess] = useState(false)
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [messageError, setMessageError] = useState("")

    const handleRegister = async (data) => {
        const dataForm = {
            ...registerData,
            password: data.password
        }
        console.log("dataForm", dataForm)
        const res = await signUpPrestataire(dataForm)
        if(res.error){
            setMessageError(res.error)
            setIsVisibleModalError(true)
        }else{
            setIsVisibleModalSuccess(true)
        }
    }

    const handleCloseModalSuccess = () => {
        setIsVisibleModalSuccess(false)
        navigation.navigate(LOGIN)
    }

    const handleCloseModalError = () => {
        setIsVisibleModalError(false)
    }

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <ImageBackground
                source={require('@assets/images/banner_connexion.png')} 
                style={styles.image_header}
                imageStyle={styles.image_header_border}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="ArrowLeft" color={colors.WHITE} />
                </TouchableOpacity>
                <Text style={styles.header_title}>Sécurisez votre compte</Text>
            </ImageBackground>
            <ScrollView style={styles.content}>
            <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            iconName={'LockKeyhole'} 
                            placeholder={'Mot de passe'}
                            leftIcon={showPassword?"Eye":"EyeOff"}
                            secureTextEntry={!showPassword}
                            onPressLeftIcon={() => setShowPassword(!showPassword)}
                        />
                    )}
                    name='password'
                    rules={{ required: true }}
                />
                {errors.password && <Text style={styles.error}>Le mot de passe est obligatoire</Text>}
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            iconName={'LockKeyhole'} 
                            placeholder={'Confirmer votre mot de passe'}
                            leftIcon={showConfirmPassword?"Eye":"EyeOff"}
                            secureTextEntry={!showConfirmPassword}
                            onPressLeftIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    )}
                    name='confirm_password'
                    rules={{ 
                        required: true,
                        validate: (val) => {
                            if (watch('password') != val) {
                              return "Les deux mots de passe ne sont pas identique";
                            }
                          }
                    }}
                />
                {errors.confirm_password?.type == 'validate' && <Text style={styles.error}>Les deux mots de passe ne sont pas identique</Text>}
                {errors.confirm_password?.type == 'required' && <Text style={styles.error}>Ce champ est obligatoire</Text>}
                <Button 
                    text='Créer mon compte' 
                    style={styles.btn} 
                    onPress={handleSubmit(handleRegister)}
                    isLoading={isLoading}
                />
            </ScrollView>
            <Alert 
                type={"success"}
                isVisible={isVisibleModalSuccess}
                title={"Inscription reussi"}
                subTitle={messageSuccess}
                onToggle={handleCloseModalSuccess}
            />
            <Alert 
                type={"danger"}
                isVisible={isVisibleModalError}
                title={"Echec de l'inscription"}
                subTitle={messageError}
                onToggle={handleCloseModalError}
            />
        </KeyboardAvoidingView>
    );
};

//make this component available to the app
export default PasswordPrestataire;
