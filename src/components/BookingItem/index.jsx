//import liraries
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { BOOKING_DETAIL } from '@constants/routes';

// create a component
const BookingItem = ({item}) => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Image source={{uri: item?.prestataire_service?.image?item?.prestataire_service?.image:item?.prestataire_service?.service?.service?.image}} style={styles.image_wrapper} />
            <View style={styles.content}>
                <Text style={styles.title}>{item?.prestataire_service?.prestataire?.user?.name} {item?.prestataire_service?.prestataire?.user?.lastname}</Text>
                <Text style={styles.sub_title}>{item?.prestataire_service?.service?.service?.name}</Text>
                <View style = {styles.row}>
                    <Icon name={"Calendar"} color={colors.BLACK} size={16} />
                    <Text style={styles.text_time}>{moment(new Date(item?.date_reservation)).format("dddd DD MMMM YYYY")}</Text>
                </View>
                <View style = {styles.row}>
                    <Icon name={"Clock4"} color={colors.BLACK} size={16} />
                    {
                        Array.isArray(item?.plage_horaire) &&
                        <Text style={styles.text_time}>{item?.plage_horaire[0].heure_debut.substring(0, 5)} - {item?.plage_horaire[0].heure_fin.substring(0, 5)}</Text>
                    }
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(BOOKING_DETAIL, {item})} style={styles.btn}>
                    <Text style={styles.text_btn}>Voir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

//make this component available to the app
export default BookingItem;
