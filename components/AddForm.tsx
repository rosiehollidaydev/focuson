/** @format */

import {
	Button,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { loadSettings, saveSettings } from '../storage/settingsStorage';

import DatePicker from 'react-native-datepicker';
import React from 'react';
import moment from 'moment';

export default class AddForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			textValue: '',
			completed: false,
			dueDate:  moment().toDate(),
			dueTime: '',
			todos: [],
			visible: false,
			dateStr: '',
		};
	}

	async componentDidMount() {
		const initialState = await loadSettings();
		this.setState(initialState);
		this.setState({ dueDate :  moment(moment().toDate()).format('DD-MM-YYYY')})
		this.setState({ textValue : '' })
	}


	handleSubmit = () => {
		if (this.state.textValue === '') {
			console.error('No text');
		} else {
			let todos = this.state.todos;
			todos.push({
				id: Math.random(),
				textValue: this.state.textValue,
				completed: this.state.completed,
				dueDate: this.state.dueDate,
				dueTime: this.state.dueTime,
			});
			this.setState({ todos });
			console.log("todos", todos);
			saveSettings(this.state);
			this.setState({ textValue:''} );
			this.setState({ dueDate :  moment(moment().toDate()).format('DD-MM-YYYY')})
		}
	};

	clearTodos = () => {
		this.setState({ todos: [] });
		this.setState({		
			textValue: '',
			dueDate:moment()
		});
		saveSettings(this.state);
	};	

	date = new Date();
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
							value={this.state.textValue}
							onChangeText={(textValue) => this.setState({ textValue })}
						/>
					</View>
					<DatePicker
						style={{ width: 200 }}
						date={this.state.dueDate}
						mode='date'
						placeholder='select date'
						format='DD-MM-YYYY'
						confirmBtnText='Confirm'
						cancelBtnText='Cancel'
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0,
							},
							dateInput: {
								marginLeft: 36,
							},
						}}
						onDateChange={(date) => {
							console.log('selected date ', date);
							this.setState({ dueDate : date });
						}}
					/>
				</ScrollView>
				<View style={styles.inputContainer}>
					<TouchableOpacity
						style={styles.saveButton}
						onPress={this.handleSubmit}>
						<Text style={styles.saveButtonText}>Save</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.inputContainer}>
					<TouchableOpacity style={styles.saveButton} onPress={this.clearTodos}>
						<Text style={styles.saveButtonText}>Clear Todos</Text>
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
