/** @format */

import { CheckBox, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

const Item = (props) => {
	const [isSelected, setSelection] = useState(false);
    if(props.dueDate.toString().substring(0,10) == props.currentDate.toString().substring(0,10) &&
     props.name != '')
    {
        return  ( 
            
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={props.checked}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text
                    style={[props.id % 2 == 0 ? styles.blue : styles.white, styles.label]}>
                    {props.name}
                </Text>
            </View>
        </View> 
        
        )
    }
     else{
         return(
             <></>
         )  
     }
}
const styles = StyleSheet.create({
	container: {
        flex: 1,
        height:80,
		justifyContent: 'center',
	},
	checkboxContainer: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	checkbox: {
		alignSelf: 'center',
	},
	label: {
		margin: 8,
	},
	white: {
		color: 'white',
	},
	blue: {
		color: '#071A52',
	},
});

export default Item;
