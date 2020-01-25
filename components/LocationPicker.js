import React from 'react'
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native'

const LocationPicker = props => {
    const getLocationHandler = () => {
        console.log('hello')
    }
    return <View style={styles.locationPicker}>
        <View>
            <Text>No location chosen yet!</Text>

        </View>
        <Button 
        title="Get User Location"
        onPress={getLocationHandler}
        />
    </View>
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,

    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor:'#ccc',
        borderWidth: 1
    }
});

export default LocationPicker