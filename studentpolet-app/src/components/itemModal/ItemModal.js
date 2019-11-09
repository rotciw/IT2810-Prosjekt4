import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Text, Image, View, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { styles } from '../../styles/itemModal';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { string } from 'prop-types';
import FavoriteTable from '../favoriteTable/FavoriteTable'


function ItemModal(props) {

    const [favoriteIcon, setFavoriteIcon] = useState("md-heart-empty");

    updateFavorites = async (favorite) => {
        try {
            let data = await AsyncStorage.getItem('Favorites') || [];          
            if (typeof data === 'string'){
              data = JSON.parse(data);
            }
            let isRemoved = false;
            for(let i = data.length - 1; i >= 0; i--) {
                if(data[i].Varenummer == favorite.Varenummer) {
                    //Fjerner data om det allerede finnes
                   data.splice(i, 1);
                   isRemoved = true;
                   console.log("Data removed")
                }
            }
            if (!isRemoved){
                //Legger til data om det ikke finnes fra før
                data.push(favorite);
                console.log("Data added");
            }
            await AsyncStorage.removeItem('Favorites');
            await AsyncStorage.setItem('Favorites', JSON.stringify(data));
          } catch (error) {
            // Error saving data
            console.log(error);
          }
    };

    isFavorite = async (itemNumber) => {
        try {
            let data = await AsyncStorage.getItem('Favorites') || [];
            data = JSON.parse(data);
            console.log(data)
            let found = false;
            for(let i = data.length - 1; i >= 0; i--) {
                if(data[i].Varenummer === itemNumber) {
                setFavoriteIcon('md-heart');
                found = true
                }
        }
        if (!found){
            setFavoriteIcon('md-heart-empty');
        }
        } catch (error){
            
        }
        
    }
    return (
        
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.modalStore.modalVisible}
            onRequestClose={() => props.modalStore.setModalInvisible()}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.itemName}</Text>
                    </View>
                    <Image
                        style={{ width: '100%', height: 200 }}
                        resizeMode="center"
                        source={{ uri: "https://bilder.vinmonopolet.no/cache/500x500-0/" + props.itemNumber + "-1.jpg" }} />
                    <View style={styles.divider}>
                        <Text>
                            Varenummer:<Text style={{ fontWeight: "bold" }}> {props.itemNumber}</Text>
                        </Text>
                        <Text>
                            Varetype:<Text style={{ fontWeight: "bold" }}> {props.itemType}</Text>
                        </Text>
                        <Text>
                            Land:<Text style={{ fontWeight: "bold" }}> {props.itemCountry}</Text>
                        </Text>
                    </View>
                    <View style={styles.divider}>
                        <Text>
                            Volum:<Text style={{ fontWeight: "bold" }}> {props.itemVolume}l</Text>
                        </Text>
                        <Text>
                            Alkoholprosent:<Text style={{ fontWeight: "bold" }}> {props.itemAlcoholPercentage}%</Text>
                        </Text>
                        <Text>
                            Årgang:<Text style={{ fontWeight: "bold" }}> {props.itemYear}</Text>
                        </Text>
                        <Text>Smak: {props.itemTaste}</Text>
                    </View>
                    <View style={styles.divider}>
                        <Text>
                            Alkohol Pr. Krone:<Text style={{ fontWeight: "bold" }}> {props.itemAlcoholPerNok} kr</Text>
                        </Text>
                        <Text>
                            Literpris:<Text style={{ fontWeight: "bold" }}> {props.itemLitrePrice} kr</Text>
                        </Text>
                        <Text>
                            Pris:<Text style={{ fontWeight: "bold" }}> {props.itemPrice} kr</Text>
                        </Text>
                        <Text>
                            Emballasjetype:<Text style={{ fontWeight: "bold" }}> {props.itemPackaging}</Text>
                        </Text>
                        <Text>
                            Produktutvalg:<Text style={{ fontWeight: "bold" }}> {props.itemSelection}</Text>
                        </Text>
                        <Text
                            style={{ color: 'blue', fontWeight: "bold" }}
                            onPress={() => {
                                Linking.openURL(props.itemLink).catch((err) => console.error('An error occurred', err));
                            }}>
                            Link til produktet</Text>
                    </View>
                    <TouchableOpacity onPress={() => { 
                        this.updateFavorites(
                            {"Varenummer":props.itemNumber,
                            "Varenavn":props.itemName,
                            "Volum":props.itemVolume,
                            "Pris":props.itemPrice,
                            "Literpris":props.itemLitrePrice,
                            "Varetype":props.itemType,
                            "Produktutvalg":props.itemSelection,
                            "Smak":props.itemTaste,
                            "Land":props.itemCountry,
                            "Argang":props.itemYear,
                            "Alkohol":props.itemAlcoholPercentage,
                            "AlkoholPrKrone":props.itemAlcoholPerNok,
                            "Emballasjetype":props.itemPackaging,
                            "Vareurl":props.itemLink}),
                            this.isFavorite(props.itemNumber)
                    }}>
                        <View style={styles.backButton}                        >
                            <Ionicons
                                name={favoriteIcon}
                                color="white"
                                size={16}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.modalStore.setModalInvisible() }}>
                        <View style={styles.backButton}                        >
                            <Text style={{ color: 'white' }}>Tilbake</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default inject('modalStore')(observer(ItemModal));