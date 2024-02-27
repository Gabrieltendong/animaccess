//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import BookingItem from '@components/BookingItem';

// create a component
const MyBooking = () => {
    return (
        <View style={styles.container}>
           <BookingItem />
           <BookingItem />
           <BookingItem />
           <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>Voir toutes les réservations</Text>
           </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default MyBooking;
