//import liraries
import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { styles } from './styles'
import Container from '@components/common/Container';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';
import { useServiceStore } from 'src/store/service.store';
import { BOOKING_SERVICE, PROFIL_PRESTATAIRE } from '@constants/routes';
import { useService } from 'src/feature/service/useService';

// create a component
const DetailServiceScreen = ({navigation, route}) => {

    const { infos_service } = useServiceStore()
    const { getListeServicePrestataire } = useService()
    const { data: list_service_prestataire } = getListeServicePrestataire(infos_service?.prestataire?.id)

    return (
        <Container>
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 60}}>
                <View style={styles.header}>
                    <View style={styles.avatar_wrapper}>
                        <Image 
                            style={styles.avatar}
                            source={{uri: infos_service?.image? infos_service?.image: infos_service?.service?.service?.image}}
                        />
                    </View>
                    <View style={styles.infos_service_wrapper}>
                        <Text style={styles.title}>{infos_service?.prestataire?.user?.name} {infos_service?.prestataire?.user?.lastname}</Text>
                        <Text style={styles.subtitle}>{infos_service.service.service.name}</Text>
                        <Text style={styles.small_text}>{Array.isArray(list_service_prestataire) && list_service_prestataire.length} service actif</Text>
                        <Button 
                            text='Voir le profil' 
                            style={styles.btn_header}
                            onPress={() => navigation.navigate(PROFIL_PRESTATAIRE, {prestataire_infos: infos_service?.prestataire})}
                        />
                    </View>
                </View>
                <Text style={styles.description}>{infos_service.description}</Text>
                <View style={styles.row_center}>
                    <View style={styles.row}>
                        <Icon name={"CircleDollarSign"} color={colors.PRIMARY} size={20} />
                        <Text style={styles.text_primary}><Text style={styles.text_price}>{infos_service.price}</Text> / heure</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name={"MapPin"} color={colors.PRIMARY} size={20} />
                        <Text style={styles.text_primary}><Text style={styles.text_price}>{infos_service.prestataire.adresse.boite_postal}</Text></Text>
                    </View>
                </View>
                <View style={styles.map_wrapper}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: infos_service?.adresse?.latitude?infos_service?.adresse?.latitude:37.78825,
                            longitude: infos_service?.adresse?.longitude?infos_service?.adresse?.longitude:-122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                    >
                        <Marker
                            coordinate={{
                                latitude: infos_service?.adresse?.latitude?infos_service?.adresse?.latitude:37.78825,
                                longitude: infos_service?.adresse?.longitude?infos_service?.adresse?.longitude:-122.4324,
                            }}  
                        />
                    </MapView>
                </View>
                <Button 
                    text='Réserver' 
                    style={styles.btn_booking}
                    onPress={() => navigation.navigate(BOOKING_SERVICE)} 
                />
            </ScrollView>
        </Container>
    );
};

//make this component available to the app
export default DetailServiceScreen;
