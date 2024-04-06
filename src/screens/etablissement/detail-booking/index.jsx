//import liraries
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import RNFetchBlob from "rn-fetch-blob";
import { styles } from './styles';
import Container from '@components/common/Container';
import Button from '@components/ui/Button';
import moment from 'moment';
import { PROFIL_PRESTATAIRE } from '@constants/routes';
import { Download } from 'lucide-react-native';
import { colors } from '@themes/index';

// create a component
const DetailBookingEtablissementScreen = ({route, navigation}) => {

    const { item } = route.params

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

    return (
        <Container showBackButton={true} >
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Votre réservation</Text>
                <View style={styles.header}>
                    <View style={styles.row}>
                        <Image 
                            source={{uri: 
                                item?.prestataire_service?.image?
                                item?.prestataire_service?.image:
                                item?.prestataire_service?.service?.service?.image
                            }}
                            style={styles.avatar}
                        />
                        <Text style={styles.header_title}>{item?.etablissement?.name}</Text>
                        <Text style={styles.header_subtitle}>{item?.etablissement?.gerant?.name}</Text>
                    </View>
                    <Button 
                        text='Voir le profil' 
                        style={styles.btn_detail_profil}
                        onPress={() => navigation.navigate(PROFIL_PRESTATAIRE, {prestataire_infos: item?.prestataire_service?.prestataire})}
                    />
                </View>
                <View style={styles.time_wrapper}>
                    <View style={styles.time}>
                        <Text style={styles.time_wrapper_title}>Horaire</Text>
                        <View>
                            {
                                item?.plage_horaire.map((hour) => (
                                    <Text style={styles.text_bold}>{hour.heure_debut.substring(0,5)} à {hour.heure_fin.substring(0,5)}</Text>
                                ))
                            }
                        </View>
                        <Text style={styles.text_bold}>{moment(new Date(item?.date_reservation)).format("dddd DD MMMM")}</Text>
                    </View>
                    <View>
                        <Text style={styles.time_wrapper_title}>Prix</Text>
                        <Text style={styles.text_bold}>{item?.plage_horaire.length*item?.prestataire_service?.price},00 €</Text>
                    </View>
                </View>
                <View style={styles.status_wrapper}>
                    <Text style={styles.status_title}>Statut</Text>
                    <View style={styles.status_progress_bar}>
                        <View style={[styles.row, styles.status, styles.status_demande]}>
                            <View style={styles.status_pass} />
                            <View style={styles.text_status_wraper}>
                                <Text style={styles.text_status_bold}>Réservation demandée</Text>
                            </View>
                        </View>
                        {
                            item?.status_reservation != "REFUSE" && 
                            <View style={[styles.row, styles.status, styles.margin_vertical]}>
                                <View style={
                                        item?.status_reservation == "ACCECPTE"?
                                        styles.status_current:
                                        item?.status_reservation == "DEMANDE"?
                                        styles.status_to_come
                                        :
                                        styles.status_pass
                                    } 
                                />
                                <View style={[
                                        styles.text_status_wraper, 
                                        item?.status_reservation == "ACCECPTE" && styles.text_status_wraper_pending
                                    ]}
                                >
                                    <Text style={styles.text_status_bold}>Réservation acceptée</Text>
                                    {
                                        item?.status_reservation == "ACCECPTE" &&
                                        <Text style={styles.header_subtitle}>En cours</Text>
                                    }
                                </View>
                            </View>
                        }
                        {
                            item?.status_reservation == "REFUSE" &&
                            <View style={[styles.row, styles.status, styles.margin_vertical]}>
                                <View style={styles.status_pass} />
                                <View style={[
                                        styles.text_status_wraper
                                    ]}
                                >
                                    <Text style={styles.text_status_bold}>Réservation refusée</Text>
                                </View>
                            </View>
                        }
                        <View style={[styles.row, styles.status, styles.margin_vertical]}>
                            <View style={item?.status_reservation == "PAYE_ET_TERMINE"?styles.status_pass:styles.status_to_come} />
                            <View style={[
                                    styles.text_status_wraper,
                                ]}
                            >
                                <Text style={styles.text_status_bold}>Réservation Terminée</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    item.status_reservation == "PAYE_ET_TERMINE" && 
                    <TouchableOpacity onPress={downloadBonCommande} style = {styles.btn_download}>
                        <Download color={colors.WHITE} />
                        <Text style={styles.text_btn}>Télécharger le bon de commande </Text>
                    </TouchableOpacity>
                }
            </ScrollView>
        </Container>
    );
};

//make this component available to the app
export default DetailBookingEtablissementScreen;
