import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Linking
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { global } from '../../styles/global'

const RegistersScreen = (props) => {
    //Loading para Loading Screen
    const [loading, setLoading] = useState(false);

    //State Client
    const [state, setState] = useState({
        id: props.navigation.state.params.client.id,
        cliente: props.navigation.state.params.client.cliente,
        telefono: props.navigation.state.params.client.telefono,
        email: props.navigation.state.params.client.email,
    })

    //Client Documento de Firestore
    const docClient = props.navigation.getParam('dbClients').doc(props.navigation.state.params.client.id);

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    //modal delete
    const [modal, setModal] = useState({
        modalDelete: false,
        modalUpdate: false
    })

    const setModalVisible = (modalSelect, visible) => {
        setModal({ ...modal, [modalSelect]: visible });
    }


    const deleteClient = () => {
        setLoading(true);
        docClient.delete().then(() => {
            setLoading(false);
            console.log("Document successfully deleted!")
            setModalVisible('modalDelete', !modal.modalDelete)
            props.navigation.pop()
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const updateClient = () => {
        if (JSON.stringify(state) === JSON.stringify(props.navigation.state.params.client)) {
            setModalVisible('modalUpdate', !modal.modalUpdate)
            return alert("No hay cambios para actualizar!");
        }
        if (state.cliente.trim() === '' || state.telefono === '') {
            alert('Complete todos los campos')
            setModalVisible('modalUpdate', !modal.modalUpdate)
        } else if (state.email.trim() !== '') {
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(state.email) === false) {
                console.log('Email is not correct')
                alert('Email invalido')
                setModalVisible('modalUpdate', !modal.modalUpdate)
            } else {
                console.log('Email is correct')
                updateDb()
            }
        } else {
            updateDb()
        }
    }

    const updateDb = () => {
        setLoading(true);
        docClient.update(state).then(() => {
            setLoading(false);
            console.log("Document successfully updated!");
            setModalVisible('modalUpdate', !modal.modalUpdate)
            props.navigation.pop()
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    //Call to phone number client
    const callClient = (value) => {
        Linking.openURL(`tel:${value}`)
    }

    if (loading) {
        return (
            <View style={global.loader}>
                <ActivityIndicator size="large" color="#046CA0" />
            </View>
        );
    }

    return (
        <View style={global.container}>
            {/* Input - Cliente Name */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Nombre del cliente</Text>
                <View style={global.row}>
                    <Icon name='person' size={16} color={'#82AEC0'} />
                    <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('cliente', value)}
                        value={state.cliente}
                    />
                </View>
            </View>
            {/* Input - Client Phone */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Telefono</Text>
                <View style={global.row}>
                    <Icon name='call' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='phone-pad' style={global.input} placeholder="Escribe aquí"
                        maxLength={10} onChangeText={(value) => handleChangeText('telefono', value)}
                        value={state.telefono}
                    />
                </View>
            </View>
            {/* Input - Client Email */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Email</Text>
                <View style={global.row}>
                    <Icon name='mail' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='email-address' autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('email', value)}
                        value={state.email}
                    />
                </View>
            </View>
            {/* Submit Button */}
            <TouchableOpacity activeOpacity={0.7} style={global.save}
                onPress={() => setModalVisible('modalUpdate', !modal.modalUpdate)}>
                <Text style={global.buttonText}><Icon name='save' size={20} /> Guardar cambios</Text>
            </TouchableOpacity>
            {/* Delete Button */}
            <TouchableOpacity activeOpacity={0.7} style={global.delete}
                onPress={() => setModalVisible('modalDelete', !modal.modalDelete)}>
                <Text style={global.buttonText}><Icon name='trash' size={20} /> Eliminar Cliente</Text>
            </TouchableOpacity>
            {/* Call Button */}
            <TouchableOpacity activeOpacity={0.7} style={styles.callButton}
                onPress={() => callClient(state.telefono)}>
                <Icon name='call' size={24} color={'white'} />
            </TouchableOpacity>
            {/*-------------------------MODALES--------------------------- */}
            {/* Modal Confirmación Eliminar */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.modalDelete}>
                <View style={global.centeredView}>
                    <View style={global.modalView}>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>
                            Está seguro que desea eliminar este cliente?
                        </Text>
                        <View style={global.row}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.confirm}
                                onPress={() => deleteClient()}>
                                <Text style={{ color: '#046CA0', fontSize: 14, fontWeight: 'bold' }}>
                                    <Icon name='checkmark-circle' /> Confirmar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.cancel}
                                onPress={() => setModalVisible('modalDelete', !modal.modalDelete)}>
                                <Text style={{ color: '#a00404', fontSize: 14, fontWeight: 'bold' }}>
                                    <Icon name='close-circle' /> Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
            {/* Modal Confirmación Actualizar */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.modalUpdate}>
                <View style={global.centeredView}>
                    <View style={global.modalView}>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>
                            Está seguro que desea actualizar este cliente?
                        </Text>
                        <View style={global.row}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.confirm}
                                onPress={() => updateClient()}>
                                <Text style={{ color: '#046CA0', fontSize: 14, fontWeight: 'bold' }}>
                                    <Icon name='checkmark-circle' /> Confirmar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.cancel}
                                onPress={() => setModalVisible('modalUpdate', !modal.modalUpdate)}>
                                <Text style={{ color: '#a00404', fontSize: 14, fontWeight: 'bold' }}>
                                    <Icon name='close-circle' /> Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View >
    );
}
export default RegistersScreen;

const styles = StyleSheet.create({

    callButton: {
        width: 60,
        height: 60,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24d464',
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
});