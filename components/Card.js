import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'


const Card = props => {
    return (
    
    <View style={styles.container}>
        <View style={styles.imageView}>
            <Image
			// source={require('../assets/Images/success.png')} 
			source={{uri: props.imageUri}}
			style={styles.image} 
			fadeDuration={1000} />
        </View>
        <View style={styles.textContainer}>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
        </View>
    </View>)
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 120,
        justifyContent: 'space-around'
    },
    imageView:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    image: {
        width: 50,
        height: 50,
    },
    textContainer:{
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

export default Card