import React, { useEffect } from "react";
import { View, Text, AppState } from 'react-native'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login'
import Signup from './screens/Signup'
import Home from './screens/Home'
import Groups from './screens/Groups'
import Profile from './screens/Profile'
import Vote from './screens/Vote'
import VoteSession from "./screens/VoteSession";
import RestarauntDetailed from './screens/RestarauntDetailed'

import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import SWR from "./SWR";
import { globalColors } from "./utils/styles";
import Group from "./screens/Group";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import NewVoteSession from "./screens/NewVoteSession";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true, tabBarLabel: () => null, headerShown: false, gestureEnabled: false, tabBarStyle: { borderTopWidth: 0, backgroundColor: globalColors.gray, marginBottom: 20, marginLeft: '3%', marginRight: '3%', borderRadius: 10, height: 55 } }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <AntDesign name="home" size={25} color={color} />
          },
        }}
        name="Home"
        component={Home} />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <MaterialIcons name="how-to-vote" size={25} backgroundColor={color} color={color} />
          },
        }}
        name="Vote"
        component={Vote} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <Feather name="users" size={25} backgroundColor={color} color={color} />
          },
        }}
        name="Groups"
        component={Groups} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            let color;
            color = focused ? globalColors.pink : globalColors.lightgray
            return <Feather name="user" size={25} color={color} />
          },
        }}
        name="Profile"
        component={Profile} />
    </Tab.Navigator>
  );
}

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen options={{ gestureEnabled: false }} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name='VoteSession' component={VoteSession} />
        <Stack.Screen name='Group' component={Group} />
        <Stack.Screen name='RestarauntDetailed' component={RestarauntDetailed} />
        <Stack.Screen name='NewSession' component={NewVoteSession} />
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