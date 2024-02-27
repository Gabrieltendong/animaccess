//import liraries
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { list_services } from 'src/mocks/services';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';

// create a component
const BookingItem = () => {
    return (
        <View style={styles.container}>
            <Image source={list_services[0].image} style={styles.image_wrapper} />
            <View style={styles.content}>
                <Text style={styles.title}>Jacky dep</Text>
                <Text style={styles.sub_title}>comedien</Text>
                <View style = {styles.row}>
                    <Icon name={"Calendar"} color={colors.BLACK} size={16} />
                    <Text style={styles.text_time}>Mecredi 13 mars 2024</Text>
                </View>
                <View style = {styles.row}>
                    <Icon name={"Clock4"} color={colors.BLACK} size={16} />
                    <Text style={styles.text_time}>15h00 - 16h00</Text>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.text_btn}>Voir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

//make this component available to the app
export default BookingItem;
