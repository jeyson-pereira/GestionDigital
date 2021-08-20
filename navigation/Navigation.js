import React from "react";
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";


import LoadingScreen from '../screens/Auth/LoadingScreen'
import LoginScreen from '../screens/Auth/LoginScreen'

import DashboardStack from './DashboardStack'
import ProductsStack from './ProductsStack'
import ClientsStack from './ClientsStack'
import RegistersStack from './RegistersStack'

import firebase from '../config'


/**
 * *Custome Drawer Component
 */
const CustomDrawerContentComponent = (props) => (

    <SafeAreaView style={{ flex: 1 }}>
        {/* Header Drawer Section */}
        <View style={styles.headerDrawer}>
            <View style={{ marginTop: 40, marginBottom: 10 }}>
                <Image source={{ uri: firebase.auth().currentUser.photoURL }}
                    style={{ height: 80, width: 80, borderRadius: 60, alignSelf: 'center' }} />
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
                    {firebase.auth().currentUser.displayName}{'\n'}{firebase.auth().currentUser.email}
                </Text>
            </View>
        </View>
        {/* Content Drawer Section */}
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
        {/* Bottom Content Section */}
        <View style={styles.bottomContent}>
            <TouchableOpacity style={styles.drawerItem} onPress={() => firebase.auth().signOut()}>
                <Icon name='log-out-outline' style={{marginRight: 10}} size={24} color={'white'} />
                <Text style={styles.drawerItemText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView >
);

/**
 * *Drawer navigation here
 */
const AppNavigation = createDrawerNavigator({
    Dashboard: {
        screen: DashboardStack,
        navigationOptions: ({ tintColor }) => ({
            drawerLabel: 'Inicio',
            drawerIcon: () => (
                <Icon name='home' size={24} style={{ color: tintColor }} />
            )
        })
    },
    Products: {
        screen: ProductsStack,
        navigationOptions: ({ tintColor }) => ({
            drawerLabel: 'Productos',
            drawerIcon: () => (
                <Icon name='archive' size={24} style={{ color: tintColor }} />
            )
        })
    },
    Clients: {
        screen: ClientsStack,
        navigationOptions: ({ tintColor }) => ({
            drawerLabel: 'Clientes',
            drawerIcon: () => (
                <Icon name='people' size={24} style={{ color: tintColor }} />
            )
        })
    },
    Registers: {
        screen: RegistersStack,
        navigationOptions: ({ tintColor }) => ({
            drawerLabel: 'Historial de Registros',
            drawerIcon: () => (
                <Icon name='clipboard' size={24} style={{ color: tintColor }} />
            )
        })
    }
}, {
    contentComponent: CustomDrawerContentComponent,
    drawerBackgroundColor: '#046CA0',
    contentOptions: {
        labelStyle: { fontSize: 16 },
        activeTintColor: '#000',
        inactiveTintColor: '#fff',
        itemsContainerStyles: {
            marginVertical: 0,
        }
    }
}
)

/**
 * *Switch navigation here (it's RootNavigation contain Auth and Drawer)
 */
const RootNavigation = createSwitchNavigator({
    AuthLoading: LoadingScreen,
    Auth: LoginScreen,
    App: AppNavigation
})

/**
 * *App Container here (it contain Root navigation)
 */
const AppContainer = createAppContainer(RootNavigation)

export default AppContainer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerDrawer: {
        backgroundColor: '#024C81',
        alignItems: 'center',
    },
    bottomContent: {
        height: '10%',
        maxHeight: 100,
        backgroundColor: '#024C81',
        padding: 20,
    },
    drawerItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    drawerItemText: {
        fontSize: 16,
        marginLeft: 20,
        fontWeight: 'bold',
        color: 'white'
    },
});