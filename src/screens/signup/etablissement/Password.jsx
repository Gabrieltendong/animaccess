//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';

import { styles } from './styles';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { colors } from '@themes/index';

// create a component
const PasswordEtablissement = ({navigation}) => {
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
                <Text style={styles.header_title}>Sécurisez votre compte</Text>
            </ImageBackground>
            <ScrollView style={styles.content}>
                <Input 
                    iconName={'LockKeyhole'} 
                    placeholder={'Mot de passe'}
                    leftIcon={"EyeOff"}
                />
                <Input 
                    iconName={'LockKeyhole'} 
                    placeholder={'Confirmer votre mot de passe'}
                    leftIcon={"EyeOff"}
                />
                <Button text='Créer mon compte' style={styles.btn} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

//make this component available to the app
export default PasswordEtablissement;
