import React from "react";
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons'

import ClientsScreen from '../screens/Clients/ClientsScreen'
import AddClientsScreen from '../screens/Clients/AddClientsScreen'
import ClientDetailsScreen from '../screens/Clients/ClientsDetailsScreen'

const leftIcon = (navigation, icon) => (
    <Icon
        name={icon}
        style={{ marginLeft: 20 }}
        size={30}
        color='#024C81'
        onPress={() => navigation.openDrawer()}
    />

)
/**
 * *Clients Stack Navigation (Screens to navigate -> Clients-list,add-client, edit-view-clientInfo)
 */
const ClientsStack = createStackNavigator({
    /* screen clients-list */
    ClientsList: {
        screen: ClientsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Clientes',
            headerLeft: () => leftIcon(navigation, 'menu')
        })
    },
    /* screen add-client */
    AddClients: {
        screen: AddClientsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Cliente nuevo',
        })
    },
    ClientsDetails: {
        screen: ClientDetailsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Editar cliente'
        })
    },
}, {
    initialRouteName: 'ClientsList',
})

export default ClientsStack;


