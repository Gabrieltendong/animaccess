//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import BookingItem from '@components/BookingItem';
import { useBookingStore } from 'src/store/booking.store';

// create a component
const MyBooking = () => {

    const { list_booking_etablissment } = useBookingStore()

    return (
        <View style={styles.container}>
           {
               Array.isArray(list_booking_etablissment) && list_booking_etablissment.slice(0, 3).map((item) => (
                    <BookingItem item={item} />
                ))
           }
           
           <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>Voir toutes les réservations</Text>
           </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default MyBooking;
