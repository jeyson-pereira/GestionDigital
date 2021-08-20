import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
import firebase, { db } from '../../config'
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements'


export default (props) => {
    const currentUser = firebase.auth().currentUser.uid;
    const dbClients = db.collection('Users').doc(currentUser).collection('Clients');

    const [Clients, setClients] = useState([])

    useEffect(() => {
        dbClients.orderBy('cliente').onSnapshot(querySnapshot => {
            const clients = []
            querySnapshot.docs.forEach((doc) => {
                const { cliente, telefono, email } = doc.data()
                clients.push({
                    id: doc.id,
                    cliente,
                    telefono,
                    email
                })
            })
            setClients(clients)
        })
    }, [])

    /* Función callBack nos actualiza los datos de comprador y devuelve al screen de Venta */
    const callBack = (id, name) =>{
        props.navigation.state.params.setComprador({id: id,name: name})
        props.navigation.pop()
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                {
                    Clients.map(client => {
                        return (
                            <ListItem key={client.id} bottomDivider
                                onPress={() => callBack(client.id,client.cliente)}>
                                <Icon name='person-sharp' size={40} color={'#82AEC0'} />
                                <ListItem.Content>
                                    <ListItem.Title style={{ width: 185 }}>{client.cliente}</ListItem.Title>
                                    <ListItem.Subtitle style={{ width: 185 }}>
                                        <Icon name='call-outline' size={14} color={'#82AEC0'} /><Text > {client.telefono}</Text>
                                    </ListItem.Subtitle>
                                    {!!client.email && (
                                        <ListItem.Subtitle style={{ maxWidth: 400 }}>
                                            <Icon name='mail-outline' size={14} color={'#82AEC0'} /><Text > {client.email}</Text>
                                        </ListItem.Subtitle>
                                    )}
                                </ListItem.Content>
                                <ListItem.Chevron size={20} color={'#0583B0'} />
                            </ListItem>
                        )
                    })
                }

            </ScrollView>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    
});