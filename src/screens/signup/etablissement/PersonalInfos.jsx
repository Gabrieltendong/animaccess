//import liraries
import Input from '@components/ui/Input';
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { styles } from './styles';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';
import { PASSWORD_ETABLISSEMENT } from '@constants/routes';
import { useForm, Controller } from 'react-hook-form';
import { useTypeEtablissement } from 'src/feature/type_etablissement/useTypeEtablissement';
import AdresseInput from '@components/AdresseInput';

// create a component
const PersonalInfosEtablissement = ({navigation}) => {

    const { handleSubmit, control, formState: { errors } } = useForm();
    const {data: listTypeEtablissement, isLoading, isError} = useTypeEtablissement()
    const [type_etablissement, setTypeEtablissement] = useState()
    const [error_type_etablissement, setErrorTypeEtablissement] = useState("")

    const handleNextStep = (data) => {
        if(type_etablissement){
            navigation.navigate(PASSWORD_ETABLISSEMENT, {registerData: {...data, type_etablissement}})
        }else{
            setErrorTypeEtablissement("Vous devez choisir le type de l'etablissement")
        }
    }

    return (
        <KeyboardAvoidingView  style={styles.container}>
            <ImageBackground
                source={require('@assets/images/banner_connexion.png')} 
                style={styles.image_header}
                imageStyle={styles.image_header_border}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="ArrowLeft" color={colors.WHITE} />
                </TouchableOpacity>
                <Text style={styles.header_title}>Informations etablissement</Text>
            </ImageBackground>
            <ScrollView style={styles.content} keyboardShouldPersistTaps='always'>
                <View style={styles.input_select_wrapper}>
                    <SelectDropdown
                        buttonStyle={styles.input_select}
                        defaultButtonText={"Choisir le type de l'etablissement"}
                        defaultValue={type_etablissement}
                        onSelect={(item) => {
                            return {
                                ...setTypeEtablissement(item.id),
                                ...setErrorTypeEtablissement('')
                            }
                        }}
                        data={listTypeEtablissement?.results}
                        buttonTextAfterSelection={(item, index) => {
                            return item.name
                        }}
                        buttonTextStyle={styles.buttonTextStyle}
                        rowTextForSelection={(item, index) => <Text>{item.name}</Text>}
                        renderDropdownIcon={() => <Icon name={"ChevronDown"} color={colors.WHITE}/>}
                    />
                </View>
                {error_type_etablissement && <Text style={styles.error}>{error_type_etablissement}</Text>}
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'Home'} 
                            placeholder={"Nom de l'etablissement"}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='etablissement_name'
                    rules={{ required: true }}
                />
                {errors.etablissement_name && <Text style={styles.error}>Le nom de l'etablissement est obligatoire</Text>}
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
                {errors.boite_postal && <Text style={styles.error}>L'adresse est obligatoire</Text>}
                
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'UserRound'} 
                            placeholder={'Prénom de la personne en charge'}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='name'
                    rules={{ required: true }}
                />
                {errors.name && <Text style={styles.error}>Le prénom du gérant est obligatoire</Text>}
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'Phone'} 
                            placeholder={'Téléphone de la personne en charge'}
                            onChangeText={(value) => onChange(value)}
                            keyboardType={'phone-pad'}
                            value={value}
                        />
                    )}
                    name='telephone'
                    rules={{ required: true }}
                />
                {errors.etablissement_name && <Text style={styles.error}>Le téléphone est obligatoire</Text>}
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input 
                            iconName={'Mail'} 
                            placeholder={'Email'}
                            onChangeText={(value) => onChange(value)}
                            keyboardType='email-address'
                            value={value}
                        />
                    )}
                    name='email'
                    rules={{ required: true }}
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
export default PersonalInfosEtablissement;
