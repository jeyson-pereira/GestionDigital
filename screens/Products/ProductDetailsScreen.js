import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { global } from '../../styles/global'


const ProductDetails = (props) => {
    //Loading para Loading Screen
    const [loading, setLoading] = useState(false);

    //State Producto
    const [state, setState] = useState({
        id: props.navigation.state.params.product.id,
        nombre: props.navigation.state.params.product.nombre,
        precio: props.navigation.state.params.product.precio,
        cantidad: props.navigation.state.params.product.cantidad,
        descripcion: props.navigation.state.params.product.descripcion
    })

    //Product Document de Firestore
    const docProduct = props.navigation.getParam('dbProducts').doc(props.navigation.state.params.product.id);

    //handleChangeText Formulario a State Producto 
    const handleChangeText = (name, value) => {
        if (name === 'precio' && isNaN(value)) {
            setState({ ...state, [name]: 0 })
        } else {
            setState({ ...state, [name]: value })
        }
    }

    //State Modal
    const [modal, setModal] = useState({
        modalUpdate: false,
        modalDelete: false,
        modalInventory: false
    })
    //Alter State Modal
    const setModalVisible = (modalSelect, visible) => {
        setModal({ ...modal, [modalSelect]: visible });
    }

    //Func Delete Product
    const deleteProduct = () => {
        setLoading(true);
        docProduct.delete().then(() => {
            setLoading(false);
            console.log("Document successfully deleted!")
            setModalVisible('modalDelete', !modal.modalDelete)
            props.navigation.pop()
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    //Func Update Product
    const updateProduct = () => {
        if(JSON.stringify(state) === JSON.stringify(props.navigation.state.params.product)){
            setModalVisible('modalUpdate', !modal.modalUpdate)
            return alert("No hay cambios para actualizar!");
        }

        if (state.nombre.trim() === '' || state.precio === '' ||
            state.cantidad === '') {
            alert('Complete todos los campos')
        } else {
            setLoading(true);
            docProduct.update(state)
                .then(() => {
                    setLoading(false);
                    console.log("Document successfully updated!");
                    setModalVisible('modalUpdate', !modal.modalUpdate)
                    props.navigation.pop()
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }
    }

    //Func Modificar Inventario
    const [newCant, setNewCant] = useState(0);
    const handleChangeCant = (value) => {
        if (isNaN(value)) {
            setNewCant(0)
        } else {
            setNewCant(value)
        }
    }
    //Añadir a inventario
    const addInventario = () => {
        if (newCant != 0 && newCant > 0) {
            console.log("Vamos a aumentar nuestro inventario");
            let sum = (state.cantidad + newCant)
            setState({ ...state, cantidad: sum })
            setNewCant(0)
        }else{
            console.log("No hay cantidad para añadir");
        }
    }
    //Retirar de inventario
    const removeInventario = () => {
        if (newCant != 0 && newCant > 0 && newCant <= state.cantidad) {
            console.log("Vamos a reducir nuestro inventario");
            let sum = (state.cantidad - newCant)
            setState({ ...state, cantidad: sum })
            setNewCant(0)
        }else{
            console.log("No hay cantidad para remover");
        }
    }
    //Salir modalInventario
    const goBack = () => {
        setNewCant(0);
        setModalVisible('modalInventory', !modal.modalInventory);
        if (state.cantidad != props.navigation.state.params.product.cantidad) {
            alert('No olvides guardar tus cambios!');
        }
    }

    /*
    ! VISTA DE ELEMENTOS EN PANTALLA
    */
    // Loading Screen (Update / Delete document)
    if (loading) {
        return (
            <View style={global.loader}>
                <ActivityIndicator size="large" color="#046CA0" />
            </View>
        );
    }

    return (
        <View style={global.container}>
            {/* Input  - Product Name  */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Nombre del producto</Text>
                <View style={global.row}>
                    <Icon name='pricetag' size={16} color={'#82AEC0'} />
                    <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('nombre', value)}
                        value={state.nombre}
                    />
                </View>
            </View>
            {/* Input - Product Price*/}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Precio de venta</Text>
                <View style={global.row}>
                    <Icon name='logo-usd' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='numeric' style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('precio', parseInt(value))}
                        value={state.precio.toString()}
                    />
                </View>
            </View>
            {/* Input - Product Amount  */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Cantidad</Text>
                <View style={global.row}>
                    <Icon name='duplicate' size={16} color={'#82AEC0'} />
                    <TextInput keyboardType='numeric' style={global.input} placeholder="Escribe aquí"
                        editable={false}
                        value={state.cantidad.toString()}
                    />
                    <TouchableOpacity activeOpacity={0.7} style={{ right: 40 }}
                        onPress={() => setModalVisible('modalInventory', !modal.modalInventory)} >
                        <Icon size={40} name='caret-down-circle' color='#046CA0' />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Input - Product Description */}
            <View style={global.inputContainer}>
                <Text style={global.inputLabel}>Descripción</Text>
                <View style={global.row}>
                    <Icon name='receipt' size={16} color={'#82AEC0'} />
                    <TextInput autoCapitalize="sentences" style={global.input} placeholder="Escribe aquí"
                        onChangeText={(value) => handleChangeText('descripcion', value)}
                        value={state.descripcion}
                        //multiline={true}
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
                <Text style={global.buttonText}><Icon name='trash' size={20} /> Eliminar producto</Text>
            </TouchableOpacity>
            {/* -------------------------MODALES---------------------- */}
            {/* Modal Confirmación Eliminar */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.modalDelete}>
                <View style={global.centeredView}>
                    <View style={global.modalView}>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>
                            Está seguro que desea eliminar este producto?
                        </Text>
                        <View style={global.row}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.confirm}
                                onPress={() => deleteProduct()}>
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
                            Está seguro que desea actualizar este producto?
                        </Text>
                        <View style={global.row}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.confirm}
                                onPress={() => updateProduct()}>
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
            {/* Modal Administrar Inventario */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.modalInventory}>
                <View style={global.centeredView}>
                    <View style={global.modalView}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                            Inventario actual: {state.cantidad}
                        </Text>
                        <Text>Ingrese la cantidad a añadir o retirar</Text>
                        {/* Modal Input - value to edit Inventory */}
                        <View style={global.inputContainer}>
                            <TextInput
                                keyboardType='numeric' style={global.input} placeholder="Escribe aquí"
                                value={newCant.toString()}
                                onChangeText={(value) => handleChangeCant(parseInt(value))}
                            />
                        </View>
                        <View style={global.row}>
                            {/* Add Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.confirm}
                                onPress={() => addInventario()}>
                                <Text style={{ color: '#046CA0', fontSize: 14, fontWeight: 'bold' }}>
                                    <Icon name='add' /> Agregar
                                </Text>
                            </TouchableOpacity>
                            {/* Remove Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.cancel}
                                onPress={() => removeInventario()}>
                                <Text style={{ color: '#a00404', fontSize: 14, fontWeight: 'bold' }}>
                                    <Icon name='remove' /> Retirar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={global.row}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={global.delete}
                                onPress={() => goBack()}>
                                <View style={global.row}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cerrar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View >
    );
}
export default ProductDetails;

