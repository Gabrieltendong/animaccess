//import liraries
import React, { Component, useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { styles } from './styles'
import { useMutation, useQuery } from 'react-query';
import { create_service, get_service } from 'src/feature/service/service.service';
import { useForm, Controller } from 'react-hook-form';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { useUserStore } from 'src/store/user.store';
import Alert from '@components/Alert';
import { useService } from 'src/feature/service/useService';
import { useServiceStore } from 'src/store/service.store';

// create a component
const CreateServiceScreen = ({navigation}) => {

    const {data: listTypeService, isLoading} = useQuery("Service", get_service)
    const {mutateAsync: createService, isLoading: isLoadingCreateService} = useMutation(create_service)
    const [type_service, setTypeService] = useState("")
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const {user} = useUserStore()
    const { getListeServicePrestataire } = useService()
    const { list_service_prestataire } = useServiceStore()
    const [error_type_service, setErrorTypeService] = useState()
    const { handleSubmit, control, formState: { errors } } = useForm();
 
 
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
  
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            <SelectDropdown
                buttonStyle={styles.input_select}
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
                    return item.service.name
                }}
                buttonTextStyle={styles.buttonTextStyle}
                rowTextForSelection={(item, index) => <Text>{item?.service?.name}</Text>}
                renderDropdownIcon={() => <Icon name={"ChevronDown"} color={colors.WHITE}/>}
            />
            {error_type_service && <Text style={styles.error}>{error_type_service}</Text>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextInput
                        placeholder='Donner une description de votre service'
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
            <Button 
                text='Créer le service' 
                onPress={handleSubmit(handleCreateService)}
                isLoading={isLoadingCreateService} 
            />
            <Alert
                type={"success"}
                title={"Création service reussi"}
                subTitle={"Votre service a bien été crée les etablissements peuvent déjà faire des reservations"}
                isVisible={isVisibleModal}
                onToggle={handleCloseModal}
            />
        </ScrollView>
    );
};

//make this component available to the app
export default CreateServiceScreen;
