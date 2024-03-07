//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';
import { delete_service_prestataire } from 'src/feature/service/service.service';
import { useMutation } from 'react-query';
import { useService } from 'src/feature/service/useService';
import { useUserStore } from 'src/store/user.store';
import { useNavigation } from '@react-navigation/native';
import { EDIT_SERVICE } from '@constants/routes';

// create a component
const MyServiceItem = ({item}) => {

    const navigation = useNavigation()
    const { getListeServicePrestataire } = useService() 
    const { user } = useUserStore()
    const { refetch } = getListeServicePrestataire(user?.account?.id)
    const { mutateAsync: removeServicePrestataire, isLoading: isLoadingRemoveSevice} = useMutation(delete_service_prestataire)
    
    const onDeleteService = async () => {
        const res = await removeServicePrestataire(item.id)
        refetch() 
     }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{uri: item?.image? item?.image: item?.service?.service?.image}} 
                style={styles.card_image}
                imageStyle={styles.card_image_border}
            >
                {/* <TouchableOpacity style={styles.btn_favorite}>
                    <Icon name='Heart' color={colors.WHITE} />
                </TouchableOpacity> */}
            </ImageBackground>
            <TouchableOpacity 
                style={styles.btn_delete}
                onPress={onDeleteService}
            >
                {
                    isLoadingRemoveSevice?
                    <ActivityIndicator color={colors.WHITE} />
                    :
                    <Icon name={"X"} color={colors.WHITE} />
                }
            </TouchableOpacity>
            <View style={styles.card_content}>
                <Text style={styles.card_title}>{item?.prestataire?.user?.name} {item?.prestataire?.user?.lastname}</Text>
                <Text style={styles.card_subTitle}>{item?.service?.service?.name}</Text>
                <Text style={styles.price_service}>{item?.price} € <Text style={styles.text_small}>/heure</Text></Text>
            </View>
            <Button text='Modifier' style={styles.btn} onPress={() => navigation.navigate(EDIT_SERVICE, {item})} />
        </View>
    );
};

//make this component available to the app
export default MyServiceItem;
