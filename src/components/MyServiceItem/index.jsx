//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';

// create a component
const MyServiceItem = ({item}) => {
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{uri: item?.service?.service?.image}} 
                style={styles.card_image}
                imageStyle={styles.card_image_border}
            >
                {/* <TouchableOpacity style={styles.btn_favorite}>
                    <Icon name='Heart' color={colors.WHITE} />
                </TouchableOpacity> */}
            </ImageBackground>
            <View style={styles.card_content}>
                <Text style={styles.card_title}>{item?.prestataire?.user?.name} {item?.prestataire?.user?.lastname}</Text>
                <Text style={styles.card_subTitle}>{item?.service?.service?.name}</Text>
                <Text style={styles.price_service}>{item?.price} € <Text style={styles.text_small}>/heure</Text></Text>
            </View>
            <Button text='Modifier' style={styles.btn} />
        </View>
    );
};

//make this component available to the app
export default MyServiceItem;
