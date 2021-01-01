/** @format */

import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { loadSettings, saveSettings } from '../storage/settingsStorage';

import moment from 'moment';

//import { Constants } from 'expo';

const { width } = Dimensions.get('window');

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = { name: '', image: '', currentDate: new Date(), todos: [] };
	}

	async componentDidMount() {
		const initialState = await loadSettings();
		this.setState(initialState);
		setTimeout(() => {
			this.scrollView.scrollTo({ x: -30 });
		}, 1); // scroll view position fix
	}

	render() {
		const today = this.state.currentDate;
		let days = [];
		for (let i = 0; i < 7; i++) {
			const day = moment(today).add(i, 'days').format('dddd');
			days.push(
				<View
					style={[styles.card, i % 2 == 0 ? styles.view : styles.view2]}
					key={i}>
					<View style={styles.cardContent}>
						<Text style={[styles.dayName,  i % 2 == 0 ? styles.blue : styles.white]}>{day}</Text>
						
					</View>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<ScrollView
					ref={(scrollView) => {
						this.scrollView = scrollView;
					}}
					style={styles.container}
					//pagingEnabled={true}
					horizontal={true}
					decelerationRate={0}
					snapToInterval={width - 60}
					snapToAlignment={'center'}
					contentInset={{
						top: 0,
						left: 40,
						bottom: 0,
						right: 40,
					}}>
					{days}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: '80%',
	},
	card: {
		height: '75%',
		borderRadius: 40,
		borderColor: 'grey',
		marginTop: 100,
		width: width - 150,
		margin: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,

		elevation: 16,
	},
	view: {
		backgroundColor: 'white',
	},
	view2: {
		backgroundColor: '#071A52',
	},
	white:{
		color:'white'
	},
	blue:{
		color:'#071A52'
	},
	cardContent: {
		height:'100%',
		padding:30
	},
	dayName:{
		fontSize:20,
	}
});
