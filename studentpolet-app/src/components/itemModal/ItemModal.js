import React from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Text, Image, View, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { styles } from '../../styles/itemModal';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import { string } from 'prop-types';
import FavoriteTable from '../favoriteTable/FavoriteTable'


function ItemModal(props) {
    
    storeData = async (favorite) => {
        try {
          let data = await AsyncStorage.getItem('Favorites') || [];          
          if (typeof data === 'string'){
            data = JSON.parse(data);
          }
          data.push(favorite);
          await AsyncStorage.removeItem('Favorites');
          await AsyncStorage.setItem('Favorites', JSON.stringify(data));
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      };
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.modalStore.modalVisible}
            onRequestClose={()=>props.modalStore.setModalInvisible()}
        >
            <SafeAreaView style={styles.container}>
                <View>
<<<<<<< HEAD
                    <View style={styles.divider}>
                        <Image
                            style={{ width: '100%', height: 200 }}
                            resizeMode="center"
                            source={{ uri: "https://bilder.vinmonopolet.no/cache/500x500-0/" + props.itemNumber + "-1.jpg" }} />

=======
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.itemName}</Text>
>>>>>>> dev
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
                            Literpris:<Text style={{ fontWeight: "bold" }}> {props.itemLitrePrice} kr</Text>
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
<<<<<<< HEAD
                    <TouchableOpacity onPress={() => { 
                        this.storeData(
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
                            "Vareurl":props.itemLink})
                    }}>
                        <View style={styles.backButton}                        >
                            <Ionicons
                                name="md-heart-empty"
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
=======
                    <View style={styles.divider}>
                        <TouchableOpacity onPress={() => { props.modalStore.setModalInvisible() }}>
                            <View style={styles.backButton}                        >
                                <Ionicons
                                    name="md-heart-empty"
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
>>>>>>> dev
                </View>
            </SafeAreaView>
        </Modal >
    )
}

export default inject('modalStore')(observer(ItemModal));