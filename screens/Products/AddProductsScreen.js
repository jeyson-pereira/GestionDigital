import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {global} from '../../styles/global'

const RegistersScreen = (props) => {
    //Save product in db
    const saveProduct = () => {
        /**
         * TODO!: VALIDAR LOS DATOS EN BLANCO
         */
        if (state.nombre.trim() === '' || state.precio === '' ||
            state.cantidad === '') {
            alert('Complete todos los campos')
        } else {
            console.log(state),
                props.navigation.getParam('dbProducts').add(state),
                props.navigation.pop()
        }
    }
    //State
    const [state, setState] = useState({
        nombre: '',
        precio: '',
        cantidad: '',
        descripcion: ''
    })

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    return (
        <View style={global.container}>
            {/* start input Container 1 - Product Name  */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Nombre del producto</Text>
                <View style={global.row}>
                    <Icon name='pricetag' size={16} color={'#82AEC0'} />
                    <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('nombre', value)} />
                </View>
            </View>
            {/* END input Container 1 */}

            {/* start input Container 2 - Sale prices*/}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Precio de venta</Text>
                <View style={global.row}>
                    <Icon name='logo-usd' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='numeric' style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('precio', parseInt(value))} />
                </View>
            </View>
            {/* END input Container 2 */}

            {/* start input Container 3 - Quantity  */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Cantidad</Text>
                <View style={global.row}>
                    <Icon name='duplicate' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='numeric' style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('cantidad', parseInt(value))} />
                </View>
            </View>
            {/* END input Container 3 */}

            {/* start input Container 4 */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Descripción</Text>
                <View style={global.row}>
                    <Icon name='receipt' size={16} color={'#82AEC0'} />
                    <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('descripcion', value)} />
                </View>
            </View>
            {/* END input Container 4 */}
            {/* Submit Button */}
            <TouchableOpacity activeOpacity={0.7} style={global.button}
                onPress={() => saveProduct()}>
                <Text style={global.buttonText}><Icon name='save' size={20} /> Guardar</Text>
            </TouchableOpacity>
        </View >
    );
}
export default RegistersScreen;

