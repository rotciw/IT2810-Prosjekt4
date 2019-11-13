import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    itemText: {
        flex: 12,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    itemImage: {
        flex: 1,
        height: 64,
        width: 32,
        resizeMode: "contain",
        alignSelf: 'flex-start',
        padding: 20
    },
    title: {
        marginLeft: 20,
        fontWeight: "bold",
    },
    subtitle: {
        marginLeft: 20,
        opacity: 0.6
    },
    chevron: {
        flex:1,
        justifyContent: 'center',
    }
})
