//import liraries
import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';
import { LOGIN, SIGNUPSTEP2ETABLISSEMENT, SIGNUPSTEP2PRESTATAIRE } from '@constants/routes';

// create a component
const SignUpScreen = ({navigation}) => {
    const [isSelect, setIsSelect] = useState('etablissement')

    const handleNextStep = () => {
        if(isSelect == 'etablissement'){
            navigation.navigate(SIGNUPSTEP2ETABLISSEMENT)
        }else{
            navigation.navigate(SIGNUPSTEP2PRESTATAIRE)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@assets/images/banner_connexion.png')} 
                style={styles.image_header}
            >
                <Image
                    source={require('@assets/images/logo/Logo-animaccess-sans-fond-blanc.png')} 
                    style={styles.logo} 
                    resizeMode='contain'
                />
                <Text style={styles.text_header}>Inscription</Text>
            </ImageBackground>
            <View style={styles.content}>
                <Text style={styles.text_select_profil}>Vous êtes</Text>
                <View style={styles.row}>
                    <View style = {styles.type_profile_wrapper}>
                        <TouchableOpacity 
                            style={isSelect=="etablissement"?styles.btn_selected:styles.btn_not_selected}
                            onPress={() => setIsSelect('etablissement')}
                        >
                            <Icon 
                                name={'Church'} 
                                color={isSelect == 'etablissement'? colors.WHITE: colors.PRIMARY}
                                size={30}  
                            />
                        </TouchableOpacity>
                        <Text style={styles.text_type_profil}>Etablissement</Text>
                    </View>
                    <View style = {styles.type_profile_wrapper}>
                        <TouchableOpacity 
                            style={isSelect=="prestataire"?styles.btn_selected:styles.btn_not_selected}
                            onPress={() => setIsSelect('prestataire')}
                        >
                            <Icon 
                                name={'Smile'} 
                                color={isSelect == 'prestataire'? colors.WHITE: colors.PRIMARY}
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text_type_profil}>Intervenant</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Button text='Suivant' style={styles.btn_next} onPress={handleNextStep} />
                    <View style={styles.row}>
                        <Text style={styles.footer_text}>Vous avez déjà un compte?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
                            <Text style={styles.text_btn_footer}>Me connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default SignUpScreen;
