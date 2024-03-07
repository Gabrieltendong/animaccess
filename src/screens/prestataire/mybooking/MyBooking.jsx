//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { list_services } from 'src/mocks/services';
import BookingItem from '@components/BookingItem';
import { useUserStore } from 'src/store/user.store';
import { useQuery } from 'react-query';
import { get_my_booking_prestataire } from 'src/feature/booking/booking.service';
import BookingPrestataireItem from '@components/BookingPrestataireItem';
import { colors } from '@themes/index';

// create a component
const MyBookingScreen = () => {
    const { user } = useUserStore()
    const prestataire_id = user?.account?.id
    const {data: list_booking_pretataire, isLoading, refetch} = useQuery(['List_booking_prestataire', prestataire_id], get_my_booking_prestataire)

    console.log("list_booking_pretataire", list_booking_pretataire)
       
    return (
        <View style={{flex: 1, paddingTop: 20}}>
            {
                isLoading &&
                <ActivityIndicator color={colors.BLACK} size={'large'} />
            }
            {
                Array.isArray(list_booking_pretataire) &&
                <FlatList
                    data={list_booking_pretataire}
                    refreshing={isLoading}
                    onRefresh={() => refetch()}
                    renderItem={({item}) => <BookingPrestataireItem item={item} />}
                    contentContainerStyle={{paddingBottom: 80}}
                />
            }
        </View>
    );
};

//make this component available to the app
export default MyBookingScreen;
