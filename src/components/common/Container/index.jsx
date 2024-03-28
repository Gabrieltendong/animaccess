//import liraries
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { colors } from '@themes/index';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// create a component
const Container = ({children, title, showBackButton}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor={colors.PRIMARY} />
            <View style={styles.header}>
                <ImageBackground 
                    source={require('@assets/images/banner_accueil.png')} 
                    style={styles.logo_wrapper}
                    imageStyle={styles.image_header_border}
                >
                    {
                        showBackButton && 
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_btn}>
                            <ChevronLeft color={colors.PRIMARY} />
                        </TouchableOpacity>
                    }
                    <Image 
                      source={require('@assets/images/logo/Logo-animaccess-sans-soustexte.png')}
                      style={styles.logo}
                      resizeMode='contain'
                    />
                </ImageBackground>
            </View>
            {
                title && <Text style={styles.text_header}>{title}</Text>
            }
            <View style={styles.content}>
            {children}
            </View>
        </View>
    );
};

//make this component available to the app
export default Container;
