import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import firebase, { db } from '../../config'
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements'
import {global} from '../../styles/global'


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


    return (
        <View style={styles.container}>
            <ScrollView >
                {
                    Clients.map(client => {
                        return (
                            <ListItem key={client.id} bottomDivider
                                onPress={() => props.navigation.push('ClientsDetails', { client: client, dbClients: dbClients })}>
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
            {/* add button products  */}
            <TouchableOpacity activeOpacity={.7} style={global.AddButton}
                onPress={() => props.navigation.push("AddClients", { dbClients: dbClients })}
            >
                <Icon name='add' style={{ paddingLeft: 3 }} size={40} color="#fff" />
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    
});