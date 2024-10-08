//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
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
const CreateServiceStep1 = ({navigation}) => {

    const {data: listCategorie, isLoading: isLoadingListCategorie } = useQuery("list_categorie", get_all_categorie)
    const {mutateAsync: createService, isLoading: isLoadingCreateService} = useMutation(create_service)
    const [type_service, setTypeService] = useState("")
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const {user} = useUserStore()
    const { getListeServicePrestataire } = useService()
    const { list_service_prestataire } = useServiceStore()
    const [seleted_categorie_id, setSelectedCategorieId] = useState()
    const {data: listTypeService, isLoading, refetch: refreshListTypeService} = useQuery(["Service_by_categorie", seleted_categorie_id], get_service)
    const [error_type_service, setErrorTypeService] = useState()
    const { handleSubmit, control, formState: { errors } } = useForm();
  
    console.log("list listTypeService", listTypeService)
 
    const handleCreateService = async (data) => {
        console.log('object')
        if(type_service){
            const dataForm = {
                ...data,
                service: type_service,
                prestataire: user?.account?.id
            }
            console.log("data", dataForm)
            const res = await createService(dataForm)
            if(res.service){
                getListeServicePrestataire(user?.account?.id)
                setIsVisibleModal(true)
            }
        }else{
            setErrorTypeService("Vous devez choisir le type de service")
        }
    }

    const handleCloseModal = () => {
        setIsVisibleModal(false)
        navigation.goBack()
    }

    useEffect(() => {
        refreshListTypeService()
    }, [seleted_categorie_id])
  
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            
            <SelectDropdown
                buttonStyle={styles.input_select}
                defaultButtonText={"Choisir une catégorie"}
                defaultValue={seleted_categorie_id}
                onSelect={(item) => {
                    return {
                        ...setSelectedCategorieId(item.id)
                    }
                }}
                data={listCategorie?.results}
                buttonTextAfterSelection={(item, index) => {
                    console.log("object", item.name)
                    return item.name
                }}
                buttonTextStyle={styles.buttonTextStyle}
                rowTextForSelection={(item, index) => <Text>{item?.name}</Text>}
                renderDropdownIcon={() => <Icon name={"ChevronDown"} color={colors.WHITE}/>}
            />
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
                data={listTypeService}
                buttonTextAfterSelection={(item, index) => {
                    return item.service.name
                }}
                buttonTextStyle={styles.buttonTextStyle}
                rowTextForSelection={(item, index) => <Text>{item?.service?.name}</Text>}
                renderDropdownIcon={() => <Icon name={"ChevronDown"} color={colors.WHITE}/>}
            />
            {error_type_service && <Text style={styles.error}>{error_type_service}</Text>}
            <TouchableOpacity style={styles.image_wrapper}>
                <Icon name={"ImagePlus"} />
            </TouchableOpacity>
            <AdresseInput placeholder={"Ville de prestation"} />
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
                        placeholder='Prix du service'
                        onChangeText={onChange}
                        keyboardType={'phone-pad'}
                        value={value}
                    />
                )}
                name='price'
                rules={{required: true}}
            />
            {errors.price && <Text style={styles.error}>Le prix est obligatoire</Text>}
            {/* <Button 
                text='Créer le service' 
                onPress={handleSubmit(handleCreateService)}
                isLoading={isLoadingCreateService} 
            /> */}
            <Alert
                type={"success"}
                title={"Création du service réussi"}
                subTitle={"Votre service a bien été crée les etablissements peuvent déjà faire des reservations"}
                isVisible={isVisibleModal}
                onToggle={handleCloseModal}
            />
        </ScrollView>
    );
};

//make this component available to the app
export default CreateServiceStep1;
