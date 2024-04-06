//import liraries
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { BOOKING_DETAIL_PRESTATAIRE } from '@constants/routes';
import BookingStatusTag from '@components/BookingStatusTag';

// create a component
const BookingPrestataireItem = ({item, style}) => {

    const navigation = useNavigation()

    return (
        <View style={[styles.container, style]}>
            <Image 
                source={{uri: 
                    item?.prestataire_service?.image?
                    item?.prestataire_service?.image
                    :
                    item?.prestataire_service?.service?.service?.image}} 
                style={styles.image_wrapper} 
            />
            <View style={styles.content}>
                <Text style={styles.title}>{item?.etablissement?.name}</Text>
                <Text style={styles.sub_title}>{item?.etablissement?.gerant?.name}</Text>
                <BookingStatusTag status={item.status_reservation} />
                <View style = {styles.row}>
                    <Icon name={"Calendar"} color={colors.BLACK} size={16} />
                    <Text style={styles.text_time}>{moment(new Date(item?.date_reservation)).format("dddd DD MMMM YYYY")}</Text>
                </View>
                <View style = {styles.row}>
                    <Icon name={"Clock4"} color={colors.BLACK} size={16} />
                    {
                        Array.isArray(item?.plage_horaire) &&
                        <Text style={styles.text_time}>{item?.plage_horaire[0]?.heure_debut.substring(0, 5)} - {item?.plage_horaire[0]?.heure_fin.substring(0, 5)}</Text>
                    }
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(BOOKING_DETAIL_PRESTATAIRE, {item})}>
                    <Text style={styles.text_btn}>Voir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

//make this component available to the app
export default BookingPrestataireItem;
