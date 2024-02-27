//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import MenuEditItem from '@components/MenuEditItem';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';



// create a component
const MyInfos = () => {
    return (
        <View style={styles.container}>
            <MenuEditItem title={"La crusoé"} icon={"Home"} />
            <MenuEditItem title={"EHPAD"} icon={"Building2"} />
            <MenuEditItem title={"Stephanie Laurient"} icon={"UserRound"} />
            <MenuEditItem title={"0654982154"} icon={"Phone"} />
            <MenuEditItem title={"gabitendong@gmail.com"} icon={"Mail"} />
            <TouchableOpacity style={styles.btn_password}>
                <Icon name={"Lock"} color={colors.BLACK} size={18}/>
                <Text style = {styles.text_btn_password}>Modifier mon mot de passe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_logout}>
                <Icon name={"LogOut"} color={colors.WHITE} />
                <Text style={styles.text_btn_logout}>Deconnexion</Text>
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default MyInfos;
