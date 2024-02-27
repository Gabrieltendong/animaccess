//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { styles } from './styles';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { colors } from '@themes/index';
import { PASSWORD_PRESTATAIRE } from '@constants/routes';

// create a component
const DocumentScreen = ({navigation}) => {

    const pickDocument = async () => {
        const res = await DocumentPicker.pickSingle({type: DocumentPicker.types.pdf})
        console.log("res", res)
    }

    const onTackeCNIRecto = async () => {
        const res = await launchCamera()
    }

    const onTackeCNIVerso = async () => {
        const res = await launchCamera()
        console.log("tacke verso photo", res)
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@assets/images/banner_connexion.png')} 
                style={styles.image_header}
                imageStyle={styles.image_header_border}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="ArrowLeft" color={colors.WHITE} />
                </TouchableOpacity>
                <Text style={styles.header_title}>Document d'identification</Text>
            </ImageBackground>
            <ScrollView style={{padding: 10, height: '80%'}} contentContainerStyle={{paddingBottom: 80}}>
                <TouchableOpacity style = {styles.card_wrapper} onPress={pickDocument}>
                    <Icon name={"Upload"} color={colors.GRAY} />
                    <Text style={styles.text_card}>Ajouter votre document RCPRO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card_wrapper} onPress={onTackeCNIRecto}>
                    <Icon name={"ImagePlus"} color={colors.GRAY} />
                    <Text style={styles.text_card}>Photo CNI recto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card_wrapper} onPress={onTackeCNIVerso}>
                    <Icon name={"ImagePlus"} color={colors.GRAY} />
                    <Text style={styles.text_card}>Photo CNI verso </Text>
                </TouchableOpacity>
                {/* <View style={styles.card_wrapper}>
                    <Icon name={"ImagePlus"} color={colors.GRAY} />
                    <Text style={styles.text_card}>Photo CNI verso </Text>
                </View> */}
                <Button text='Suivant' style={styles.btn} onPress={() => navigation.navigate(PASSWORD_PRESTATAIRE)} />
            </ScrollView>
        </View>
    );
};

//make this component available to the app
export default DocumentScreen;
