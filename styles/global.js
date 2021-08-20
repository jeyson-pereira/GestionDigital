import {
    StyleSheet
} from 'react-native';

export const global = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    /* Estilos para añadir cliente y producto en produtscrenn y clientscreen  */
    AddButton: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#046CA0',
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
    /* Estilos para addProductsScreen y addClientsScreen
    y ProductoDetailsScreen / ClientsDetailsScreen 
    AddSaleScreen */
    button: {
        width: '70%',
        backgroundColor: '#046CA0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        color: '#024C81',
        fontWeight: 'bold',
        fontSize: 16,
        width: '90%'
    },
    inputContainer: {
        width: '70%',
        borderWidth: 1,
        backgroundColor: '#f4f6f8',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
        borderColor: '#046CA0'
    },
    inputLabel: {
        fontSize: 14,
        color: '#82AEC0',
    },
    row: {
        flexDirection: 'row',
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
   



    /* Clients/Products DetailsScreen */
    cancel: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#a00404',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    confirm: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#046CA0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    delete: {
        width: '70%',
        backgroundColor: '#a00404',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3
    },

    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    save: {
        width: '70%',
        backgroundColor: '#046CA0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3
    },
 

});
