//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import BookingItem from '@components/BookingItem';
import Help from '@components/Help';
import { useUserStore } from 'src/store/user.store';

// create a component
const HomeScreen = () => {

    const { user } = useUserStore()

    return (
        <Container title={`Bonjour ${user?.account?.user?.name} !`}>
            <View style={styles.container}>
                <ScrollView style={styles.content} horizontal={true}>
                    <BookingItem />
                    <BookingItem />
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Help />
            </View>
        </Container>
    );
};

//make this component available to the app
export default HomeScreen;
