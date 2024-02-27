//import liraries
import { colors } from '@themes/index';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { SIGNUP_DOCUMENT } from '@constants/routes';

// create a component
const PersonalInfosPrestataire = ({navigation}) => {
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <ImageBackground
                source={require('@assets/images/banner_connexion.png')} 
                style={styles.image_header}
                imageStyle={styles.image_header_border}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="ArrowLeft" color={colors.WHITE} />
                </TouchableOpacity>
                <Text style={styles.header_title}>Informations personnelle</Text>
            </ImageBackground>
            <ScrollView style={styles.content}>
                <Input iconName={'UserRound'} placeholder={"Nom"} />
                <Input iconName={'UserRound'} placeholder={'Prénom'} />
                <Input iconName={'MapPin'} placeholder={'Adresse postal'} />
                <Input iconName={'Phone'} placeholder={'Téléphone'} keyboardType={'phone-pad'} />
                <Input iconName={'Mail'} placeholder={'Email'} keyboardType='email-address' />
                <Button text='Suivant' style={styles.btn} onPress={() => navigation.navigate(SIGNUP_DOCUMENT)} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

//make this component available to the app
export default PersonalInfosPrestataire;
