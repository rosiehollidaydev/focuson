/** @format */

import * as ImagePicker from 'expo-image-picker';

import {
	Button,
	Image,
	Keyboard,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { Component, useState } from 'react';
import { loadSettings, saveSettings } from '../storage/settingsStorage';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default class AddForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            todos: [],
		};
	}
    todo={
        id:'',
        textValue:'',
        completed:false,
        dueDate:''
    }
    
	async componentDidMount() {
		const initialState = await loadSettings();
        this.setState(initialState);
        console.log("todos", this.state.todos);
    }

    handleSubmit = () => {
        this.setState({todos:[...this.state.todos, {id:Math.random(), textValue:'hello', completed:false}]})
        console.log(this.state.todos);
        saveSettings(this.state);
    }
    
	
	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.header}>Add a new item</Text>
				</View>
				<ScrollView>
					<View style={styles.inputContainer}>
						<Text>What do you need to do?</Text>
						<TextInput
							style={styles.textInput}
							maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={this.todo.textValue}
						/>
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
		marginBottom: 12,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 15,
		color: '#fff',
	},
});
