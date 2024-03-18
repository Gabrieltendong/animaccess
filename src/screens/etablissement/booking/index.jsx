//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import {ExpandableCalendar, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { styles } from './styles';
import Container from '@components/common/Container';
import { useServiceStore } from 'src/store/service.store';
import moment from 'moment';
import 'moment/locale/fr'
import { colors } from '@themes/index';
import '@utils/local-config'
import { create_booking, get_list_plage_horaire_status, get_planning } from 'src/feature/booking/booking.service';
import { useMutation, useQuery } from 'react-query';
import Empty from '@components/Empty';
import Button from '@components/ui/Button';
import { useUserStore } from 'src/store/user.store';
import Alert from '@components/Alert';
import { ETABLISSEMENT_NAVIGATOR } from '@constants/routes';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

moment.locale('fr') 

// create a component
const BookingServiceScreen = ({navigation}) => {

    const { user } = useUserStore()
    const { infos_service } = useServiceStore()
    const prestataire_service_id = infos_service.id
    const { mutateAsync: createBooking, isLoading } = useMutation(create_booking)
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [selected_date, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
    const {data: list_plage_horaire, refetch: refretchListPlageHoraire, isLoading: isLoadingListPlageHoraire} = useQuery(["list_plage_horaire", {prestataire_service_id, selected_date}], get_list_plage_horaire_status)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [selected_plage_horaire, setSelectedPlageHoraire]=useState([])
    const [messageError, setMessageError] = useState()
    const [days, setDays] = useState([])
    

    const onChangeDate = (date) => {
        setSelectedDate(moment(new Date(date)).format("YYYY-MM-DD"))
        refretchListPlageHoraire()
    }

    const handleSelectPlageHoraire = (plage_horaire_id) => {
        let newList = [...selected_plage_horaire]
        if(selected_plage_horaire.includes(plage_horaire_id)){
            newList = selected_plage_horaire.filter((item) => item != plage_horaire_id)
            setSelectedPlageHoraire(newList)
        }else{
            setSelectedPlageHoraire([...selected_plage_horaire, plage_horaire_id])
        }
    }

    const handleCreateBooking = async () => {
        const data = {
            etablissement: user.account.id,
            service: infos_service.id,
            plage_horaire: selected_plage_horaire,
            date_reservation: selected_date
        }
        const res = await createBooking(data)
        console.log("data res", res)
        if(res.id){
            setIsVisible(true)
        }
        if(res.status == false){
            setIsVisibleModalError(true)
            // setMessageError("Cette plage horaire n'est plus disponible, Veuillez choisir une autre plage")
            setMessageError(res.error)
        }
    }

    const handleNextWeek = () => {
        setDate(moment(new Date(date)).add(1,'w').format("YYYY-MM-DD"))
        
    }

    const handlePreviousWeek = () => {
        setDate(moment(new Date(date)).add(-1,'w').format("YYYY-MM-DD"))
    }

    useEffect(() => {
        const newWeekDays = []
        for(let i=0; i<7; i++){
            newWeekDays.push(moment(new Date(date)).add(i, 'd'))
            setDays(newWeekDays)
        }
    }, [date])

    // console.log("list_plage_horaire", list_plage_horaire)

    const handleCloseModal = () => {
        navigation.navigate(ETABLISSEMENT_NAVIGATOR)
        setIsVisible(false)
    }

    return (
        <Container >
            <ScrollView style={styles.container}> 
                <Text style={styles.title}>Vous réservez avec...</Text>
                <View style={styles.header}>
                    <Image 
                        style={styles.avatar}
                        source={{uri: infos_service?.image? infos_service?.image: infos_service?.service?.service?.image}} 
                    />
                    <Text>
                        <Text style={styles.name_prestataire}>{infos_service?.prestataire?.user?.name}</Text>
                        <Text style={styles.name_service}>{'  '}{infos_service?.service?.service?.name}</Text>
                    </Text>
                </View>
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
                    <ScrollView style={{flex: 1}}>
                        {
                            Array.isArray(list_plage_horaire) && list_plage_horaire.length == 0 &&
                            <Empty title={`Aucun plage horaire disponible`} />
                        } 
                        {
                            isLoadingListPlageHoraire &&
                            <ActivityIndicator color={colors.BLACK} size={'large'} />
                        }
                        <View style={styles.plage_horaire_wrapper}> 
                            {
                                Array.isArray(list_plage_horaire) && list_plage_horaire.map((plage_horaire, index) => {
                                    return(
                                        <TouchableOpacity 
                                            key={index} 
                                            onPress={() => handleSelectPlageHoraire(plage_horaire.id)} 
                                            style={[styles.plage_horaire, 
                                                selected_plage_horaire.includes(plage_horaire.id)?
                                                styles.plage_horaire_selected: styles.plage_horaire_busy
                                            ]}
                                        >
                                            <Text 
                                                style={
                                                    selected_plage_horaire.includes(plage_horaire.id)?
                                                    styles.text_plage_horaire_selected:styles.text_plage_horaire_busy
                                                }
                                            >
                                                    {plage_horaire.heure_debut.substring(0,5)} - {plage_horaire.heure_fin.substring(0,5)}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.price_wrapper}>
                    <Text style={styles.text_primary}>Vous avez choisi {selected_plage_horaire.length} planche{selected_plage_horaire.length>1?"s":""} horaire{selected_plage_horaire.length>1?"s":""}</Text>
                    <Text style={styles.price}>{selected_plage_horaire.length*infos_service.price}€</Text>
                </View>
                {
                    selected_plage_horaire.length>0 &&
                    <Button 
                        text='Valider'
                        style={styles.btn}
                        onPress={handleCreateBooking}
                        isLoading={isLoading}
                    />
                }
                <Alert
                    type={"success"}
                    isVisible={isVisible}
                    onToggle={handleCloseModal}
                    title={"Réservation reussi"}
                    subTitle={"Votre réservation a été effectué avec succès, Veuillez suivre le statut de votre réservation dans vos réservation"}
                />
                <Alert
                    type={"danger"}
                    isVisible={isVisibleModalError}
                    onToggle={() => setIsVisibleModalError(false)}
                    title={"Erreur Réservation"}
                    subTitle={messageError}
                />
            </ScrollView>
        </Container>
    );
};

//make this component available to the app
export default BookingServiceScreen;
