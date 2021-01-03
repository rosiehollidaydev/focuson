import { Text, View } from 'react-native';

import PageContainer from '../components/PageContainer';
import ProfileForm from '../components/ProfileForm';
import React from 'react';

export default function App() { 
    return (
      <View  style={{ flex:1, flexDirection:'column', backgroundColor:'white' }}>
      <PageContainer/>
        <ProfileForm />
      </View>
    );  
};