//import liraries
import BookingItem from '@components/BookingItem';
import Container from '@components/common/Container';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { get_my_booking_etablissement } from 'src/feature/booking/booking.service';
import { useBookingStore } from 'src/store/booking.store';
import { useUserStore } from 'src/store/user.store';

// create a component
const MyBookingEtablissementScreen = () => {

    const { user } = useUserStore()
    const { setListBookingEtablissement } = useBookingStore()
    const etablissement_id = user?.account?.id
    const {data: list_booking_etablissement } = useQuery(["List_booking_etablissament", etablissement_id], get_my_booking_etablissement)

    console.log("list_booking_etablissement", list_booking_etablissement)

    return (
        <Container title={"Mes réservations"}>
            <FlatList
                contentContainerStyle={{paddingBottom: 80}}
                showsVerticalScrollIndicator={false}
                data={list_booking_etablissement}
                renderItem={({item}) => <BookingItem item={item} />}
            />
        </Container>
    );
};

//make this component available to the app
export default MyBookingEtablissementScreen;
