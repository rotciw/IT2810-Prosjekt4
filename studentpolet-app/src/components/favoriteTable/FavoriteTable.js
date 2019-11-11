import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {AsyncStorage, Linking} from 'react-native';
import {NavigationEvents} from 'react-navigation';

class FavoriteTable extends Component{
    constructor(props){
        super(props);
        this.state = {
          key: null,
        }
    }

    keyExtractor = (item, index) => index.toString()
      
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('Favorites');
        this.setState({key:JSON.parse(value)});
        console.log("Hentes");
      } catch(e) {
        // read error
      }
    }

    renderItem = ({ item }) => (
      <ListItem
          title={item.Varenavn}
          leftAvatar={{ height: 64, width: 32, resizeMode: 'contain', source: { uri: "https://bilder.vinmonopolet.no/cache/200x200-0/" + item.Varenummer + "-1.jpg" } }}
          subtitle={"Alkohol Pr. Krone: " + item.AlkoholPrKrone}
          chevron
          bottomDivider
          onPress={() => Linking.openURL(item.Vareurl).catch((err) => console.error('An error occurred', err))}
      />
  )

    render() {
        return(
            <View>
              <NavigationEvents onWillFocus={() => this.getData()} />
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