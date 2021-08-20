import React from "react";
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons'

import ProductsScreen from '../screens/Products/ProductsScreen'
import AddProductsScreen from '../screens/Products/AddProductsScreen'
import ProductDetailsScreen from '../screens/Products/ProductDetailsScreen'

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
 * *Products Stack Navigation (Screens to navigate -> Products-list,add-product, edit-view-productInfo)
 */
const ProductsStack = createStackNavigator({
    ProductsList: {
        screen: ProductsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Productos',
            headerLeft: () => leftIcon(navigation, 'menu')
        })
    },
    /* Sreen add-product */
    AddProducts: {
        screen: AddProductsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Producto nuevo'
        })
    },
    ProductDetails: {
        screen: ProductDetailsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Editar producto'
        })
    },
}, {
    initialRouteName: 'ProductsList',
})

export default ProductsStack;