import React, { useCallback } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Text, Image, View, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { styles } from '../../styles/itemModal';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';


function ItemModal(props) {
    //updates favorite
    //If it allready is in favorites, this will be removed
    //If it is not then add it
    //This also updates the icon so it allways matches the state (favorited or not)
    //that the item is in
    updateFavorites = async (favorite) => {
        try {
            let data = await AsyncStorage.getItem('Favorites') || [];
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            let isRemoved = false;
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].Varenummer == favorite.Varenummer) {
                    //Fjerner data om det allerede finnes
                    data.splice(i, 1);
                    isRemoved = true;
                }
            }
            if (!isRemoved) {
                //Legger til data om det ikke finnes fra før
                data.push(favorite);
            }
            await AsyncStorage.removeItem('Favorites');
            await AsyncStorage.setItem('Favorites', JSON.stringify(data));
        } catch (error) {
            // Error saving data
        }
        props.favoriteStore.setFavorite(props.modalStore.modalItem.Varenummer)
    };

    const handleBackButton = useCallback(() => {
        // When backpress, close modal and update favorite page
        props.favoriteStore.getData();
        props.modalStore.setModalInvisible();
    })

    //Renders the item detailed view.
    //Get detailed inforamtion about the item and is able to add/remove to/from favorites
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.modalStore.modalVisible}
            onRequestClose={() => handleBackButton()}
        >
            {/* Scrollview to ensure same behavior for shorter devices */}
            {/* All props that are passed are from the modalstore which is set in the TableItem component */}
            <ScrollView>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.modalStore.modalItem.Varenavn}</Text>
                    </View>
                    <Image
                        style={{ width: '100%', height: 200 }}
                        resizeMode="center"
                        source={{ uri: "https://bilder.vinmonopolet.no/cache/500x500-0/" + props.modalStore.modalItem.Varenummer + "-1.jpg" }} />
                    <View style={styles.divider}>
                        <Text>
                            Varenummer:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Varenummer}</Text>
                        </Text>
                        <Text>
                            Varetype:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Varetype}</Text>
                        </Text>
                        <Text>
                            Land:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Land}</Text>
                        </Text>
                    </View>
                    <View style={styles.divider}>
                        <Text>
                            Volum:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Volum}l</Text>
                        </Text>
                        <Text>
                            Alkoholprosent:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Alkohol}%</Text>
                        </Text>
                        <Text>
                            Årgang:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Argang}</Text>
                        </Text>
                        <Text>Smak: {props.modalStore.modalItem.Smak}</Text>
                    </View>
                    <View style={styles.divider}>
                        <Text>
                            Alkohol Pr. Krone:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.AlkoholPrKrone} kr</Text>
                        </Text>
                        <Text>
                            Literpris:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Literpris} kr</Text>
                        </Text>
                        <Text>
                            Pris:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Pris} kr</Text>
                        </Text>
                        <Text>
                            Emballasjetype:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Emballasjetype}</Text>
                        </Text>
                        <Text>
                            Produktutvalg:<Text style={{ fontWeight: "bold" }}> {props.modalStore.modalItem.Produktutvalg}</Text>
                        </Text>
                        <Text
                            style={{ color: 'blue', fontWeight: "bold" }}
                            onPress={() => {
                                Linking.openURL(props.modalStore.modalItem.Vareurl).catch((err) => console.error('An error occurred', err));
                            }}>
                            Link til produktet</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.updateFavorites(
                            {"Varenummer":props.modalStore.modalItem.Varenummer,
                            "Varenavn":props.modalStore.modalItem.Varenavn,
                            "Volum":props.modalStore.modalItem.Volum,
                            "Pris":props.modalStore.modalItem.Pris,
                            "Literpris":props.modalStore.modalItem.Literpris,
                            "Varetype":props.modalStore.modalItem.Varetype,
                            "Produktutvalg":props.modalStore.modalItem.Produktutvalg,
                            "Smak":props.modalStore.modalItem.Smak,
                            "Land":props.modalStore.modalItem.Land,
                            "Argang":props.modalStore.modalItem.Argang,
                            "Alkohol":props.modalStore.modalItem.Alkohol,
                            "AlkoholPrKrone":props.modalStore.modalItem.AlkoholPrKrone,
                            "Emballasjetype":props.modalStore.modalItem.Emballasjetype,
                            "Vareurl":props.modalStore.modalItem.Vareurl})

                    }}>
                        <View style={styles.backButton}                        >
                            <Ionicons
                                name={props.favoriteStore.favoriteIcon}
                                color="white"
                                size={16}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleBackButton() }}>
                        <View style={styles.backButton}                        >
                            <Text style={{ color: 'white' }}>Tilbake</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal >
    )
}

export default inject('modalStore', 'favoriteStore')(observer(ItemModal));