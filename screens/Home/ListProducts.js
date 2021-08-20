import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase, { db } from '../../config'
import { ListItem } from 'react-native-elements'
import { global } from '../../styles/global'

export default (props) => {

    const currentUser = firebase.auth().currentUser.uid;
    const dbProducts = db.collection('Users').doc(currentUser).collection('Products');

    const [Products, setProducts] = useState([])

    useEffect(() => {
        dbProducts.orderBy('nombre').onSnapshot(querySnapshot => {
            const products = []
            querySnapshot.docs.forEach((doc) => {
                const { nombre, precio, cantidad, descripcion } = doc.data()
                products.push({
                    id: doc.id,
                    nombre,
                    precio,
                    cantidad,
                    descripcion
                })
            })
            setProducts(products)
        })
    }, [])

    /* Función callBack nos actualiza los datos de producto y devuelve al screen de Venta */
    const callBack = (id, name, precio, cant) => {
        if (cant==0) {
            alert("Producto sin existencias en inventario!")
        } else {
            props.navigation.state.params.setProducto({ id: id, name: name, precio: precio, cantidad: cant })
            props.navigation.state.params.setDocProducto(dbProducts.doc(id))
            props.navigation.pop()
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    Products.map(product => {
                        return (
                            <ListItem key={product.id} bottomDivider
                                onPress={() => callBack(product.id, product.nombre, product.precio, product.cantidad)}>
                                <Icon name='archive' size={40} color={'#82AEC0'} />
                                <ListItem.Content>
                                    <ListItem.Title style={{ width: 185 }}>{product.nombre}</ListItem.Title>
                                    {!!product.descripcion && (
                                        <ListItem.Subtitle style={{ width: 185 }}>{product.descripcion}</ListItem.Subtitle>
                                    )}
                                </ListItem.Content>
                                <ListItem.Content>
                                    <ListItem.Subtitle style={{ alignSelf: 'flex-end' }}>{product.cantidad}</ListItem.Subtitle>
                                    <ListItem.Subtitle style={{ alignSelf: 'flex-end' }}>${product.precio}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron size={20} color={'#0583B0'} />
                            </ListItem>
                        )
                    })
                }
            </ScrollView>
            {/* add products button */}

        </View >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});