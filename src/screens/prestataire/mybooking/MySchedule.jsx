//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {AgendaList, CalendarProvider, WeekCalendar, Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import { styles } from './styles';
import moment from 'moment';
import { colors } from '@themes/index';
import PlageHoraire from '@components/PlageHoraire';
import Empty from '@components/Empty';
import Button from '@components/ui/Button';
import { useUserStore } from 'src/store/user.store';
import { useMutation, useQuery } from 'react-query';
import { create_planning, delete_plage_horraire, get_planning } from 'src/feature/booking/booking.service';
import Icon from '@components/ui/Icon';
import Alert from '@components/Alert';

const days = [
    {
        label: 'Lundi',
        value: "monday"
    },
    {
        label: 'Mardi',
        value: "tuesday"
    },
    {
        label: 'Mercredi',
        value: "wednesday"
    },
    {
        label: 'Jeudi',
        value: "thursday"
    },
    {
        label: 'Vendredi',
        value: "friday"
    },
    {
        label: 'Samedi',
        value: "satuday"
    },
    {
        label: 'Dimanche',
        value: "sunday"
    }
]


// create a component
const MyScheduleScreen = () => {

    const { user } = useUserStore()
    const planning_id = user?.account?.id_planing
    const {mutateAsync: createPlanning, isLoading} = useMutation(create_planning)
    const {mutateAsync: deletePlageHorraire } = useMutation(delete_plage_horraire)
    const { data: list_plannig, refetch } = useQuery(["List_Planning", planning_id], get_planning)
    const [daySelected, setDaySelected] = useState(days[0])
    const [plage_horraire, setPlageHorraire] = useState([])
    const [isVisibleAlert, setIsVisibleAlert] = useState(false)

    // console.log("list_plannig", list_plannig)  

    const addPlageHorraire = () => {
        const hour = {
            heure_debut:"00:00",
            heure_fin :"00:00"
        }

        if(plage_horraire.filter((item) => item.days == daySelected.value).length == 0){
            const initial_plage = {
                days: daySelected.value,
                hours: [hour] 
            }

            setPlageHorraire([...plage_horraire, initial_plage])
        }else{
            const plageHorraire = [...plage_horraire]
            plageHorraire.map((item) => {
                if(item.days == daySelected.value){
                    item.hours.push(hour)
                }
            })
            setPlageHorraire(plageHorraire)
        }
    }

    // console.log("user", JSON.stringify(user))

    const handleSetTime = (time, label, index) => {
        const plageHorraire = [...plage_horraire]
        plageHorraire.map((item) => {
            if(item.days == daySelected.value){
                item.hours[index][label] = time
            } 
        })
        setPlageHorraire(plageHorraire)   
    }

    const handleCreatePlanning = async () => {
        const data = {
            planning: user?.account?.id_planing,
            plage_horraire 
        }
        if(list_plannig.planing_plage_horaire && list_plannig.planing_plage_horaire.length > 0){
            const newPlageHorraire = plage_horraire.filter((item) => {
                console.log("test", item.hours.filter((hour) => !hour.id).length)
                item.hours = item.hours.filter((hour) => !hour.id)
                if(item.hours.length > 0){
                    return item
                } 
                
            })
            data.plage_horraire = newPlageHorraire
            console.log("object", JSON.stringify(data))
            const res = await createPlanning(data)
            if(res.id){
                refetch() 
                setIsVisibleAlert(true)
            } 
        }else{
            const res = await createPlanning(data)
            if(res.id){
                refetch()
                setIsVisibleAlert(true)
            }  
        }
        // console.log("create planning res", res)
    }


    const handleDeletePlageHoraire = async (plage_horraire_id, index) => {
        if(plage_horraire.filter((item) => item.days == daySelected.value && item.hours.filter((hour) =>  hour.id && hour?.id == plage_horraire_id).length>0 ).length > 0){
            const res = await deletePlageHorraire(plage_horraire_id)
            refetch()
        }else{
            console.log("delete")
            const newPlageHorraire = plage_horraire.filter((item) => {
                if(item.days == daySelected.value && item.hours.length>1){
                    item.hours = item.hours.filter((hour, indexHour) => indexHour != index)
                    return item
                }
                if(item.days == daySelected.value && item.hours.length==1){
                    item.hours = item.hours.filter((hour, indexHour) => indexHour != index) 
                }
                return item
                
            })
            setPlageHorraire(newPlageHorraire)
        }
    }

    // console.log("list_plannig?.planing_plage_horaire", JSON.stringify(list_plannig?.planing_plage_horaire))

    useEffect(() => {
        if(list_plannig?.planing_plage_horaire && list_plannig?.planing_plage_horaire.length > 0){
            setPlageHorraire(list_plannig?.planing_plage_horaire)
        }else{
            setPlageHorraire([])
        }
        
    }, [list_plannig])
    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}}> 
            <View style={styles.day_row}>
                {
                    days.map((item, index) => (
                        <TouchableOpacity 
                            onPress={() => setDaySelected(item)}
                            style={[styles.btn_select_day, {backgroundColor: item.value == daySelected.value? colors.PRIMARY: colors.WHITE }]}
                        >
                            <Text 
                                style={[
                                    styles.label_day,
                                    {color: item.value == daySelected.value?colors.WHITE: colors.BLACK}
                                ]}
                            >{item.label.substring(0,3)}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            {
               Array.isArray(plage_horraire) && plage_horraire.filter((item) => item.days == daySelected.value).length == 0 &&
               <Empty title={`Vous n'avez pas de plage horraire ${daySelected.label}`} />
            } 
            {
                Array.isArray(plage_horraire) && plage_horraire.map((item) => {
                    if(item.days == daySelected.value){
                        return item.hours.map((hour, index) => (
                            <PlageHoraire
                                heure_debut={hour.heure_debut}
                                heure_fin={hour.heure_fin}
                                setTime={(time, label) => handleSetTime(time, label, index)}
                                onDelete={() => handleDeletePlageHoraire(hour?.id, index)}
                            />
                        ))
                    }
                })
            }
            <TouchableOpacity style={styles.btn} onPress={addPlageHorraire}>
                <Icon name={"Plus"} color={colors.GRAY} size={20} />
                <Text style={styles.text_btn}>Ajouter</Text>
            </TouchableOpacity>
            <Button 
                text='Enregistrer' 
                onPress={handleCreatePlanning} 
                style={styles.btn_create} 
                isLoading={isLoading}
            />
            <Alert
                type={"success"}
                isVisible={isVisibleAlert}
                title={"Création planning"}
                subTitle={"Votre planning a bien été crée, les établissements peuvent vous contacter sur ces horaires"}
                onToggle={() => setIsVisibleAlert(false)}
            />
        </ScrollView> 
    );
};

//make this component available to the app
export default MyScheduleScreen;
