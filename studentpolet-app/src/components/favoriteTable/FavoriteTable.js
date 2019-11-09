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


      
    getMyValue = async () => {
      try {
        const value = await AsyncStorage.getItem('Favorites');
        this.setState({key:JSON.parse(value)});
        console.log("Hentes");
        
      } catch(e) {
        // read error
      }
    }
      componentDidMount(){
        this.getMyValue()
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
        return(
            <View>
              <FlatList
                contentContainerStyle={{ paddingBottom: 35}}
                keyExtractor={this.keyExtractor}
                data={this.state.key}
                renderItem={this.renderItem}
                onEndReachedThreshold={0.1}
                
            />
            </View>
            
        )
    }
}

export default FavoriteTable;