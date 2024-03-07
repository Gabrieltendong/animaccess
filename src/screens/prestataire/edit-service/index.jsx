//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { styles } from './styles'
import { useMutation, useQuery } from 'react-query';
import { create_service, get_service, update_service_pretataire } from 'src/feature/service/service.service';
import { useForm, Controller } from 'react-hook-form';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { useUserStore } from 'src/store/user.store';
import Alert from '@components/Alert';
import { useService } from 'src/feature/service/useService';
import AdresseInput from '@components/AdresseInput';

// create a component
const EditServiceScreen = ({navigation, route}) => {

    const { item } = route.params
    const {mutateAsync: updateService, isLoading: isLoadingUpdateService} = useMutation(update_service_pretataire)
    const [type_service, setTypeService] = useState("")
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const {user} = useUserStore()
    const { getListeServicePrestataire } = useService()
    const { refetch: refreshListServicePrestataire } = getListeServicePrestataire(user?.account?.id)
    const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm();
    const [image, setImage] = useState()
  
    // console.log("list listTypeService", listTypeService)
 
    const handleUpdateService = async (data) => {
        const dataForm = new FormData()
        if(image){
            dataForm.append("image", {
                name: image.fileName,
                type: image.type,
                uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
            })
        }
        dataForm.append("boite_postal", data.boite_postal)
        dataForm.append("description", data.description)
        dataForm.append("prestataire", user?.account?.id)
        dataForm.append("price", data.price)
        dataForm.append("longitude", data.longitude)
        dataForm.append("latitude", data.latitude)
        console.log("data", dataForm)
        const res = await updateService({data: dataForm, service_prestataire_id: item.id})
        if(res.service){
            refreshListServicePrestataire()
            setIsVisibleModal(true)
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

    console.log("item?.price", item?.price)

    useEffect(() => {
        reset({
            price: String(item?.price),
            description: item?.description,
            boite_postal: item?.adresse?.boite_postal,
            longitude: item?.adresse?.longitude,
            latitude: item?.adresse?.latitude
        })
    }, [])
  
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            
            <TouchableOpacity 
                style={styles.image_wrapper}
                onPress={handleSelectImage}
            >
                {
                    image?
                    <ImageBackground 
                        source={{uri: image?.uri}} 
                        style={styles.image}
                        imageStyle={styles.image_border}
                    >
                        <View style={styles.btn_edit_image} >
                            <Icon name={"ImagePlus"} color={colors.WHITE} />
                        </View>
                    </ImageBackground>
                    :
                    <ImageBackground 
                        source={{uri: item?.image? item?.image: item?.service?.service?.image}} 
                        style={styles.image}
                        imageStyle={styles.image_border}
                        
                    >
                        <View style={styles.btn_edit_image} >
                            <Icon name={"ImagePlus"} color={colors.WHITE} />
                        </View>
                    </ImageBackground>
                }
            </TouchableOpacity>
            
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <AdresseInput
                        defaultValue={value}
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
                    <TextInput
                        defaultValue={value}
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
                        placeholder='Prix du service / heure'
                        onChangeText={onChange}
                        keyboardType={'number-pad'}
                        // value={value}
                        defaultValue={value}
                    />
                )}
                name='price'
                rules={{required: true}}
            />
            {errors.price && <Text style={styles.error}>Le prix est obligatoire</Text>}
            <Button 
                text='Modifier' 
                onPress={handleSubmit(handleUpdateService)}
                isLoading={isLoadingUpdateService} 
            />
            <Alert
                type={"success"}
                title={"Modification service reussi"}
                subTitle={"Votre service a bien été Modifié "}
                isVisible={isVisibleModal}
                onToggle={handleCloseModal}
            />
        </ScrollView>
    );
};

//make this component available to the app
export default EditServiceScreen;
