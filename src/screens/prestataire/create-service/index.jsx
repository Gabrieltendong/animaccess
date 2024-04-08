//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { styles } from './styles'
import { useMutation, useQuery } from 'react-query';
import { create_service, get_list_service_by_categorie, get_service } from 'src/feature/service/service.service';
import { useForm, Controller } from 'react-hook-form';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { useUserStore } from 'src/store/user.store';
import Alert from '@components/Alert';
import { useService } from 'src/feature/service/useService';
import { useServiceStore } from 'src/store/service.store';
import { get_all_categorie } from 'src/feature/categorie/categorie.service';
import AdresseInput from '@components/AdresseInput';

// create a component
const CreateServiceScreen = ({navigation}) => {

    const {data: listCategorie, isLoading: isLoadingListCategorie } = useQuery("list_categorie", get_all_categorie)
    const {mutateAsync: createService, isLoading: isLoadingCreateService} = useMutation(create_service)
    const [type_service, setTypeService] = useState("")
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const {user} = useUserStore()
    const { getListeServicePrestataire } = useService()
    const { refetch: refreshListServicePrestataire } = getListeServicePrestataire(user?.account?.id)
    const [selected_categorie_id, setSelectedCategorieId] = useState()
    const {data: listTypeService, isLoading, refetch: refreshListTypeService} = useQuery(["list_service"], get_service)
    const [error_type_service, setErrorTypeService] = useState()
    const { handleSubmit, control, setValue, formState: { errors } } = useForm();
    const [image, setImage] = useState() 
  
    console.log("list listTypeService")
   
    const handleCreateService = async (data) => {
        const dataForm = new FormData()
        const duree_service = []
        duree_service.push({duree: data.duree_service})
        if(image){
            dataForm.append("image", {
                name: image.fileName,
                type: image.type,
                uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
            })
        }
        if(type_service){
             
            dataForm.append("boite_postal", data.boite_postal)
            dataForm.append("description", data.description)
            dataForm.append("prestataire", user?.account?.id)
            dataForm.append("service", type_service)
            dataForm.append("price", data.price)
            dataForm.append("longitude", data.longitude)
            dataForm.append("latitude", data.latitude)
            dataForm.append("distance_zone", data.distance_zone)
            dataForm.append("duree_service", JSON.stringify(duree_service))
            // const dataForm = {
            //     ...data,
            //     service: type_service,
            //     prestataire: user?.account?.id
            // }
            console.log("data", JSON.stringify(dataForm))
            const res = await createService(dataForm)
            // console.log("create service", res)
            if(res.id){
                refreshListServicePrestataire()
                setIsVisibleModal(true)
            }
        }else{
            setErrorTypeService("Vous devez choisir le type de service")
        }
    } 

    const handleSelectImage = async () => {
        const res = await launchImageLibrary()
        if(res.assets){
            setImage(res.assets[0])
        }
    }

    const handleCloseModal = () => {
        setIsVisibleModal(false)
        navigation.goBack()
    }

  
  
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios'? 'padding': 'height'} style={styles.container}>
            <ScrollView  keyboardShouldPersistTaps='always' contentContainerStyle={{paddingBottom: 100}}>
            <SelectDropdown
                buttonStyle={[styles.input_select, {marginTop: 20}]}
                defaultButtonText={"Choisir le type de service"}
                defaultValue={type_service}
                onSelect={(item) => {
                    return {
                        ...setTypeService(item.id),
                        ...setErrorTypeService('')
                    }
                }}
                data={listTypeService?.results}
                buttonTextAfterSelection={(item, index) => {
                    return item.name
                }}
                buttonTextStyle={styles.buttonTextStyle}
                rowTextForSelection={(item, index) => <Text>{item?.name}</Text>}
                renderDropdownIcon={() => <Icon name={"ChevronDown"} color={colors.WHITE}/>}
            />
            {error_type_service && <Text style={styles.error}>{error_type_service}</Text>}
            <TouchableOpacity 
                style={styles.image_wrapper}
                onPress={handleSelectImage}
            >
                {
                    image?
                    <Image source={{uri: image?.uri}} style={styles.image} />
                    :
                    <Icon name={"ImagePlus"} />
                }
                
            </TouchableOpacity>
            
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <AdresseInput 
                        placeholder={"Ville de prestation"}
                        setAdresse={onChange}
                        setLocation={(location) => {
                            setValue("longitude", location.lng)
                            setValue("latitude", location.lat)
                        }}
                    />
                )}
                name='boite_postal'
                rules={{required: true}}
            />
            {errors.boite_postal && <Text style={styles.error}>Vous devez préciser la ville de prestation</Text>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <Input
                        iconName={"Locate"}
                        placeholder="Zone d'intervention en km"
                        onChangeText={onChange}
                        keyboardType={'number-pad'}
                        value={value}
                    />
                )}
                name='distance_zone'
                rules={{required: true}}
            />
            {errors.distance_zone && <Text style={styles.error}>La zone d'intervention est obligatoire</Text>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <Input
                        iconName={"Clock3"}
                        placeholder="Temps de prestations / heure"
                        onChangeText={onChange}
                        keyboardType={'number-pad'}
                        value={value}
                    />
                )}
                name='duree_service'
                rules={{required: true}}
            />
            {errors.duree_service && <Text style={styles.error}>Le temps de prestation est obligatoire</Text>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextInput
                        placeholder='Donnez une description de votre service'
                        onChangeText={onChange}
                        numberOfLines={4}
                        multiline={true}
                        style={styles.text_area}
                        value={value}
                        placeholderTextColor={colors.GRAY}
                    />
                )}
                name='description'
                rules={{required: true}}
            />
            {errors.description && <Text style={styles.error}>La description est obligatoire</Text>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <Input
                        iconName={"Banknote"}
                        placeholder='Prix du service / heure'
                        onChangeText={onChange}
                        keyboardType={'phone-pad'}
                        value={value}
                    />
                )}
                name='price'
                rules={{required: true}}
            />
            {errors.price && <Text style={styles.error}>Le prix est obligatoire</Text>}
            <Button 
                text='Créer le service' 
                onPress={handleSubmit(handleCreateService)}
                isLoading={isLoadingCreateService} 
            />
            <Alert
                type={"success"}
                title={"Création du service réussi"}
                subTitle={"Votre service a bien été crée les etablissements peuvent déjà faire des reservations"}
                isVisible={isVisibleModal}
                onToggle={handleCloseModal}
            />
        </ScrollView>
        </KeyboardAvoidingView>
        
    );
};

//make this component available to the app
export default CreateServiceScreen;
