import React from "react";
import { createStackNavigator } from 'react-navigation-stack'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import DashboardScreen from '../screens/Home/DashboardScreen'
import AddSaleScreen from '../screens/Home/AddSaleScreen'
import AddExpenseScreen from '../screens/Home/AddExpenseScreen'
import MapViewScreen from '../screens/Home/MapViewScreen'

import ListClients from '../screens/Home/ListClients'
import ListProducts from '../screens/Home/ListProducts'

import { Text } from "react-native-elements";
import { StyleSheet, TouchableOpacity } from "react-native";

const leftIcon = (navigation, icon) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon
            name={icon}
            style={{ marginLeft: 20 }}
            size={30}
            color='#024C81'
        />
    </TouchableOpacity>
)

const routeDay = () => {
    const [DateTime, setDateTime] = useState(new Date())
    const daysWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);
    var now = daysWeek[DateTime.getUTCDay()]+ ' ' +DateTime.getDate() + "/" + parseInt(DateTime.getMonth() + 1) + "/" + DateTime.getFullYear()
    return getRouteDay(now)
}

const getRouteDay = (routeDay) => (
    <Text style={styles.date}>{routeDay}</Text >
)

/**
 * *Dashboard Stack Navigation (Screens to navigate -> home,add-sale, add-expenses and map-view)
 */
const DashboardStack = createStackNavigator({
    Home: {
        screen: DashboardScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Inicio',
            headerLeft: () => leftIcon(navigation, 'menu'),
            headerRight: () => routeDay(),
        })
    },
    AddSale: {
        screen: AddSaleScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Añadir Venta',
        })
    },
    AddExpense: {
        screen: AddExpenseScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Añadir Gasto',
        })
    },
    ViewMap: {
        screen: MapViewScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Visualizar Mapa',
        })
    },
    ListClients: {
        screen: ListClients,
        navigationOptions: ({ navigation }) => ({
            title: 'Seleccionar Cliente',
        })
    },
     ListProducts: {
        screen: ListProducts,
        navigationOptions: ({ navigation }) => ({
            title: 'Seleccionar Producto',
        })
    },
}, {
    initialRouteName: 'Home',
})

export default DashboardStack;

const styles = StyleSheet.create({
    date: {
        marginRight: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#024C81',
    },
})