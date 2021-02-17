import { StatusBar } from 'expo-status-bar';
import React, { Component }  from 'react';

import firebase from 'firebase';
import {  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from  '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import  LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main'
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';

import { View, Text } from 'react-native';


import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))


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
            <Stack.Screen name='Login' component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = 'Main'>
            <Stack.Screen name='Main' component={MainScreen}  />
            <Stack.Screen name='Add' component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name='Save' component={SaveScreen} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;


