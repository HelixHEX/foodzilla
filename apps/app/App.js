import React, { useEffect } from "react";
import { View, Text, AppState } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login'
import Signup from './screens/Signup'
import Home from './screens/Home'
import Search from './screens/Search'
import Profile from './screens/Profile'

import { AntDesign, Feather } from '@expo/vector-icons'
import SWR from "./SWR";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabel: () => null, headerShown: false, gestureEnabled: false, tabBarStyle: { borderTopWidth: 0, backgroundColor: '#1f1f1f', marginBottom: 20, marginLeft: 10, marginRight: 10, borderRadius: 10, height: 70 } }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? '#f75483' : '#8395a7'
            return <AntDesign name="home" size={30} color={color} />
          },
        }}
        name="Home"
        component={Home} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? '#f75483' : '#8395a7'
            return <Feather name="search" size={30} backgroundColor={color} color={color} />
          },
        }}
        name="Bookmark"
        component={Search} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? '#f75483' : '#8395a7'
            return <Feather name="bookmark" size={30} backgroundColor={color} color={color} />
          },
        }}
        name="Search"
        component={Search} />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? '#f75483' : '#8395a7'
            return <Feather name="user" size={30} color={color} />
          },
        }}
        name="Profile"
        component={Profile} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen options={{ gestureEnabled: false }} name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainApp = () => {
  return (
    <>
      <SWR>
        <App />
      </SWR>
    </>
  )
}

export default MainApp