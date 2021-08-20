import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import firebase from '../../config'
import {global} from '../../styles/global'
class LoadingScreen extends Component {
    /**
     * *Validate if there is a user connected to navigate in the App or otherwise go to Login first
     */
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    //AuthStateChanged
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                this.props.navigation.navigate('App');
            }
            else {
                this.props.navigation.navigate('Auth');
            }
        }.bind(this));
    }
    render() {
        return (
            <View style={global.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}
export default LoadingScreen;


