import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { observer, inject } from 'mobx-react';
import {AsyncStorage} from 'react-native';

class FavoriteTable extends Component{
    constructor(props){
        super(props);
    }
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('Favorites');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    
    renderItem = ({ item }) => (
        <ListItem
            title={item.Varenavn}
            leftAvatar={{ source: { uri: "https://bilder.vinmonopolet.no/cache/100x100-0/" + item.Varenummer + "-1.jpg" } }}
            chevron
            bottomDivider
        />
    )
    render() {
        return(
            <FlatList
                contentContainerStyle={{ paddingBottom: 35}}
                keyExtractor={this.keyExtractor}
                data={data.productQuery}
                renderItem={this.renderItem}
                onEndReachedThreshold={0.1}
            />
        )
    }
    
    



}