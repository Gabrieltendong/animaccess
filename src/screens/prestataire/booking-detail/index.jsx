//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform, Linking } from 'react-native';
import RNFetchBlob from "rn-fetch-blob";

import { styles } from './styles';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import moment from 'moment';
import Button from '@components/ui/Button';
import { useMutation, useQuery } from 'react-query';
import { get_my_booking_prestataire, update_booking } from 'src/feature/booking/booking.service';
import Alert from '@components/Alert';
import { useUserStore } from 'src/store/user.store';
import { Download } from 'lucide-react-native';

// create a component
const BookingPrestataireDetailScreen = ({route, navigation}) => {

    const { item } = route.params
    const {mutateAsync: updateBooking, isLoading } = useMutation(update_booking)
    const {mutateAsync: declineBooking, isLoading: isLoadingDeclineBooking } = useMutation(update_booking)
    const { user } = useUserStore()
    const prestataire_id = user?.account?.id
    const { refetch: refreshListBooking } = useQuery(['List_booking_prestataire', prestataire_id], get_my_booking_prestataire)
    const [message_infos, setMessageInfos] = useState({
        title: "",
        subtitle: ""
    })
    const [isVisibleModal, setIsVisibleModal] = useState(false)

    const handleDeclineBooking = async () => {
        const data = {status_reservation: "REFUSE"}
        const res = await declineBooking({data, reservation_id: item.id})
        if(res.id){
            setMessageInfos({
                title: "Réservation refusée",
                subtitle: "Cette réservation a bien été déclicné"
            })
            setIsVisibleModal(true)
        }
    }

    const handleAcceptBooking = async () => {
        const data = {status_reservation: "ACCECPTE"}
        const res = await updateBooking({data, reservation_id: item.id})
        if(res.id){
            setMessageInfos({
                title: "Réservation acceptée",
                subtitle: "Cette réservation a bien été accepté"
            })
            setIsVisibleModal(true)
        }
    }

    const handleCloseBooking = async () => {
        const data = {status_reservation: "PAYE_ET_TERMINE"}
        const res = await updateBooking({data, reservation_id: item.id})
        if(res.id){
            setMessageInfos({
                title: "Réservation terminée",
                subtitle: "Cette réservation a bien été terminé"
            })
            setIsVisibleModal(true)
        }
    }

    const downloadBonCommande = async () => {
        const res = await RNFetchBlob.config(Platform.select({
            ios: {
                fileCache: true,
                path:  RNFetchBlob.fs.dirs.DocumentDir + "/bon_de_commande" + item.date_reservation + ".pdf",
                notification: true,
            },
            android: {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: RNFetchBlob.fs.dirs.DownloadDir + "/bon_de_commande" + item.date_reservation + ".pdf",
                    description: 'Downloading PDF document',
                    mediaScannable: true,
                },
            }
        }))
         .fetch('GET', item.file)
         if(Platform.OS == 'ios'){
            RNFetchBlob.ios.openDocument(res.data);  
         }else{
            RNFetchBlob.android.actionViewIntent(res.path());
         }
         console.log('PDF document downloaded successfully', res.path());
     }

    const handleCloseModal = () => {
        refreshListBooking()
        setIsVisibleModal(false)
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{uri: 
                    item?.prestataire_service?.image?
                    item?.prestataire_service?.image
                    :
                    item?.prestataire_service?.service?.service?.image
                }} 
                style={styles.image_header}
                imageStyle={styles.image_header_border}
            >
                <TouchableOpacity 
                    style={styles.btn_back}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name={"ChevronLeft"} color={colors.WHITE} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.content}>
                <Text style={styles.title}>{item?.etablissement?.name}</Text>
                <View style={styles.row}>
                    <Icon name={"UserRound"} color={colors.BLACK} size={20} />
                    <Text style={styles.text_right}>{item?.etablissement?.gerant?.name}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name={"Calendar"} color={colors.BLACK} size={20} />
                    <Text style={styles.text_right}>{moment(new Date(item?.date_reservation)).format("dddd DD MMMM YYYY")}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    const address = item?.etablissement?.adresse?.boite_postal;
                    if (address) {
                        const url = Platform.select({
                            ios: `maps://app?daddr=${address}`,
                            android: `google.navigation:q=${address}`,
                            default: `https://www.google.com/maps/dir/?api=1&destination=${address}`,
                        });
                        Linking.openURL(url);
                    }
                }}>
                    <View style={styles.row}>
                        <Icon name={"MapPin"} color={colors.BLACK} size={20} />
                        <Text style={styles.text_right}>{item?.etablissement?.adresse?.boite_postal}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.row_hours}>
                    <Icon name={"Clock"} color={colors.BLACK} size={20} />
                    <View style={{flex: 1}}>
                        {
                            item?.plage_horaire.map((hour) => (
                                <Text style={styles.text_hour}>{hour.heure_debut.substring(0,5)} - {hour.heure_fin.substring(0,5)}</Text>
                            ))
                        }
                    </View>
                </View>
                <View style={styles.row}>
                    <Icon name={"Phone"} color={colors.BLACK} size={20} />
                    <Text style={styles.text_right}>{item?.etablissement?.gerant?.telephone}</Text>
                </View>
                {
                    item.status_reservation == "DEMANDE" &&
                    <View style={styles.btn_wrapper}>
                        <Button 
                            variant='outline' 
                            text='Refuser'
                            style={styles.btn}
                            onPress={handleDeclineBooking}
                            isLoading={isLoadingDeclineBooking}
                        />
                        <Button 
                            text='Accepter' 
                            style={styles.btn}
                            onPress={handleAcceptBooking}
                            isLoading={isLoading}
                        />
                    </View>
                }
                {
                    item.status_reservation == "ACCECPTE" &&
                    <Button 
                        text='Terminer' 
                        style={styles.btn_close_booking}
                        onPress={handleCloseBooking}
                        isLoading={isLoading}
                    />
                }

                {
                    item.status_reservation == "PAYE_ET_TERMINE" &&
                    <Text style={styles.booking_close}>Cette réservation est terminé</Text>
                }

                {
                    item.status_reservation == "REFUSE" &&
                    <Text style={styles.booking_decline}>Vous avez decliné cette réservation</Text>
                }

                {
                    item.status_reservation == "PAYE_ET_TERMINE" && 
                    <TouchableOpacity onPress={downloadBonCommande} style = {styles.btn_download}>
                        <Download color={colors.WHITE} />
                        <Text style={styles.text_btn}>Télécharger le bon de commande </Text>
                    </TouchableOpacity>
                }
                
            </View>
            <Alert 
                type={"success"}
                isVisible={isVisibleModal}
                title={message_infos.title}
                subTitle={message_infos.subtitle}
                onToggle={handleCloseModal}
            />
        </View>
    );
};

//make this component available to the app
export default BookingPrestataireDetailScreen;
