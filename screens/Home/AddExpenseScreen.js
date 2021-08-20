import React, { Component, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { global } from '../../styles/global'
import firebase, { db } from '../../config';

const AddExpenseScreen = (props) => {
    //State
    const [state, setState] = useState({
        descripcion: '',
        nombreServicio: '',
        valorGasto: '',
    })

    //Hora Exacta formato 12H
    const itemTime = () => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        let formattedTime = hours + ':' + minutes.substr(-2) + ' ' + ampm;
        return (formattedTime);
    }

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const saveExpense = () => {
        /**
         * TODO!: VALIDAR LOS DATOS EN BLANCO
         */
        if (state.descripcion.trim() === '' || state.nombreServicio === '' || state.valorGasto === '') {
            alert('Complete todos los campos')
        } else {
            try {
                props.navigation.getParam('dbRegistros').add({
                    nombrecliente_descripciongasto: state.descripcion,
                    producto_nombregasto: state.nombreServicio,
                    valor_total: state.valorGasto * -1,
                    cantidad: 1,
                    fecha_registro: props.navigation.getParam('currentDate'),
                    isSales: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    hora_exacta: itemTime()
                }),
                    console.log(state);
                props.navigation.pop();
            } catch (error) {
                console.log(error);
            }
        }
    }



    return (
        <View style={global.container}>
            {/* start input Container 2 - Expense Description  */}


            {/* start input Container 2 - Expense Name  */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}> Nombre del gasto</Text>
                <View style={global.row}>
                    <Icon name='reader' size={16} color={'#82AEC0'} />
                    <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('nombreServicio', value)} />
                </View>
            </View>

            {/* start input Container 3 - Expense price*/}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Valor del gasto</Text>
                <View style={global.row}>
                    <Icon name='logo-usd' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='numeric' style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('valorGasto', parseInt(value))} />
                </View>
            </View>

            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Descripción</Text>
                <View style={global.row}>
                    <Icon name='receipt' size={16} color={'#82AEC0'} />
                    <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('descripcion', value)} />
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={global.button}
                onPress={() => saveExpense()}>
                <Text style={global.buttonText}>Guardar</Text>
            </TouchableOpacity>

        </View>
    );

}
export default AddExpenseScreen;

