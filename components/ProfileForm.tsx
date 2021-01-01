import * as ImagePicker from 'expo-image-picker';

import {
	Button,
	Image,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
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
		this.setState({ name:name });
	}

	setImage(uri: string)
	{
		this.setState({ image: uri })
	}
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = { name: '' , image:''};

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

		this.setState({image : pickerResult.uri})
		}
	};
	
	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.header}>Profile</Text>
				</View>
				<ScrollView>
					<View style={styles.inputContainer}>
						<Text>Name</Text>
						<TextInput
							style={styles.textInput}
							maxLength={20}
							onBlur={Keyboard.dismiss}
							value={this.state.name}
							onChangeText={this.handleNameChange}
						/>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Button title="Pick an image from camera roll" onPress={this._pickImage} />
							<Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
						</View>

					</View>
				</ScrollView>
				<View style={styles.inputContainer}>
					<TouchableOpacity
						style={styles.saveButton}
						onPress={this.handleSubmit}>
						<Text style={styles.saveButtonText}>Save</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 45,
		backgroundColor: 'white',
	},
	header: {
		fontSize: 25,
		textAlign: 'center',
		margin: 10,
		fontWeight: 'bold',
	},
	inputContainer: {
		paddingTop: 15,
	},
	textInput: {
		borderColor: '#CCCCCC',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		height: 50,
		fontSize: 25,
		paddingLeft: 20,
		paddingRight: 20,
	},
	saveButton: {
		borderWidth: 1,
		borderColor: '#007BFF',
		backgroundColor: '#007BFF',
		padding: 15,
		margin: 5,
	},
	saveButtonText: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center',
	},
	button: {
		width: 250,
		height: 60,
		backgroundColor: '#3740ff',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		marginBottom:12    
	  },
	  buttonText: {
		textAlign: 'center',
		fontSize: 15,
		color: '#fff'
	  }
});
