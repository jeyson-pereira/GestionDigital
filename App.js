import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import AppContainer from './navigation/Navigation'
import firebase from './config';

export default class App extends React.Component {



  render( ) {
    LogBox.ignoreLogs(['Setting a timer','SDK 41']);
    LogBox.ignoreAllLogs(true);
    return (
      <AppContainer />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
