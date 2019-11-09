import {
    Platform,
    StyleSheet,
    StatusBar
} from 'react-native'

export const styles = StyleSheet.create({

    headerText: {
        fontSize: 25,
        color: '#EEE5E9',
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight,
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D2D2D'
    },
});