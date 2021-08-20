import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import firebase, { db } from '../../config';
import { AntDesign, Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import { global } from '../../styles/global'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

export default DashboardScreen = (props) => {

    const [refreshing, setRefreshing] = useState(true);

    /* currentDate  function aquí ahora y se pasa por props*/
    const currentDate = () => {
        const dateTime = new Date()
        return dateTime.getDate() + '-' + parseInt(dateTime.getMonth() + 1) + '-' + dateTime.getFullYear();
    }

    const currentUser = firebase.auth().currentUser.uid;
    const dbRegistros = db.collection('Users').doc(currentUser).collection('Registros');

    const queryDate = (date) => {
        return dbRegistros.where("fecha_registro", "==", date); //Registros del día unicamente
    }

    const [Registers, setRegisters] = useState([])

    const onRefresh = (isMounted) => {
        if (isMounted) {
            setRefreshing(true);
            setRegisters([])
            //Registros del día ordenados descendentemente (ultimo registro hecho arriba)
            queryDate(currentDate()).orderBy('timestamp', 'desc').onSnapshot(querySnapshot => {
                const registers = []
                querySnapshot.docs.forEach((doc) => {
                    const { cantidad, nombrecliente_descripciongasto, producto_nombregasto, valor_total, isSales, location, hora_exacta } = doc.data()
                    registers.push({
                        id: doc.id,
                        cantidad,
                        nombrecliente_descripciongasto,
                        producto_nombregasto,
                        valor_total,
                        isSales,
                        location,
                        hora_exacta
                    })
                })
                setRegisters(registers)
            })
            setRefreshing(false)
        }
    }

    const registroColor = (check) => {
        if (check) {
            return { alignSelf: 'flex-end', color: '#37b448' }
        } else {
            return { alignSelf: 'flex-end', color: '#df2344' }
        }
    }

    useEffect(() => {
        let isMounted = true;
        onRefresh(isMounted)
        return () => { isMounted = false };
    }, [])

    //Balance con los registros del día 
    const Balance = () => {
        let value = 0;
        for (let index = 0; index < Registers.length; index++) {
            value += Registers[index].valor_total;
        }
        return parseInt(value);
    }
    const { SlideInMenu } = renderers;

    //Eliminar registro por medio del slideInMenu
    const deleteReg = (id) => {
        console.log('deleted', id);
        dbRegistros.doc(id).delete().then(() => {
            console.log("Document successfully deleted!")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <MenuProvider>
                <StatusBar
                    animated={true}
                    backgroundColor="#046CA0" />
                <View style={styles.topContent}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                        {/* Muestra return func Balance */}
                        Balance del día: $ {Balance()}{'\n'}
                        {/* cantidad de registros tomados del arreglo Registers */}
                        Cantidad de registros realizados hoy: {Registers.length}
                    </Text>
                </View>
                <ScrollView refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    {refreshing ? <ActivityIndicator /> : null}
                    {
                        Registers.map(registro => {
                            return (
                                <Menu key={registro.id} renderer={SlideInMenu} rendererProps={{ preferredPlacement: 'bottom' }}>
                                    <MenuTrigger triggerOnLongPress customStyles={{
                                        TriggerTouchableComponent: TouchableOpacity,
                                        triggerTouchable: touchableOpacityProps,
                                    }}>
                                        <ListItem bottomDivider>
                                            <Entypo name="shopping-bag" size={40} color={'#82AEC0'} />
                                            <ListItem.Content>
                                                <ListItem.Title style={{ width: 185 }}>{registro.producto_nombregasto}</ListItem.Title>
                                                <ListItem.Subtitle style={{ width: 200 }}>{registro.nombrecliente_descripciongasto}</ListItem.Subtitle>
                                                <ListItem.Subtitle style={{ width: 200 }}>{registro.hora_exacta}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <ListItem.Content>
                                                {/* muestra cantidad solo en venta - valor $ recibe estilo color (rojo - verde) */}
                                                {registro.isSales && <ListItem.Subtitle style={{ alignSelf: 'flex-end' }}>{registro.cantidad}</ListItem.Subtitle>}
                                                <ListItem.Subtitle style={registroColor(registro.isSales)}>$ {registro.valor_total}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    </MenuTrigger>
                                    {/* SlideInMenu Opciones */}
                                    <MenuOptions customStyles={{
                                        OptionTouchableComponent: TouchableOpacity,
                                        optionTouchable: touchableOpacityProps,
                                    }}>
                                        <MenuOption onSelect={() => deleteReg(registro.id)}>
                                            <ListItem bottomDivider>
                                                <Text style={{ fontSize: 16 }}>
                                                    <Ionicons name='trash' size={24} color={'#82AEC0'} />
                                                    {' ' + 'Eliminar'}
                                                </Text>
                                            </ListItem>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            )
                        })
                    }
                </ScrollView>
                {/* Navigation Buttons */}

                <View style={styles.containerButtons}>

                    {/* Button Expenses */}
                    <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => props.navigation.push("AddExpense", { dbRegistros: dbRegistros, currentDate: currentDate() })} >
                        <AntDesign name="minuscircleo" size={40} color="#cb3234" />
                        <Text style={styles.textButtons}>Gasto</Text>
                    </TouchableOpacity>

                    {/* Button Map */}
                    <TouchableOpacity style={styles.AddButton} onPress={() => props.navigation.push("ViewMap", { Registros: Registers })}>
                        <MaterialCommunityIcons name="map-marker-path" size={40} color="black" />
                        <Text style={styles.textButtons} > Mapa</Text>
                    </TouchableOpacity>

                    {/* Button Sales */}
                    <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => props.navigation.push("AddSale", { dbRegistros: dbRegistros, currentDate: currentDate() })} >
                        <AntDesign name="pluscircleo" size={40} color="#00681b" />
                        <Text style={styles.textButtons} >Venta</Text>
                    </TouchableOpacity>

                </View>
            </MenuProvider>
        </SafeAreaView>
    );

};

const touchableOpacityProps = {
    activeOpacity: 0.5,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContent: {
        backgroundColor: '#046CA0',
        padding: 10,
    },
    containerButtons: {
        height: 70,
        width: '100%',
        //marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#C0CED5',
        justifyContent: 'space-around',
        borderRadius: 10,
        alignItems: 'center',

    },
    textButtons: {
        textAlign: 'center',
        fontWeight: 'bold',
    }
});