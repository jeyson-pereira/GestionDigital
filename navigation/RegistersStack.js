import React from "react";
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons'

import RegistersScreen from '../screens/Registers/RegistersScreen'

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
 * *Registers Stack Navigation (Screens to navigate -> viewRegisters filter:{Date,Client})
 */
const RegistersStack = createStackNavigator({
    Registros: {
        screen: RegistersScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Registros de venta',
            headerLeft: () => leftIcon(navigation, 'menu')
        })
    },
}, {
    initialRouteName: 'Registros',
})

export default RegistersStack;