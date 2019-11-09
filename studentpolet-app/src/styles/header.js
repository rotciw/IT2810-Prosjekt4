import {
    Platform,
    StyleSheet,
    StatusBar
} from 'react-native'

export const styles = StyleSheet.create({

    headerText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight,
        paddingTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D2D2D'
    },
});