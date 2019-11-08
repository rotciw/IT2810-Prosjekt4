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

    storeData = async () => {
      try {
        await AsyncStorage.setItem('Favorites', 'Test');
      } catch (error) {
        // Error saving data
      }
      console.log('Done!')
    };
      
    getMyValue = async () => {
      try {
        const value = await AsyncStorage.getItem('Favorites')
        this.setState({key:value})
      } catch(e) {
        // read error
      }
      console.log('Done.')
    }
      
    
    /*
    renderItem = ({ item }) => (
        <ListItem
            title={item.Varenavn}
            leftAvatar={{ source: { uri: "https://bilder.vinmonopolet.no/cache/100x100-0/" + item.Varenummer + "-1.jpg" } }}
            chevron
            bottomDivider
        />
    )
    */
    render() {
      this.storeData();
      this.getMyValue();
        return(
          <View>
            {console.log(this.state.key)}
            <Text>{this.state.key}</Text>
          </View>
          
          /*
            <FlatList
                contentContainerStyle={{ paddingBottom: 35}}
                keyExtractor={this.keyExtractor}
                data={data.productQuery}
                renderItem={this.renderItem}
                onEndReachedThreshold={0.1}
            />
            */
        )
    }
}

export default FavoriteTable;