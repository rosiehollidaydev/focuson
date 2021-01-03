import * as React from 'react';

import { AddParamList, BottomTabParamList, HomeParamList, ProfileParamList } from '../types';

import AddScreen from '../screens/AddScreen';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import useColorScheme from '../hooks/useColorScheme';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        inactiveTintColor: '#EB7100', 
        activeTintColor: '#EB7100',
        showLabel:false, 
      style: {
        backgroundColor: '#fff',
        height:100,
        borderTopWidth:0
      } }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={AddNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="add-circle" size={80} color={'#8AE8FF'} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: 20 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </HomeStack.Navigator>
  );
}

const AddStack = createStackNavigator<AddParamList>();

function AddNavigator() {
  return (
    <AddStack.Navigator>
      <AddStack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </AddStack.Navigator>
  );
}


const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </ProfileStack.Navigator>
  );
}
