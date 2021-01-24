/** @format */

import * as ImagePicker from 'expo-image-picker';

import {
	Button,
	Image,
	ImageBackground,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { Component } from 'react';
import { loadSettings, saveSettings } from '../storage/settingsStorage';

import { Ionicons } from '@expo/vector-icons';

export default class ProfileForm extends React.Component {
	async componentDidMount() {
		const initialState = await loadSettings();

		this.setState(initialState);
	}
	handleNameChange(name: string) {
		this.setState({ name: name });
	}

	setImage(uri: string) {
		this.setState({ image: uri });
	}
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = { name: '', image: '' };

		this.handleNameChange = this.handleNameChange.bind(this);
	}
	handleSubmit() {
		saveSettings(this.state);
	}

	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
		});
		if (!pickerResult.cancelled) {
			this.setState({ image: pickerResult.uri });
		}
	};

	clearAllState = () => {
		this.setState({ name: '', image: '' });
		saveSettings(this.state);
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.inputContainer}>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							{this.state.image !== '' &&
							<ImageBackground
								imageStyle={{ borderRadius: 20, borderColor:'white', borderWidth:5 }}
								source={{ uri: this.state.image }}
								style={styles.image}>
								<Ionicons
									name='camera-sharp'
									color='white'
									size={30}
									style={{ bottom: 5, right: 5, position: 'absolute' }}
									onPress={this._pickImage}
								/>
							</ImageBackground>
								}
								{this.state.image === '' &&
								<Ionicons
								name='camera-sharp'
								color='white'
								size={30}
								style={{ bottom: 5, right: 5, position: 'absolute' }}
								onPress={this._pickImage}
							/>
								}
						</View>
						<TextInput
							style={styles.textInput}
							maxLength={20}
							placeholder={'Name'}
							onBlur={Keyboard.dismiss}
							value={this.state.name}
							onChangeText={this.handleNameChange}
						/>
					</View>
					<View style={styles.inputContainer}>
						<TouchableOpacity
							style={styles.saveButton}
							onPress={this.handleSubmit}>
							<Ionicons
								name='save'
								color='#8AE8FF'
								size={40}
								style={{ top: 10, left: 10, position: 'absolute' }}
							/>

							<Text style={styles.saveButtonText}>Save</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		paddingTop: 135,
		backgroundColor: 'transparent',
		justifyContent: 'center',
	},
	header: {
		fontSize: 40,
		textAlign: 'left',
		margin: 10,
		fontWeight: 'bold',
	},
	inputContainer: {
		paddingTop: 15,
		alignItems:'center'
	},
	textInput: {
		borderRadius:10,
		backgroundColor: 'white',
		width:'80%',
		height: 50,
		fontSize: 25,
		paddingLeft:10,
		borderWidth: 2,
		borderColor:'#8AE8FF'
	},
	saveButton: {
		width: '80%',
		borderColor: '#8AE8FF',
		backgroundColor: '#8AE8FF',
		padding: 15,
		margin: 5,
	},
	saveButtonText: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center',
	},
	image: {
		left: 0,
		width: 100,
		height: 100,
		marginBottom:25
	},
});
