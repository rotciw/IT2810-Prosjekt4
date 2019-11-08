import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { observer, inject } from 'mobx-react';
import {AsyncStorage} from 'react-native';





class FavoriteTable extends Component{
    constructor(props){
        super(props);
        this.state = {
          key: null
        }
    }

    keyExtractor = (item, index) => index.toString()

    storeData = async (favorite) => {
      try {
        let value = await AsyncStorage.getItem('Favorites') || [];
        value.push(favorite)
        await AsyncStorage.removeItem('Favorites');
        await AsyncStorage.clear();
        //console.log(value);
        await AsyncStorage.setItem('Favorites', JSON.stringify(value));
        console.log('Done with adding');
      } catch (error) {
        // Error saving data
        console.log("error");
        
      }
    };
      
    getMyValue = async () => {
      try {
        const value = await AsyncStorage.getItem('Favorites');
        this.setState({key:JSON.parse(value)});
      } catch(e) {
        // read error
      }
    }
      
    
    renderItem = ({ item }) => (
        <ListItem
            title={item.Varenavn}
            leftAvatar={{ source: { uri: "https://bilder.vinmonopolet.no/cache/100x100-0/" + item.Varenummer + "-1.jpg" } }}
            chevron
            bottomDivider
        />
    )

    render() {
      this.storeData({"Varenummer":"6851201","Varenavn":"God Jul fra Piemonte Barbera 2016","Volum":"0.75","Pris":79,"Literpris":"105.33","Varetype":"Rødvin","Produktutvalg":"Bestillingsutvalget","Smak":"Middels fyldig. rund. med fint bærpreg og kompleks og lang ettersmak.","Land":"Italia","Argang":"2016","Alkohol":14,"AlkoholPrKrone":1.329,"Emballasjetype":"Glass","Vareurl":"http://www.vinmonopolet.no/vareutvalg/varedetaljer/sku-6850201","__typename":"product"});
      this.getMyValue();
        return(
            <FlatList
                contentContainerStyle={{ paddingBottom: 35}}
                keyExtractor={this.keyExtractor}
                data={this.state.key}
                renderItem={this.renderItem}
                onEndReachedThreshold={0.1}
                
            />
        )
    }
}

export default FavoriteTable;