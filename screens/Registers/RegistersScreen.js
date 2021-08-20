import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class RegistersScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>RegistersScreen</Text>
            </View>
        );
    }
}
export default RegistersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});