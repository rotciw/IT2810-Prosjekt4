import {
    StyleSheet,
} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    textContainer: {
        margin:0,
        backgroundColor: '#2D2D2D',
        padding: 15,
        width: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
    },
    backButton: {
        marginTop: 15,
        backgroundColor: '#cf5c36',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    divider: {
        padding: 10,
        textAlign: 'center',
    }
});