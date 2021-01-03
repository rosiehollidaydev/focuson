/** @format */

import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { loadSettings } from '../storage/settingsStorage';

export default class AddNewWelcome extends React.Component {
	async componentDidMount() {
		const initialState = await loadSettings();

		this.setState(initialState);
	}
	

    async componentDidUpdate(){
        const initialState = await loadSettings();

		this.setState(initialState);
    }
    

	constructor(props) {
		super(props);
        this.state = { name: '', image: '' };

	}
	render() {
		return (
			<View style={styles.container}>
				
						{
						this.state.image !== '' &&
						<Image
							style={styles.profileImage}
							source={{ uri: this.state.image }}
						/>
						}
						{
						this.state.image === '' &&
						<Image
							style={styles.profileImage}
							source={require('../assets/images/default.jpg') }
						/>
						}
						<Text style={styles.text}>
							<Text style={styles.hey}>Hey, </Text>
							<Text style={styles.name}>{this.state.name}</Text>
						</Text>
						<Text style={styles.welcome}>What do you need to add?</Text>
					</View>
		);
	}
}

const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
	container: {
		left: 30,
    },	
	profileImage: {
		borderRadius: 50,
		height: 70,
		width: 70,
	},
	text: {
		marginTop: 20,
	},
	hey: {
		color: 'black',
		fontSize: 30,
	},
	name: {
		color: 'white',
		fontSize: 30,
	},
	welcome: {
		color: 'black',
		fontSize: 20,
	},
	image: {
        flex: 1,
        position: 'absolute',
        resizeMode: 'cover',
        width: 300,
        height: 400,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        transform:[{rotate:'106deg'}],
        alignItems: 'center'
	},
});
