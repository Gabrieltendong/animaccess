//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import BookingItem from '@components/BookingItem';
import { useBookingStore } from 'src/store/booking.store';
import { useNavigation } from '@react-navigation/native';
import { MYBOOKING_ETABLISSEMENT } from '@constants/routes';
import Empty from '@components/Empty';

// create a component
const MyBooking = () => {

    const navigation = useNavigation()
    const { list_booking_etablissment } = useBookingStore()

    return (
        <View style={styles.container}>
           {
               Array.isArray(list_booking_etablissment) && list_booking_etablissment.slice(0, 3).map((item) => (
                    <BookingItem item={item} />
                ))
           }
           {
            Array.isArray(list_booking_etablissment) && list_booking_etablissment.length>0?
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(MYBOOKING_ETABLISSEMENT)}>
                <Text style={styles.text_btn}>Voir toutes les réservations</Text>
            </TouchableOpacity>
            :
            <Empty title={"Vous n'avez pas de réservation"}/>
           }
           
        </View>
    );
};

//make this component available to the app
export default MyBooking;
