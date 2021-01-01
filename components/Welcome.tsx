/** @format */

import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { loadSettings } from '../storage/settingsStorage';

export default class Welcome extends React.Component {
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
				<Image
					source={require('../assets/images/bg.png')}
					style={styles.image}
                    ></Image>

						<Image
							style={styles.profileImage}
							source={{ uri: this.state.image }}
						/>
						<Text style={styles.text}>
							<Text style={styles.hey}>Hey, </Text>
							<Text style={styles.name}>{this.state.name}</Text>
						</Text>
						<Text style={styles.welcome}>Main focus for today?</Text>
					</View>
		);
	}
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 45,
		left: 30,
    },

	background: {
		position: 'absolute',
		height: 100,
	},
	profileImage: {
		borderRadius: 15,
		height: 50,
		width: 50,
	},
	text: {
		marginTop: 40,
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
