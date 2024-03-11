//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import MenuEditItem from '@components/MenuEditItem';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import { useUserStore } from 'src/store/user.store';
import { useNavigation } from '@react-navigation/native';
import { CHANGE_PASSWORD, EDIT_EMAIL, EDIT_ETABLISSEMENT_NAME, EDIT_NAME, EDIT_PHONE, EDIT_TYPE_ETABLISSEMENT, LOGIN } from '@constants/routes';



// create a component
const MyInfosEtablissement = () => {

    const { user, setUser } = useUserStore()
    const navigation = useNavigation()
    const statut = user?.account?.user?.statut 

    const handleLogout = () => {
        setUser({})
        navigation.navigate("Auth")
    }

    console.log("user----", user)

    return (
        <View style={styles.container}>
            <MenuEditItem 
                title={user?.account?.name} 
                icon={"Home"}
                onPress={() => navigation.navigate(EDIT_ETABLISSEMENT_NAME)}
            />
            <MenuEditItem 
                title={user?.account?.type_etablissement?.name} 
                icon={"Building2"}
                onPress={() => navigation.navigate(EDIT_TYPE_ETABLISSEMENT)}
            />
            <MenuEditItem 
                title={user?.account?.gerant?.name} 
                icon={"UserRound"}
                onPress={() => navigation.navigate(EDIT_NAME)}
            />
            <MenuEditItem 
                title={user?.account?.gerant?.telephone} 
                icon={"Phone"}
                onPress={() => navigation.navigate(EDIT_PHONE)}
            />
            <MenuEditItem 
                title={user?.account?.gerant?.email} 
                icon={"Mail"}
                onPress={() => navigation.navigate(EDIT_EMAIL)} 
            />
            <TouchableOpacity style={styles.btn_password} onPress={() => navigation.navigate(CHANGE_PASSWORD)}>
                <Icon name={"Lock"} color={colors.BLACK} size={18}/>
                <Text style = {styles.text_btn_password}>Modifier mon mot de passe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_logout} onPress={handleLogout}>
                <Icon name={"LogOut"} color={colors.WHITE} />
                <Text style={styles.text_btn_logout}>Deconnexion</Text>
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default MyInfosEtablissement;
