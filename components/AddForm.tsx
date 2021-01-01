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

import DatePicker from 'simple-react-native-datepicker';
import DateTimePicker from 'simple-react-native-datepicker';
import React from 'react';

export default class AddForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: Number,
			textValue: '',
			completed: false,
			dueDate: new Date(),
			dueTime: '',
			todos: [],
			visible: false,
			dateStr: '', 
		};
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleTitleChange(name: string) {
		this.setState({ textValue: name });
	}

	handleDateChange(date: Date) {
		this.setState({ dueDate: date });
	}

	async componentDidMount() {
		const initialState = await loadSettings();
		this.setState(initialState);
		console.log('todos', this.state.todos);
	}

	handleSubmit = () => {
		this.setState({
			todos: [
				...this.state.todos,
				{
					id: Math.random(),
					textValue: this.state.textValue,
					completed: this.state.completed,
					dueDate: this.state.dueDate,
					dueTime: this.state.dueTime,
				},
			],
		});
		console.log(this.state.todos);
		this.setState({
			id: '',
			textValue: '',
			completed: false,
			dueDate: new Date(),
			dueTime: '',
		});
		saveSettings(this.state);
	};
	public showDatePicker() {
		this.setState({ visible: true });
	  }
	 
	  public onDateChange(dateStr?: string, date?: Date) {
		if (dateStr === undefined) {
		  dateStr = 'canceled';
		}
		this.setState({ dateStr, dueDate: date, visible: false });
	  }

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
							onChangeText={this.handleTitleChange}
						/>						
					</View>
					<Button onPress={() => this.showDatePicker()} title='Pick a due date' />
						<DatePicker
							visible={this.state.visible}
							onDateChange={(dateStr, dueDate) => this.onDateChange(dateStr, dueDate)}
							date={this.state.dueDate}
						/>
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
