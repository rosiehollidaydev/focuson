import * as Font from "expo-font";
import * as React from 'react';

import { Text, View } from '../components/Themed';

import AddForm from '../components/AddForm';
import AddNewWelcome from "../components/AddNewWelcome";
import Days from '../components/Days';
import EditScreenInfo from '../components/EditScreenInfo';
import PageContainer from "../components/PageContainer";
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View  style={{ flex:1, flexDirection:'column', backgroundColor:'white' }}>
      <PageContainer/>
      <AddNewWelcome/>
      <AddForm/> 
    </View>
  );
}

