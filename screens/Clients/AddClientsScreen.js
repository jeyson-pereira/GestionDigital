import React, { useState, Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { global } from '../../styles/global'

const RegistersScreen = (props) => {

  const saveClient = () => {
    /**
     * TODO!: VALIDAR LOS DATOS EN BLANCO
     */
    if (state.cliente.trim() === '' || state.telefono === '') {
      alert('Complete todos los campos')
    } else if (state.email.trim() !== '') {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(state.email) === false) {
        console.log('Email is not correct')
        alert('Email invalido')
      } else {
        console.log('Email is correct')
        addDb()
      }
    } else {
      addDb()
    }
  }

  const addDb = () => {
    console.log(state),
      props.navigation.getParam('dbClients').add(state),
      props.navigation.pop()
  }
  //State
  const [state, setState] = useState({
    cliente: '',
    telefono: '',
    email: '',
  })

  const handleChangeText = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  return (
    <View style={global.container}>

      {/* Input - Cliente Name */}
      <View style={global.inputContainer}>
        <Text style={global.inputLabel}> Nombre del cliente</Text>
        <View style={global.row}>
          <Icon name='person' size={16} color={'#82AEC0'} />
          <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
            onChangeText={(value) => handleChangeText('cliente', value)} />
        </View>
      </View>
      {/* Input - Cliente Phone */}
      <View style={global.inputContainer}>
        <Text style={global.inputLabel}>Telefono</Text>
        <View style={global.row}>
          <Icon name='call' size={16} color={'#82AEC0'} />
          <TextInput keyboardType='phone-pad' style={global.input} placeholder="Escribe aquí"
            maxLength={10} onChangeText={(value) => handleChangeText('telefono', value)} />
        </View>
      </View>
      {/* Input - Cliente Email */}
      <View style={global.inputContainer}>
        <Text style={global.inputLabel}>Correo electronico</Text>
        <View style={global.row}>
          <Icon name='mail' size={16} color={'#82AEC0'} />
          <TextInput keyboardType='email-address' autoCapitalize="none" style={global.input} placeholder="Escribe aquí"
            onChangeText={(value) => handleChangeText('email', value)} />
        </View>
      </View>
      {/* Submit Button */}
      <TouchableOpacity activeOpacity={0.7} style={global.button}
        onPress={() => saveClient()}>
        <Text style={global.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );

}
export default RegistersScreen;

