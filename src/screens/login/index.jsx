//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { styles } from './styles'
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { ETABLISSEMENT_NAVIGATOR, SIGNUP } from '@constants/routes';

// create a component
const LoginScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.container} >
            <View style={styles.wrapper}>
                <ImageBackground 
                    source={require('@assets/images/banner_connexion.png')} 
                    style={styles.image_header}
                >
                    <Image 
                        source={require('@assets/images/logo/Logo-animaccess-sans-fond-blanc.png')} 
                        style={styles.logo} 
                        resizeMode='contain'
                    />
                    <Text style={styles.text_header}>Connexion</Text>
                </ImageBackground>
                <View style={styles.content}>
                    <Input iconName={'UserRound'} placeholder={'Email'} />
                    <Input iconName={"LockKeyhole"} placeholder={'Mot de passe'} leftIcon={"EyeOff"} />
                    <Button text={'Connexion'} style={styles.btn} onPress={() => navigation.navigate(ETABLISSEMENT_NAVIGATOR)} />
                    <TouchableOpacity>
                        <Text style={styles.text_forgot_password}>Mot de passe oublié?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footer_text}>Vous n'avez pas encore de compte?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(SIGNUP)}>
                        <Text style={styles.text_btn_footer}>M'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

//make this component available to the app
export default LoginScreen;
