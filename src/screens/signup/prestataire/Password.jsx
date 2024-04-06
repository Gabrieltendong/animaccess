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
import { useUserStore } from 'src/store/user.store';
import { plage_horaires } from '@utils/getPlageHoraire';
import { create_planning } from 'src/feature/booking/booking.service';
import { useMutation } from 'react-query';

const messageSuccess = "Votre compte a bien été crée, Nous vous averons un mail de confirmation dans les 24h une fois votre inscription validé"

// create a component
const PasswordPrestataire = ({navigation, route}) => {

    const { registerData, setRegisterData } = useUserStore()
    const {mutateAsync: signUpPrestataire, isLoading, error, data} = useRegisterPrestataire()
    const {mutateAsync: createPlanning, isLoading: isLoadingCreatePlaning} = useMutation(create_planning)
    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState()
    const [showConfirmPassword, setShowConfirmPassword] = useState()
    const [isVisibleModalSuccess, setIsVisibleModalSuccess] = useState(false)
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [messageError, setMessageError] = useState("")

    const handleRegister = async (data) => {
        const dataForm = new FormData()
        dataForm.append("name", registerData.name)
        dataForm.append("telephone", registerData.telephone)
        dataForm.append("email", registerData.email)
        dataForm.append("lastname", registerData.lastname)
        dataForm.append("password", data.password)
        dataForm.append("longitude", registerData.longitude)
        dataForm.append("latitude", registerData.latitude)
        dataForm.append("boite_postal", registerData.boite_postal)
        dataForm.append("document_file", registerData.file_upload)
        dataForm.append("cni_verso", {
            name: registerData.cni_verso.fileName,
            type: registerData.cni_verso.type,
            uri: Platform.OS === 'ios' ? registerData.cni_verso.uri.replace('file://', '') : registerData.cni_verso.uri,
        })
        dataForm.append("cni_recto", {
            name: registerData.cni_recto.fileName,
            type: registerData.cni_recto.type,
            uri: Platform.OS === 'ios' ? registerData.cni_recto.uri.replace('file://', '') : registerData.cni_recto.uri,
        })
        console.log('data', dataForm)
        const res = await signUpPrestataire(dataForm)
        if(res.error){
            setMessageError(res.error)
            setIsVisibleModalError(true)
        }else{
            const dataCreatePlaning = {
                planning: res?.id_planing,
                plage_horraire: plage_horaires()
            }
            console.log("dataCreatePlaning", dataCreatePlaning)
            const response = await createPlanning(dataCreatePlaning)
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
                    isLoading={isLoading || isLoadingCreatePlaning}
                />
            </ScrollView>
            <Alert 
                type={"success"}
                isVisible={isVisibleModalSuccess}
                title={"Inscription réussi"}
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
