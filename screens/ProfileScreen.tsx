import * as Facebook from 'expo-facebook';

import {
  AuthRequestConfig,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest
} from 'expo-auth-session'
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React , { useContext, useEffect, useState }  from 'react';

const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v6.0/oauth/access_token'
}

const config: AuthRequestConfig = {
  clientId: '455228658973642',
  scopes: ['public_profile', 'user_likes'],
  redirectUri: makeRedirectUri({
    native: 'fb455228658973642://authorize',
    useProxy:true
  }),
  extraParams: {
    display: Platform.select({ web: 'popup' })!
  }
}

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(config, discovery)

  return (
    <View style={styles.container}>
    <Button onPress={() => promptAsync({ useProxy:true })} title="Login" />
    <Text>{JSON.stringify(response, undefined, 2)}</Text>

  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})