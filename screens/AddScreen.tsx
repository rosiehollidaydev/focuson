import * as Font from "expo-font";
import * as React from 'react';

import { Text, View } from '../components/Themed';

import AddForm from '../components/AddForm';
import Days from '../components/Days';
import EditScreenInfo from '../components/EditScreenInfo';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View  style={{ flex:1, flexDirection:'column', backgroundColor:'white' }}>
      <AddForm/>
    </View>
  );
}

