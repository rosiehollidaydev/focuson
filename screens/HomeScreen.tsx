import * as Font from "expo-font";
import * as React from 'react';

import { Text, View } from '../components/Themed';

import Days from '../components/Days';
import EditScreenInfo from '../components/EditScreenInfo';
import PageContainer from "../components/PageContainer";
import { StyleSheet } from 'react-native';
import Welcome from '../components/Welcome';

export default function HomeScreen() {
  return (
    <View  style={{ flex:1, flexDirection:'column', backgroundColor:'white' }}>
      <PageContainer/>
      <Welcome/>
      <Days/>
    </View>
  );
}

