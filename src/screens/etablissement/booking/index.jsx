import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { ExpandableCalendar, CalendarProvider, WeekCalendar } from 'react-native-calendars';
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

const BookingServiceScreen = ({ navigation }) => {

    const { user } = useUserStore()
    const { infos_service } = useServiceStore()
    const prestataire_id = infos_service?.prestataire?.id
    const { mutateAsync: createBooking, isLoading } = useMutation(create_booking)
    const [date, setDate] = useState(moment().startOf('isoweek').format("YYYY-MM-DD"))
    const [selected_date, setSelectedDate] = useState(moment().format("YYYY-MM-DD"))
    const { data: list_plage_horaire, refetch: refretchListPlageHoraire, isLoading: isLoadingListPlageHoraire } = useQuery(["list_plage_horaire", { prestataire_id, selected_date }], get_list_plage_horaire_status)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [selected_plage_horaire, setSelectedPlageHoraire] = useState([])
    const [messageError, setMessageError] = useState()
    const [days, setDays] = useState([])
    const [scrollViewWidth, setScrollViewWidth] = useState(0);
    const months = moment.months();
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const yearScrollViewRef = useRef(null);
    const [years, setYears] = useState([]);

    const onChangeDate = (date) => {
        setSelectedDate(moment(new Date(date)).format("YYYY-MM-DD"))
        refretchListPlageHoraire()
        setSelectedPlageHoraire([])
    }

    const formatPlageHoraire = () => {
        return list_plage_horaire.map((horaire) => {
            if (selected_plage_horaire.includes(horaire.id)) {
                return horaire.heure_debut.substring(0, 5) + "-" + horaire.heure_fin.substring(0, 5)
            }
        }).join(" ")
    }

    const createPDF = async () => {
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
        return file.filePath
        // alert(file.filePath);
    }

    const handleSelectPlageHoraire = async (plage_horaire) => {
        const serviceDuree = parseInt(infos_service?.duree_service[0]?.dure_service);
        if (selected_plage_horaire.includes(plage_horaire.id)) {
            newList = selected_plage_horaire.filter((item) => item != plage_horaire.id)
            setSelectedPlageHoraire([])
        } else {
            if (serviceDuree > 1 && serviceDuree != selected_plage_horaire.length) {

                const plageIndex = list_plage_horaire.findIndex(plage => plage.id === plage_horaire.id);
                const plagesNecessaires = list_plage_horaire.slice(plageIndex, plageIndex + serviceDuree);
                const plagesDisponibles = plagesNecessaires.every(plage => plage.status_horaire != "OCCUPEE");

                if (plagesDisponibles) {
                    const newList = [...selected_plage_horaire, ...plagesNecessaires.map(plage => plage.id)];
                    setSelectedPlageHoraire(newList);
                } else {
                    setMessageError(`Ce service dure ${serviceDuree}h. \nVous devez sélectionner ${serviceDuree} plages horaires qui se suivent`);
                    setIsVisibleModalError(true)
                }
            } else {
                setMessageError(`Vous ne pouvez selectionner que ${serviceDuree} plage horaires`)
                setIsVisibleModalError(true)
            }
        }
    };

    const handleCreateBooking = async () => {
        const file_path = await createPDF()
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
        const plage_horaires = list_plage_horaire.filter((item) => selected_plage_horaire.includes(item.id))
        console.log("plage_horaires", plage_horaires)
        let isNotValidPlageHoraire = false

        if (moment(selected_date).isBefore(moment().format("YYYY-MM-DD"))) {
            setMessageError("Vous ne pouvez pas effectuer de réservation pour une date passée.");
            setIsVisibleModalError(true);
            return; // Arrête l'exécution de la fonction ici
        }

        if (plage_horaires.length > 1) {
            for (let i = 0; i < plage_horaires.length; i++) {
                if (plage_horaires[i] && plage_horaires[i + 1] && Math.abs(parseInt(plage_horaires[i + 1].heure_fin.substring(0, 2)) - parseInt(plage_horaires[i].heure_fin.substring(0, 2))) > 1) {
                    isNotValidPlageHoraire = true
                }
            }
        }
        if (isNotValidPlageHoraire) {
            setMessageError("Les plages horaires ne sont pas valide, vous devez choisir les plages horaires qui se suivent")
            setIsVisibleModalError(true)
        } else {
            const res = await createBooking(data)
            console.log("data res", res)
            if (res.id) {
                setIsVisible(true)
            }
            if (res.status == false) {
                setIsVisibleModalError(true)
                setMessageError("Vous avez déjà réservé une de ces plages horaires")
                // setMessageError(res.error)
            }
        }

    }

    useEffect(() => {
        const startOfMonth = moment(date).startOf('month');
        const endOfMonth = moment(date).endOf('month');
        const dayCount = endOfMonth.diff(startOfMonth, 'days') + 1; // Inclure le dernier jour
        const allDaysOfMonth = [];

        for (let i = 0; i < dayCount; i++) {
            allDaysOfMonth.push(moment(startOfMonth).add(i, 'days'));
        }

        setDays(allDaysOfMonth);
    }, [date]);


    const handleCloseModal = () => {
        navigation.navigate(ETABLISSEMENT_NAVIGATOR)
        setIsVisible(false)
    }

    const dayWidth = 40; // Incluant les marges
    const dayMargin = 10;

    const selectedIndex = days.findIndex(day =>
        moment(day).format("YYYY-MM-DD") === moment(selected_date).format("YYYY-MM-DD")
    );

    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current && selectedIndex >= 0 && scrollViewWidth > 0) {
            const scrollToPosition = (dayWidth + dayMargin) * selectedIndex - (scrollViewWidth / 2) + (dayWidth / 2);
            scrollViewRef.current.scrollTo({ x: scrollToPosition, animated: true });
        }
    }, [selectedIndex, scrollViewWidth]);

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(moment().month());
    const monthScrollViewRef = useRef(null); // Référence pour la ScrollView des mois
    const [monthScrollViewWidth, setMonthScrollViewWidth] = useState(0);

    // Changement de la date basé sur le mois sélectionné
    useEffect(() => {
        // Changement de la date pour aller au début du mois sélectionné dans l'année courante
        const newDate = moment().month(selectedMonthIndex).startOf('month');
        setDate(newDate.format("YYYY-MM-DD"));
    }, [selectedMonthIndex]);

    // Calcul et ajustement du défilement pour centrer le mois sélectionné
    useEffect(() => {
        if (monthScrollViewRef.current && monthScrollViewWidth > 0) {
            const monthWidth = 80; // Largeur estimée pour chaque élément de mois
            const monthMargin = 10; // Marge autour de chaque élément de mois
            const scrollToPosition = (monthWidth + monthMargin) * selectedMonthIndex - (monthScrollViewWidth / 2) + (monthWidth / 2);
            monthScrollViewRef.current.scrollTo({ x: scrollToPosition, animated: true });
        }
    }, [selectedMonthIndex, monthScrollViewWidth]);

    useEffect(() => {
        // Créer une liste d'années pour la sélection
        const currentYear = moment().year();
        const yearsArray = Array.from({ length: 20 }, (_, index) => currentYear - 10 + index);
        setYears(yearsArray);
    }, []);

    useEffect(() => {
        // Centrer l'année sélectionnée dans la ScrollView
        const index = years.indexOf(selectedYear);
        const scrollViewWidth = Dimensions.get('window').width;
        const scrollToPosition = index * 100 - scrollViewWidth / 2 - 80; // 100 est la largeur estimée de chaque élément d'année, 50 est la moitié de cette largeur
        yearScrollViewRef.current?.scrollTo({ x: scrollToPosition, animated: true });
    }, [selectedYear, years]);

    // Fonction pour changer la date basée sur l'année sélectionnée
    const handleSelectYear = (year) => {
        setSelectedYear(year);
        const newDate = moment(date).year(year).format("YYYY-MM-DD");
        setDate(newDate);
    };
    return (
        <Container showBackButton={true} >
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Vous réservez avec...</Text>
                <View style={styles.header}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: infos_service?.image ? infos_service?.image : infos_service?.service?.service?.image }}
                    />
                    <Text>
                        <Text style={styles.name_prestataire}>{infos_service?.prestataire?.user?.name}</Text>
                        <Text style={styles.name_service}>{'  '}{infos_service?.service?.service?.name}</Text>
                    </Text>
                </View>
                <View style={styles.content_calendar}>
                    <View style={styles.monthWrapper}>
                        <ScrollView
                            ref={yearScrollViewRef}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.yearsContentContainer}
                        >
                            {years.map((year, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleSelectYear(year)}
                                    style={[
                                        styles.dayNameWrapper, styles.monthNameWrapper,
                                        year === selectedYear && styles.monthNameSelected
                                    ]}
                                >
                                    <Text style={[year === selectedYear && styles.monthText]}>{year}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.monthWrapper}>
                        <ScrollView
                            ref={monthScrollViewRef}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            onLayout={(event) => {
                                setMonthScrollViewWidth(event.nativeEvent.layout.width);
                            }}
                        >
                            {months.map((month, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedMonthIndex(index)}
                                    style={[
                                        styles.dayNameWrapper, styles.monthNameWrapper,
                                        index === selectedMonthIndex && styles.monthNameSelected
                                    ]}
                                >
                                    <Text style={[{textTransform: 'capitalize'}, index === selectedMonthIndex && styles.monthText]}>{month}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.dayWrapper}>
                        <ScrollView
                            ref={scrollViewRef}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ alignItems: 'center' }}
                            onLayout={(event) => {
                                const { width } = event.nativeEvent.layout;
                                setScrollViewWidth(width);
                            }}>
                            {days.map((day, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => onChangeDate(day)}
                                    style={[
                                        styles.dayNameWrapper,
                                        moment(new Date(day)).format("YYYY-MM-DD") === moment(new Date(selected_date)).format("YYYY-MM-DD") && styles.dayNameSelected
                                    ]}>
                                    <Text style={styles.dayName}>{moment(new Date(day)).format("ddd")}</Text>
                                    <Text style={styles.dateStyle}>{moment(new Date(day)).format("DD")}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <ScrollView style={{ flex: 1 }}>
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
                                Array.isArray(list_plage_horaire) && list_plage_horaire.sort((a, b) => parseInt(a.heure_fin.substring(0, 2)) - parseInt(b.heure_fin.substring(0, 2))).map((plage_horaire, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleSelectPlageHoraire(plage_horaire)}
                                            disabled={plage_horaire.status_horaire == "OCCUPEE" ? true : false}
                                            style={[styles.plage_horaire,
                                            plage_horaire.status_horaire == "OCCUPEE" ?
                                                styles.plage_horaire_busy :
                                                selected_plage_horaire.includes(plage_horaire.id) ?
                                                    styles.plage_horaire_selected : styles.plage_horaire_not_busy
                                            ]}
                                        >
                                            <Text
                                                style={
                                                    plage_horaire.status_horaire == "OCCUPEE" ?
                                                        styles.text_plage_horaire_busy :
                                                        selected_plage_horaire.includes(plage_horaire.id) ?
                                                            styles.text_plage_horaire_selected : styles.text_plage_horaire_not_busy
                                                }
                                            >
                                                {plage_horaire.heure_debut.substring(0, 5)} - {plage_horaire.heure_fin.substring(0, 5)}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.price_wrapper}>
                    <Text style={styles.text_primary}>Vous avez choisi {selected_plage_horaire.length} planche{selected_plage_horaire.length > 1 ? "s" : ""} horaire{selected_plage_horaire.length > 1 ? "s" : ""}</Text>
                    <Text style={styles.price}>{selected_plage_horaire.length * infos_service.price}€</Text>
                </View>
                {
                    selected_plage_horaire.length > 0 &&
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
                    title={"Réservation réussi"}
                    subTitle={"Votre réservation a été effectuée avec succès. Veuillez suivre le statut de votre réservation dans vos réservations."}
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

export default BookingServiceScreen;
