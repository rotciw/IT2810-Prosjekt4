import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({

    filterButtonContainer: {
        position: "absolute",
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        top: Dimensions.get('window').height / 1.2,
        left: Dimensions.get('window').width / 1.35,
    },
    filterButton: {
        height: 50,
        width: 50,
        borderRadius: 100,
        paddingTop: 7,
        backgroundColor: '#CF5C36',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // Android
    },
    applyButtonContainer: {
        position: "absolute",
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: Dimensions.get('window').height / 1.16,
    },
    applyButton: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: '#2f95dc',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 3 // Android
    },
    filterButtonGroup: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: Dimensions.get('window').width/6.2,
    },
    buttonContainer: {
        marginBottom: 10,
        marginHorizontal: 5,
    },
    resetFilters: {
        // Some spacing for reset filter button so it doesnt collide with apply button
        marginTop: 10,
        height: Dimensions.get('window').height/5.5
    },
    sliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10%',
    }
})