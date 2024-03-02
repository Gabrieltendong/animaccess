//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import MenuEditItem from '@components/MenuEditItem';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import { useUserStore } from 'src/store/user.store';
import { useNavigation } from '@react-navigation/native';
import { LOGIN } from '@constants/routes';



// create a component
const MyInfosEtablissement = () => {

    const { user, setUser } = useUserStore()
    const navigation = useNavigation()
    const statut = user?.account?.user?.statut 

    const handleLogout = () => {
        setUser({})
        navigation.navigate(LOGIN)
    }

    console.log("user----", user)

    return (
        <View style={styles.container}>
            <MenuEditItem title={user?.account?.name} icon={"Home"} />
            <MenuEditItem title={user?.account?.type_etablissement?.name} icon={"Building2"} />
            <MenuEditItem title={user?.account?.gerant?.name} icon={"UserRound"} />
            <MenuEditItem title={user?.account?.gerant?.telephone} icon={"Phone"} />
            <MenuEditItem title={user?.account?.gerant?.email} icon={"Mail"} />
            <TouchableOpacity style={styles.btn_password}>
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
