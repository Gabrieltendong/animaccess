//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import {ExpandableCalendar, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import DocumentPicker from 'react-native-document-picker'
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
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { bonCommandHtml } from '@utils/bon-command';

moment.locale('fr') 

// create a component
const BookingServiceScreen = ({navigation}) => {

    const { user } = useUserStore()
    const { infos_service } = useServiceStore()
    const prestataire_id = infos_service?.prestataire?.id
    const { mutateAsync: createBooking, isLoading } = useMutation(create_booking)
    const [date, setDate] = useState(moment().startOf('isoweek').format("YYYY-MM-DD"))
    const [selected_date, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
    const {data: list_plage_horaire, refetch: refretchListPlageHoraire, isLoading: isLoadingListPlageHoraire} = useQuery(["list_plage_horaire", {prestataire_id, selected_date}], get_list_plage_horaire_status)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [selected_plage_horaire, setSelectedPlageHoraire]=useState([])
    const [messageError, setMessageError] = useState()
    const [days, setDays] = useState([])
    

    const onChangeDate = (date) => {
        setSelectedDate(moment(new Date(date)).format("YYYY-MM-DD"))
        refretchListPlageHoraire()
    }

    console.log("infos_service", JSON.stringify(infos_service?.prestataire))

    const formatPlageHoraire = () => {
        return list_plage_horaire.map((horaire) => {
            if(selected_plage_horaire.includes(horaire.id)){
                return horaire.heure_debut.substring(0,5) + "-" + horaire.heure_fin.substring(0,5)
            }
        }).join(" ")
    }

    const  createPDF = async () => {
        const data = {
            name_etablissement: user?.account?.gerant?.name,
            name_prestataire: infos_service?.prestataire?.user?.name + " " + infos_service?.prestataire?.user?.lastname,
            date_reservation: moment(new Date(selected_date)).format("DD MMM YYYY"),
            heure_reservation: formatPlageHoraire(),
            duree: infos_service?.duree_service[0].dure_service,
            service: infos_service?.service?.service?.name,
            contact_prestataire: infos_service?.prestataire?.user?.telephone + "/" + infos_service?.prestataire?.user?.email,
            contact_etablissement: user?.account?.gerant?.telephone + "/" + user?.account?.gerant?.email,
            price: infos_service?.price + "€ / heure"
        }
        let options = {
          html: bonCommandHtml(data),
          fileName: 'bon_de_commande' + moment().format("DD-MM-YYYY"),
          directory: 'Documents',
        };
    
        let file = await RNHTMLtoPDF.convert(options)

        console.log(file);
        return file.filePath
        // alert(file.filePath);
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
        const file_path = await createPDF()
        console.log("file", file_path)
        // const data = {
        //     etablissement: user.account.id,
        //     service: infos_service.id,
        //     plage_horaire: selected_plage_horaire,
        //     date_reservation: selected_date
        // }
        const data = new FormData()
        data.append('etablissement', user.account.id)
        data.append('service', infos_service.id)
        data.append('plage_horaire', JSON.stringify(selected_plage_horaire))
        data.append('date_reservation', selected_date)
        data.append("file", {
            uri: file_path,
            type: DocumentPicker.types.pdf,
            name: 'bon_de_commande' + moment().format("DD-MM-YYYY") + ".pdf",
        })
        const res = await createBooking(data)
        // console.log("data res", res)
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
                            (Array.isArray(list_plage_horaire) && list_plage_horaire.length == 0 || list_plage_horaire?.error) &&
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
                                            disabled={plage_horaire.status_horaire == "OCCUPEE"?true:false} 
                                            style={[styles.plage_horaire,
                                                plage_horaire.status_horaire == "OCCUPEE"?
                                                    styles.plage_horaire_busy:
                                                selected_plage_horaire.includes(plage_horaire.id)?
                                                styles.plage_horaire_selected: styles.plage_horaire_not_busy
                                            ]}
                                        >
                                            <Text 
                                                style={
                                                    plage_horaire.status_horaire == "OCCUPEE"?
                                                    styles.text_plage_horaire_busy:
                                                    selected_plage_horaire.includes(plage_horaire.id)?
                                                    styles.text_plage_horaire_selected:styles.text_plage_horaire_not_busy
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
