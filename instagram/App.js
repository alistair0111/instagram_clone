import { StatusBar } from 'expo-status-bar';
import React, { Component }  from 'react';

import firebase from 'firebase';
import {  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from  '@react-navigation/stack';

import  LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import { View, Text } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyBe_9-5trmm06O-aFc3UpcUZfZaVaXLekQ",
    authDomain: "instagram-dev-c9e6d.firebaseapp.com",
    projectId: "instagram-dev-c9e6d",
    storageBucket: "instagram-dev-c9e6d.appspot.com",
    messagingSenderId: "217906328407",
    appId: "1:217906328407:web:42d24cfeef18e720160412",
    measurementId: "G-K7Q1VW18WG"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style = {{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      );
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = 'Landing'>
            <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <View style = {{ flex: 1, justifyContent: 'center'}}>
        <Text>User Logged In</Text>
      </View>
    )
  }
}

export default App;

