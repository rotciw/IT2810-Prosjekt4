import {
    StyleSheet, Dimensions,
} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textContainer: {
        backgroundColor: '#2D2D2D',
        padding: 15,
        width: '100%',
        alignSelf: 'stretch',
        width: Dimensions.get('window').width
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
    },
    backButton: {
        backgroundColor: '#cf5c36',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 10,
        marginHorizontal: 15
    },
    divider: {
        paddingBottom: 15,
        paddingHorizontal: 15,
        textAlign: 'center',
    }
});