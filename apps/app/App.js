import React, { useEffect } from "react";
import { View, Text, AppState } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login'
import Signup from './screens/Signup'
import Home from './screens/Home'
import Group from './screens/Group'
import Profile from './screens/Profile'
import Vote from './screens/Vote'

import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import SWR from "./SWR";
import { globalColors } from "./utils/styles";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true, tabBarLabel: () => null, headerShown: false, gestureEnabled: false, tabBarStyle: { borderTopWidth: 0, backgroundColor: globalColors.gray, marginBottom: 20, marginLeft: '3%', marginRight: '3%', borderRadius: 10, height: 70 } }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <AntDesign name="home" size={35} color={color} />
          },
        }}
        name="Home"
        component={Home} />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <MaterialIcons name="how-to-vote" size={35} backgroundColor={color} color={color} />
          },
        }}
        name="Vote"
        component={Vote} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <Feather name="users" size={35} backgroundColor={color} color={color} />
          },
        }}
        name="Group"
        component={Group} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <Feather name="user" size={35} color={color} />
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