//import liraries
import { colors } from '@themes/index';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { PASSWORD_PRESTATAIRE, SIGNUP_DOCUMENT } from '@constants/routes';
import { useForm, Controller } from 'react-hook-form';
import AdresseInput from '@components/AdresseInput';

// create a component
const PersonalInfosPrestataire = ({navigation}) => {

    const { handleSubmit, control,setValue, formState: { errors } } = useForm();

    const handleNextStep = (data) => {
        navigation.navigate(PASSWORD_PRESTATAIRE, {registerData: data})
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
                <Text style={styles.header_title}>Informations personnelle</Text>
            </ImageBackground>
            <ScrollView style={styles.content}>
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'UserRound'} 
                            placeholder={"Nom"}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='name'
                    rules={{ required: true }}
                />
                {errors.name && <Text style={styles.error}>Le nom est obligatoire</Text>}
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'UserRound'} 
                            placeholder={"Prénom"}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='lastname'
                    rules={{ required: false }}
                />
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <AdresseInput 
                            placeholder={"Adresse postal"}
                            setAdresse={onChange}
                            setLocation={(location) => {
                                setValue("longitude", location.lng)
                                setValue("latitude", location.lat)
                            }}
                        />     
                    )}
                    name='boite_postal'
                    rules={{ required: true }}
                />
                {errors.boite_postal && <Text style={styles.error}>L'adresse postal est obligatoire</Text>}
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'Phone'} 
                            placeholder={'Téléphone'}
                            keyboardType={'phone-pad'}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='telephone'
                    rules={{ required: true }}
                />
                {errors.telephone && <Text style={styles.error}>Le téléphone est obligatoire</Text>}
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'Mail'} 
                            placeholder={'Email'}
                            keyboardType='email-address'
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='email'
                    rules={{ 
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Adresse email invalide',
                          }
                    }}
                />
                {
                    errors?.email?.type == 'pattern' && <Text style={styles.error}>L'email est invalide</Text>
                }
                {
                    errors?.email?.type == 'required' && <Text style={styles.error}>L'email est obligatoire</Text>
                }
                <Button text='Suivant' style={styles.btn} onPress={handleSubmit(handleNextStep)} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

//make this component available to the app
export default PersonalInfosPrestataire;
