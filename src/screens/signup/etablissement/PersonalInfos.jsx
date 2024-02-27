//import liraries
import Input from '@components/ui/Input';
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from './styles';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';
import { PASSWORD_ETABLISSEMENT } from '@constants/routes';

// create a component
const PersonalInfosEtablissement = ({navigation}) => {

    const [typeEtablissement, setTypeEtablissement] = useState("football")

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
                <View style={styles.input_select_wrapper}>
                    <RNPickerSelect
                        style={{
                            inputAndroid: styles.input_select,
                            inputIOS: styles.input_select_ios,
                            inputAndroidContainer: {borderRadius: 20},
                            iconContainer: styles.icon_input_select
                        }}
                        value={typeEtablissement}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                        Icon={() => <Icon name={"ChevronDown"} color={colors.WHITE}/>}
                    />
                </View>
                <Input iconName={'Home'} placeholder={"Nom de l'etablissement"} />
                <Input iconName={'MapPin'} placeholder={'Adresse postal'} />
                <Input iconName={'UserRound'} placeholder={'Prénom de la personne en charge'} />
                <Input iconName={'Phone'} placeholder={'Téléphone de la personne en charge'} keyboardType={'phone-pad'} />
                <Input iconName={'Mail'} placeholder={'Email'} keyboardType='email-address' />
                <Button text='Suivant' style={styles.btn} onPress={() => navigation.navigate(PASSWORD_ETABLISSEMENT)} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

//make this component available to the app
export default PersonalInfosEtablissement;
