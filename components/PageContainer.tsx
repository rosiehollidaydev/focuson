/** @format */

import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const { width } = Dimensions.get('window');


export default class PageContainer extends React.Component {

	render() {
		return (
			<View style={styles.container}>
			  <LinearGradient
				  		start={[0, 0]} end={[1, 0]}
						colors={['#EB7100', '#8AE8FF']}
						style={styles.background}
					/>
			</View>
		);
	}
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


const styles = StyleSheet.create({
	container: {
		paddingTop: 45,
    },

	background: {
		position: 'absolute',
		width: width,
		height: 250,
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50
	  },
});
