import React, { useEffect, useState } from "react";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import * as Location from 'expo-location';

export default (props) => {
    const Registros = props.navigation.getParam('Registros');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            initialRegion(location);
        })();
    }, []);

    const initialRegion = (location)  =>{
        if (location) {
            setRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: .05, longitudeDelta: 0.05 });
        }else{
            setRegion({ latitude: 0, longitude: 0, latitudeDelta: 100, longitudeDelta: 100 });
        }
    }

    const Points = (registro, index) => {
        if (registro.isSales && registro.location!= null) {
            return (
                //console.log(registro),
                <Marker
                    key={index}
                    coordinate={registro.location}
                    title={registro.nombrecliente_descripciongasto}
                    description={registro.producto_nombregasto + ' x ' + registro.cantidad + ' : ' + registro.valor_total}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                showsUserLocation={true}
                initialRegion={region} >
                {Registros.map((registro, index) => {
                    return (Points(registro, index))
                })
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});