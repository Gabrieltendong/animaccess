//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import { list_services } from 'src/mocks/services';
import BookingItem from '@components/BookingItem';

// create a component
const MyBookingScreen = () => {
    return (
        <Container title={"Mes reservations"}>
            <FlatList
                data={list_services}
                renderItem={BookingItem}
                contentContainerStyle={{paddingBottom: 80}}
            />
        </Container>
    );
};

//make this component available to the app
export default MyBookingScreen;
