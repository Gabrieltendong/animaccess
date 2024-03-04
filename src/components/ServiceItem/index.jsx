//import liraries
import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import { useMutation } from 'react-query';
import { add_service_to_favorite } from 'src/feature/favoris/favoris.service';
import { useUserStore } from 'src/store/user.store';
import Alert from '@components/Alert';
import { useNavigation } from '@react-navigation/native';
import { DETAIL_SERVICE } from '@constants/routes';
import { useServiceStore } from 'src/store/service.store';

// create a component
const ServiceItem = ({item}) => {

    const { user } = useUserStore()
    const { setSelectedService } = useServiceStore()
    const {mutateAsync: addServiceToFavorite, isLoading} = useMutation(add_service_to_favorite)
    const [isVisible, setIsVisible] = useState(false)
    const navigation = useNavigation()

    const handleAddServiceToFavorite = async () => {
        const data = {
            etablissement_id: user.account.id,
            data: {favoris_service: [item.id]}
        }
        const res = await addServiceToFavorite(data)
        if(res.id){
            setIsVisible(true)
        }
    }

    const openDetail = () => {
        setSelectedService(item)
        navigation.navigate(DETAIL_SERVICE)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={openDetail} >
            <ImageBackground 
                source={{uri: item?.service?.service?.image}} 
                style={styles.card_image}
                imageStyle={styles.card_image_border}
            >
                <TouchableOpacity style={styles.btn_favorite} onPress={handleAddServiceToFavorite}>
                    <Icon name='Heart' color={colors.WHITE} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.card_content}>
                <Text style={styles.card_title}>{item?.prestataire?.user?.name} {item?.prestataire?.user?.lastname}</Text>
                <Text style={styles.card_subTitle}>{item?.service?.service?.name}</Text>
                <Text style={styles.price_service}>{item.price} € <Text style={styles.text_small}>/heure</Text></Text>
            </View>
            <Alert
                type={"success"}
                isVisible={isVisible}
                title={"Ajout au favoris"}
                subTitle={"Se service a été ajouté a vos favoris"}
                onToggle={() => setIsVisible(false)}
            />
        </TouchableOpacity>
    );
};

//make this component available to the app
export default ServiceItem;
