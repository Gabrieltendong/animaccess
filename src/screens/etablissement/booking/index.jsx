//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import {ExpandableCalendar, CalendarProvider} from 'react-native-calendars';
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

moment.locale('fr')

// create a component
const BookingServiceScreen = () => {

    const { user } = useUserStore()
    const { infos_service } = useServiceStore()
    const prestataire_service_id = infos_service.id
    const { mutateAsync: createBooking, isLoading, data } = useMutation(create_booking)
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const {data: list_plage_horaire, refetch: refretchListPlageHoraire, isLoading: isLoadingListPlageHoraire} = useQuery(["list_plage_horaire", {prestataire_service_id, date}], get_list_plage_horaire_status)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [selected_plage_horaire, setSelectedPlageHoraire]=useState([])
    const [messageError, setMessageError] = useState()

    console.log("list_plage_horaire", list_plage_horaire)   
     

    const onChangeDate = (date) => {
        console.log("object")
        setDate(date.dateString)
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
            date_reservation: date
        }
        const res = await createBooking(data)
        if(res.id){
            setIsVisible(true)
        }
        if(res.status == false){
            setIsVisibleModalError(true)
            setMessageError("Cette plage horaire n'est plus disponible, Veuillez choisir une autre plage")
        }
    }

    return (
        <Container >
            <ScrollView style={styles.container}> 
                <Text style={styles.title}>Vous réservez avec...</Text>
                <View style={styles.header}>
                    <Image 
                        style={styles.avatar}
                        source={{uri: infos_service?.service?.service?.image}} 
                    />
                    <Text>
                        <Text style={styles.name_prestataire}>{infos_service?.prestataire?.user?.name}</Text>
                        <Text style={styles.name_service}>{'  '}{infos_service?.service?.service?.name}</Text>
                    </Text>
                </View>
                <View style={styles.content_calendar}>
                    <CalendarProvider
                        date={moment().format("YYYY-MM-DD")}
                        style={{maxHeight: 150}}
                    >
                        <ExpandableCalendar
                            theme={{
                                selectedDayBackgroundColor: colors.PRIMARY,
                                arrowColor: colors.PRIMARY
                            }}
                            renderHeader={(date) => <Text style={styles.monthStyle}>{moment(date).format("MMMM YYYY")}</Text>}
                            enableSwipeMonths
                            initialPosition='closed'
                            onDayPress={onChangeDate}
                            disablePan 
                        />
                    </CalendarProvider>
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
                    onToggle={() => setIsVisible(false)}
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
