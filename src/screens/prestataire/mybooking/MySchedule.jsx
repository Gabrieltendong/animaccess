//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import {AgendaList, CalendarProvider, WeekCalendar, Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import { styles } from './styles';
import moment from 'moment';
import { colors } from '@themes/index';
import PlageHoraire from '@components/PlageHoraire';
import Empty from '@components/Empty';
import Button from '@components/ui/Button';
import { useUserStore } from 'src/store/user.store';
import { useMutation, useQuery } from 'react-query';
import { create_planning, delete_plage_horraire, get_list_plage_horaire_status, get_planning } from 'src/feature/booking/booking.service';
import Icon from '@components/ui/Icon';
import Alert from '@components/Alert';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

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
    const prestataire_id = user?.account?.id
    const [date, setDate] = useState(moment().startOf('isoweek').format("YYYY-MM-DD"))
    const [selected_date, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
    const [days, setDays] = useState([])
    const {mutateAsync: createPlanning, isLoading} = useMutation(create_planning)
    const {mutateAsync: deletePlageHorraire } = useMutation(delete_plage_horraire)
    const { data: list_planning, refetch: refretchListPlaning, isLoading: isLoadingListPlaning } = useQuery(["List_Planning", {prestataire_id, selected_date}], get_list_plage_horaire_status)
    // const [daySelected, setDaySelected] = useState(days[0])
    const [plage_horraire, setPlageHorraire] = useState([])
    const [isVisibleAlert, setIsVisibleAlert] = useState(false)
    const [isVisibleAlertError, setIsVisibleAlertError] = useState(false)
    const [message_error, setMessageError] = useState()  
    
  
    console.log("list_plannig", list_planning)  

    // const addPlageHorraire = () => {
    //     const hour = {
    //         heure_debut:"00:00",
    //         heure_fin :"00:00"
    //     }

    //     if(plage_horraire.filter((item) => item.days == daySelected.value).length == 0){
    //         const initial_plage = {
    //             days: daySelected.value,
    //             hours: [hour] 
    //         }

    //         setPlageHorraire([...plage_horraire, initial_plage])
    //     }else{
    //         const plageHorraire = [...plage_horraire]
    //         plageHorraire.map((item) => {
    //             if(item.days == daySelected.value){
    //                 item.hours.push(hour)
    //             }
    //         })
    //         setPlageHorraire(plageHorraire)
    //     }
    // }

    // console.log("user", JSON.stringify(user))

    // const handleSetTime = (time, label, index) => {
    //     const plageHorraire = [...plage_horraire]
    //     plageHorraire.map((item) => {
    //         if(item.days == daySelected.value){
    //             item.hours[index][label] = time
    //         } 
    //     })
    //     setPlageHorraire(plageHorraire)   
    // }

    // const handleCreatePlanning = async () => {
    //     const data = {
    //         planning: user?.account?.id_planing,
    //         plage_horraire 
    //     }
    //     if(list_plannig.planing_plage_horaire && list_plannig.planing_plage_horaire.length > 0){
    //         const newPlageHorraire = plage_horraire.filter((item) => {
    //             item.hours = item.hours.filter((hour) => !hour.id)
    //             if(item.hours.length > 0){
    //                 return item
    //             } 
                
    //         })
    //         data.plage_horraire = newPlageHorraire
    //         const res = await createPlanning(data)
    //         console.log("res create plage", res)
    //         if(res.error){
    //             setMessageError(res.error)
    //             setIsVisibleAlertError(true)
    //         }
    //         if(res.id){
    //             refetch() 
    //             setIsVisibleAlert(true)
    //             setMessageError("")
    //         } 
    //     }else{
    //         const res = await createPlanning(data)
    //         console.log("res create plage", res)
    //         if(res.id){
    //             refetch()
    //             setIsVisibleAlert(true)
    //         }  
    //     }
    //     // console.log("create planning res", res)
    // }


    // const handleDeletePlageHoraire = async (plage_horraire_id, index) => {
    //     if(plage_horraire.filter((item) => item.days == daySelected.value && item.hours.filter((hour) =>  hour.id && hour?.id == plage_horraire_id).length>0 ).length > 0){
    //         const res = await deletePlageHorraire(plage_horraire_id)
    //         refetch()
    //     }else{
    //         console.log("delete")
    //         const newPlageHorraire = plage_horraire.filter((item) => {
    //             if(item.days == daySelected.value && item.hours.length>1){
    //                 item.hours = item.hours.filter((hour, indexHour) => indexHour != index)
    //                 return item
    //             }
    //             if(item.days == daySelected.value && item.hours.length==1){
    //                 item.hours = item.hours.filter((hour, indexHour) => indexHour != index) 
    //             }
    //             return item
                
    //         })
    //         setPlageHorraire(newPlageHorraire)
    //     }
    // }

    // console.log("list_plannig?.planing_plage_horaire", JSON.stringify(list_plannig?.planing_plage_horaire))

    const handleNextWeek = () => {
        setDate(moment(new Date(date)).add(1,'w').format("YYYY-MM-DD"))
        
    }

    const handlePreviousWeek = () => {
        setDate(moment(new Date(date)).add(-1,'w').format("YYYY-MM-DD"))
    }

    const onChangeDate = (date) => {
        setSelectedDate(moment(new Date(date)).format("YYYY-MM-DD"))
        refretchListPlaning()
    }

    useEffect(() => {
        // if(Array(list_plannig) && list_plannig?.length > 0){
        //     setPlageHorraire(list_plannig)
        // }else{
        //     setPlageHorraire([])
        // }
        
    }, [list_planning])

    useEffect(() => {
        const newWeekDays = []
        for(let i=0; i<7; i++){
            newWeekDays.push(moment(new Date(date)).add(i, 'd'))
            setDays(newWeekDays)
        }
    }, [date])
    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}}> 
            <View style={styles.content_calendar}>
                <View style={styles.header_week}>
                    <TouchableOpacity style={styles.btn_row} onPress={handlePreviousWeek}>
                        <ChevronLeft color={colors.WHITE} size={15} />
                    </TouchableOpacity>
                    <Text style={styles.header_month_name}>{moment(new Date(date)).format('MMMM')}</Text>
                    <TouchableOpacity style={styles.btn_row} onPress={handleNextWeek}>
                        <ChevronRight color={colors.WHITE} size={15} />
                    </TouchableOpacity>
                </View>
                <View style={styles.day_wapper}>
                    {
                        days.map((day, index) => (
                            <TouchableOpacity 
                                onPress={() => onChangeDate(day)} 
                                style={[
                                    styles.day_name_wrapper, 
                                    moment(new Date(day)).format("YYYY-MM-DD") == moment(new Date(selected_date)).format("YYYY-MM-DD") &&
                                    styles.day_name_selected
                                ]} 
                                key={index}
                            >
                                <Text style={styles.day_name}>{moment(new Date(day)).format("ddd")}</Text>
                                <Text style={styles.dateStyle}>{moment(new Date(day)).format("DD")}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <ScrollView>
                    {
                        (Array.isArray(list_planning) && list_planning.length == 0 || list_planning?.error) &&
                        <Empty title={`Vous n'avez pas de plage horaire pour ce jour`} />
                    } 
                    {
                        isLoadingListPlaning &&
                        <ActivityIndicator color={colors.BLACK} size={'large'} />
                    }
                    <View style={styles.plage_horaire_wrapper}>
                        {
                            Array.isArray(list_planning) && list_planning.map((plage_horaire, index) => {
                                return(
                                    <View 
                                        key={index} 
                                        disabled={plage_horaire.status_horaire == "OCCUPEE"?true:false} 
                                        style={[styles.plage_horaire,
                                            plage_horaire.status_horaire == "OCCUPEE"?
                                                styles.plage_horaire_busy: styles.plage_horaire_not_busy
                                        ]}
                                    >
                                        <Text 
                                            style={
                                                plage_horaire.status_horaire == "OCCUPEE"?
                                                styles.text_plage_horaire_busy:styles.text_plage_horaire_not_busy
                                            }
                                        >
                                                {plage_horaire.heure_debut.substring(0,5)} - {plage_horaire.heure_fin.substring(0,5)}
                                        </Text>
                                    </View>
                                )
                            })
                        } 
                    </View>
                </ScrollView>
            </View>
            
            <Alert
                type={"success"}
                isVisible={isVisibleAlert}
                title={"Création planning"}
                subTitle={"Votre planning a bien été crée, les établissements peuvent vous contacter sur ces horaires"}
                onToggle={() => setIsVisibleAlert(false)}
            /> 
            <Alert
                type={"danger"}
                isVisible={isVisibleAlertError}
                title={"Erreur création planning"}
                subTitle={message_error}
                onToggle={() => setIsVisibleAlertError(false)}
            />
        </ScrollView> 
    );
};

//make this component available to the app
export default MyScheduleScreen;
