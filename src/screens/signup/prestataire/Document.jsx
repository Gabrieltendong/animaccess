//import liraries
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { styles } from './styles';
import Icon from '@components/ui/Icon';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { colors } from '@themes/index';
import { PASSWORD_PRESTATAIRE } from '@constants/routes';

// create a component
const DocumentScreen = ({navigation, route}) => {

    const { registerData } = route.params
    const [cni_verso, setcni_verso] = useState()
    const [cni_recto, setcni_recto] = useState()

    const pickDocument = async () => {
        const res = await DocumentPicker.pickSingle({type: DocumentPicker.types.pdf})
        console.log("res", res)
    }

    const onTackeCNIRecto = async () => {
        const res = await launchCamera()
        if(res.assets){
            setcni_recto(res.assets[0])
        }
    }

    const onTackeCNIVerso = async () => {
        const res = await launchCamera()
        if(res.assets){
            setcni_verso(res.assets[0])
        }
    }

    const handleNextStep = () => {
        const data = {
            ...registerData,
            cni_recto,
            cni_verso
        }
        navigation.navigate(PASSWORD_PRESTATAIRE, {registerData: data})
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
                {/* <TouchableOpacity style = {styles.card_wrapper} onPress={pickDocument}>
                    <View style={styles.card_center}>
                        <Icon name={"Upload"} color={colors.GRAY} />
                        <Text style={styles.text_card}>Ajouter votre document RCPRO</Text>
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.card_wrapper} onPress={onTackeCNIRecto}>
                    {
                        cni_recto?.uri?
                        <Image source={{uri: cni_recto?.uri}} style={styles.image_cni} />
                        :
                        <View style={styles.card_center}>
                            <Icon name={"ImagePlus"} color={colors.GRAY} />
                            <Text style={styles.text_card}>Photo CNI recto</Text>
                        </View>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.card_wrapper} onPress={onTackeCNIVerso}>
                    {
                        cni_verso?.uri?
                        <Image source={{uri: cni_verso?.uri}} style={styles.image_cni} />
                        :
                        <View style={styles.card_center}>
                            <Icon name={"ImagePlus"} color={colors.GRAY} />
                            <Text style={styles.text_card}>Photo CNI verso </Text>
                        </View>
                    }
                </TouchableOpacity>
                {/* <View style={styles.card_wrapper}>
                    <Icon name={"ImagePlus"} color={colors.GRAY} />
                    <Text style={styles.text_card}>Photo CNI verso </Text>
                </View> */}
                <Button text='Suivant' style={styles.btn} onPress={handleNextStep} />
            </ScrollView>
        </View>
    );
};

//make this component available to the app
export default DocumentScreen;
