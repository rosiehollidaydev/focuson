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
import { Ionicons } from '@expo/vector-icons';
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
				<ScrollView style={styles.scrollView}>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.textInput}
							placeholder='What do you need to do?'
							onBlur={Keyboard.dismiss}
							value={this.state.textValue}
							onChangeText={(textValue) => this.setState({ textValue })}
						/>
					</View>
					<DatePicker
						style={{ width: '80%', alignSelf:'center'}}
						date={this.state.dueDate}
						mode='date'
						placeholder='select date'
						format='DD-MM-YYYY'
						confirmBtnText='Confirm'
						cancelBtnText='Cancel'
						customStyles={{
							dateIcon: {
								display:'none'
							},
							dateInput: {
								backgroundColor:'white',
								marginTop:20,
								height:50,
								borderRadius:10,
							},
						}}
						onDateChange={(date) => {
							console.log('selected date ', date);
							this.setState({ dueDate : date });
						}}
					/>
						<View style={styles.inputContainer}>
					<TouchableOpacity
						style={styles.saveButton}
						onPress={this.handleSubmit}>
							<Ionicons
								name='save'
								color='white'
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
		paddingTop: 50,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems:'center'
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
		fontSize: 18,
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
		width: 200,
		height: 200,
		marginBottom:25
	},
	scrollView:{
		width:'80%',
		height:'68%',
		backgroundColor:'white',
		borderRadius:40,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,

		elevation: 16,
	}
});
