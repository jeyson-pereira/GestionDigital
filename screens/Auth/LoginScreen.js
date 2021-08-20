import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, StatusBar } from "react-native";
import * as Google from 'expo-google-app-auth';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase, { db } from '../../config';
import credentials from '../../credentials.json';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    /**
                     * * With 'isUserEqual' We don't need to reauth the Firebase connection.
                     */
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = (googleUser) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            /**
             * * Check if we are already signed-in Firebase with the correct user.
             */
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                /**
                 * * Build Firebase credential with the Google ID token.
                 */
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accesToken
                );
                /**
                 * * Sign in with credential from the Google user.
                 */
                firebase.auth().signInWithCredential(credential).then(function (result) {
                    /**
                     * * if isNewUser set data in firestore Cloud
                     */
                    if (result.additionalUserInfo.isNewUser) {
                        db.collection('Users').doc(result.user.uid).set({
                            gmail: result.user.email,
                            profile_picture: result.additionalUserInfo.profile.picture,
                            first_name: result.additionalUserInfo.profile.given_name,
                            last_name: result.additionalUserInfo.profile.family_name,
                            created_at: firebase.firestore.Timestamp.now(),
                        })
                            .then(function (snapshot) {
                            });
                    } else {
                        /**
                         * * else only set last_logged_in
                         */
                        db.collection('Users').doc(result.user.uid).update({
                            last_logged_in: firebase.firestore.Timestamp.now(),
                        });
                    }
                })
                    .catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
        this.setState({
            loading: true
        });
    }

    /**
     * * ClientIDS from credentials given by GoogleCloud
     */
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: credentials.androidClientId,
                androidStandaloneAppClientId: credentials.androidStandaloneClientId,
                //iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#046CA0" />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#046CA0" />
                <ImageBackground source={require('../../assets/Background.jpg')} style={styles.background}>
                    <View style={styles.content}>
                        <Text style={styles.textContent}>
                            Esta aplicación está pensada para aquellas micro-empresas o distribuidores
                            que requieren llevar las cuentas de sus rutas diarias de forma segura y eficiente.
                        </Text>
                        <View style={styles.btnContainer}>
                            <Icon.Button name="logo-google" size={24} style={styles.btn} onPress={() => this.signInWithGoogleAsync()}>
                                <Text style={styles.textButton}>
                                    Iniciar sesión con Google</Text>
                            </Icon.Button>
                        </View>
                        <Text style={styles.textInfo}>
                            Tus datos se mantendrán vinculados a tu cuenta de Google. {'\n'}
                            Inicia sesión para registrarte si eres un usuario nuevo o cargar tus
                            datos guardados si ya te encuentras registrado con tu cuenta.
                            </Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end'
    },
    content: {
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    textContent: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        marginHorizontal: 10,
        marginBottom: 20
    },
    btnContainer: {
        width: '70%',
        alignSelf: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    textInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        marginHorizontal: 5,
        marginTop: 20,
    }, loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});

