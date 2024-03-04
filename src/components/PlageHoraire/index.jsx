//import liraries
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker'

import { styles } from './styles';
import moment from 'moment';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';

// create a component
const PlageHoraire = ({heure_debut, heure_fin, setTime, onDelete}) => {

    const [openHeureDebut, setOpenHeureDebut] = useState(false)
    const [openHeureFin, setOpenHeureFin] = useState(false)

   
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.time_wrapper} >
                    <Text style={styles.label}>De</Text>
                    <TouchableOpacity style={styles.btn_time} onPress={() => setOpenHeureDebut(true)} >
                        <Icon name={"Clock"} color={colors.BLACK} size={18} />
                        <Text style={styles.time}>{heure_debut.substring(0, 5)}</Text>
                        <Icon name={"ChevronDown"} color={colors.BLACK} size={18} />
                    </TouchableOpacity>
                </View>
                <View style={styles.time_wrapper}>
                    <Text style={styles.label} >à</Text>
                    <TouchableOpacity  style={styles.btn_time} onPress={() => setOpenHeureFin(true)}>
                        <Icon name={"Clock"} color={colors.BLACK} size={18} />
                        <Text style={styles.time}>{heure_fin.substring(0, 5)}</Text>
                        <Icon name={"ChevronDown"} color={colors.BLACK} size={18} />
                    </TouchableOpacity> 
                </View>
            </View>
            <TouchableOpacity  style={styles.btn_delete} onPress={onDelete}>
                <Icon name={"Trash2"} color={colors.BLACK} size={18} />
            </TouchableOpacity>
            <DatePicker
                modal
                open={openHeureDebut}
                date={new Date()}
                timeInterval={30}
                mode='time'
                onConfirm={(date) => {
                    console.log("time", date)
                    setOpenHeureDebut(false)
                    setTime(moment(date).format("HH:mm"), 'heure_debut')
                }}
                onCancel={() => {
                    setOpenHeureDebut(false)
                }}
            />
            <DatePicker
                modal
                open={openHeureFin}
                date={new Date()}
                timeInterval={30}
                mode='time'
                onConfirm={(date) => {
                    setOpenHeureFin(false)
                    setTime(moment(date).format("HH:mm"), "heure_fin")
                }}
                onCancel={() => {
                    setOpenHeureFin(false)
                }}
            />
        </View>
    );
};

//make this component available to the app
export default PlageHoraire;
