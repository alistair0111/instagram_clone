import React, { Component } from 'react'
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { fetchUser, fetchUserPosts } from '../redux/actions/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import SearchScreen from './main/Search';
import firebase from 'firebase';


const EmptyScreen = ()  => {
    return null
}

const Tab = createMaterialBottomTabNavigator();
export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchUserPosts();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{
                        tabBarIcon: ({ color, size}) => (
                            <MaterialCommunityIcons name="home" color={color} size = {26}/>
                        )
                    }}/>
                <Tab.Screen name="Search" component={SearchScreen} 
                    navigation = { this.props.navigation }
                    options={{
                        tabBarIcon: ({ color, size}) => (
                            <MaterialCommunityIcons name="magnify" color={color} size = {26}/>
                        )
                }}/>
                <Tab.Screen name="AddContainer" component={EmptyScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size}) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size = {26}/>
                        )
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size}) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size = {26}/>
                        )
                }}/>
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
