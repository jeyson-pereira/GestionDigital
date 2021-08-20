import React, { useState } from "react";
import {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { global } from '../../styles/global';
import * as Location from 'expo-location';
import firebase, { db } from '../../config';

const AddSaleScreen = (props) => {

    /* State para guardar los datos del cliente que compra el producto */
    const [comprador, setComprador] = useState({
        id: '',
        name: ''
    });

    const [docProducto, setDocProducto] = useState ()

    /* State para guardar los datos del  producto */
    const [producto, setProducto] = useState({
        id: '',
        name: '',
        precio: 0,
        cantidad: '',
    });

    /* Permitir Ingresar Cantidad Producto a Venta*/
    const editCant = () => {
        if (producto.id != '') {
            return true;
        }
        return false;
    }
    /* State y Func Actualizar Cantidad Producto y Valor Total de Venta */
    const [cantvalor, setCantValor] = useState({
        cantidad: 0,
        valor_total: 0,
    })
    const handleCantValor = (value) => {
        if (isNaN(value)) {
            setCantValor({ ...cantvalor, cantidad: 0, valor_total: 0 })
        } else {
            if (value <= producto.cantidad) {
                let math = value * producto.precio;
                setCantValor({ ...cantvalor, cantidad: value, valor_total: math });
            } else {
                setCantValor({ ...cantvalor, cantidad: 0, valor_total: 0 })
                Alert.alert('Error', 'La cantidad excede el inventario! \nQuedan: ' + producto.cantidad + ' unidades diponibles.');
            }
        }
    }

    /* State Ubicación Actual */
    const [userLocation, setUserLocation] = useState(null);

    /* Función para navegar a la selección de Cliente o Producto */
    /* Pasando por props setState para actualización del State */
    const selectFromList = (args, param) => {
        props.navigation.push(args, param);
    }

    /* Func Validar o Pedir Permisos GPS */
    const checkPermission = async () => {
        const hasPermission = await Location.requestPermissionsAsync();
        if (hasPermission.status === 'granted') {
            return true;
        } else {
            console.log('the user has not granted you permission')
            return false;
        }
    }

    /* Func Obtener Ubicación Actual */
    const getUserLocation = async () => {
        let services = await Location.hasServicesEnabledAsync();
        if (services) {
            console.log("Service Enable!");
            let permission = await checkPermission();
            if (permission) {
                console.log("Permission success!");
                let location = await Location.getCurrentPositionAsync({});
                setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            } else {
                console.log("Permission failure!");
            }
        } else {
            console.log("Gps service disable!");
            Alert.alert(
                "Servicio GPS desactivado",
                "Porfavor active el servicio GPS de su telefono e intente nuevamente.",
                [
                    { text: "OK", onPress: () => Location.enableNetworkProviderAsync() }
                ]
            );
        }
    }

    //Hora Exacta formato 12H
    const itemTime = () => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();

        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        let formattedTime = hours + ':' + minutes.substr(-2) + ' ' + ampm;
        return (formattedTime);
    }

    const saveVenta = async () => {
        const valid = await validacionVenta();
        if (valid) {
            let location;
            if (userLocation == null) {
                location = null
            } else {
                location = new firebase.firestore.GeoPoint(userLocation.latitude, userLocation.longitude);
            }
            try {
                props.navigation.getParam('dbRegistros').add({
                    nombrecliente_descripciongasto: comprador.name,
                    producto_nombregasto: producto.name,
                    valor_total: cantvalor.valor_total,
                    cantidad: cantvalor.cantidad,
                    fecha_registro: props.navigation.getParam('currentDate'),
                    isSales: true,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    location: location,
                    hora_exacta: itemTime()
                }),
                docProducto.update({cantidad: (producto.cantidad - cantvalor.cantidad)})
                    props.navigation.pop();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Hay campos vacios o decició guardar ubicación');
        }
    }
    const validacionVenta = () => {
        return new Promise(resolve => {
            if (comprador.name === '' || producto.name === '' || cantvalor.cantidad === 0 || cantvalor.valor_total === 0) {
                alert('Complete los campos requeridos para continuar!');
                resolve(false)
            } else if (userLocation === null) {
                let valid;
                Alert.alert(
                    "Ubicacion no registrada",
                    "¿Desea continuar?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => { resolve(false) },
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => { resolve(true) } }
                    ]
                );
            } else { resolve(true); }
        })
    }

    return (
        <View style={global.container}>
            {/* Select Cliente */}
            <TouchableOpacity style={global.inputContainer} onPress={() => selectFromList('ListClients', { setComprador: setComprador })} >
                <Text style={global.inputLabel}>Cliente</Text>
                <View style={global.row}>
                    <Icon name='person-sharp' size={16} color={'#82AEC0'} />
                    <TextInput editable={false} style={global.input} placeholder="Selecciona cliente"
                        value={comprador.name} />
                </View>
            </TouchableOpacity>
            {/* Select Product */}
            <TouchableOpacity style={global.inputContainer} onPress={() => selectFromList('ListProducts', { setProducto: setProducto, setDocProducto: setDocProducto })}>
                <Text style={global.inputLabel}>Producto</Text>
                <View style={global.row}>
                    <Icon name='pricetag' size={16} color={'#82AEC0'} />
                    <TextInput editable={false} style={global.input} placeholder="Selecciona producto"
                        value={producto.name} />
                </View>
            </TouchableOpacity>
            {/* Valor Unidad from data*/}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Valor unidad</Text>
                <View style={global.row}>
                    <Icon name='logo-usd' size={16} color={'#82AEC0'} />
                    <TextInput editable={false} style={global.input}
                        value={producto.precio.toString()}
                    />
                </View>
            </View>

            {/* Input Cantidad  */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Cantidad</Text>
                <View style={global.row}>
                    <Icon name='duplicate' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='numeric' style={global.input} placeholder="Escribe aquí" editable={editCant()}
                        onChangeText={(value) => handleCantValor(parseInt(value))}
                        value={cantvalor.cantidad.toString()}
                    />
                </View>
            </View>

            {/* Valor Total from data*/}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Valor Total</Text>
                <View style={global.row}>
                    <Icon name='logo-usd' size={16} color={'#82AEC0'} />
                    <TextInput editable={false} style={global.input}
                        value={cantvalor.valor_total.toString()} />
                </View>
            </View>

            {/* GetLocation Button */}
            <TouchableOpacity activeOpacity={0.7} style={global.button}
                onPress={() => { getUserLocation() }}
            >
                <Text style={global.buttonText}><Icon name='location-outline' size={20} />Guardar ubicación</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity activeOpacity={0.7} style={global.button}
                onPress={() => saveVenta()}>
                <Text style={global.buttonText}>Finalizar venta</Text>
            </TouchableOpacity>
        </View>
    );
}
export default AddSaleScreen;

