import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {AsyncStorage, Linking} from 'react-native';
import {NavigationEvents} from 'react-navigation';

//List of favorites
class FavoriteTable extends Component{
    constructor(props){
        super(props);
        this.state = {
          data: null,
        }
    }

    keyExtractor = (item, index) => index.toString()

    //Fetches all favorites from asyncstorage, this is called when going to the favorites page to amke sure it is up to date
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('Favorites');
        this.setState({data:JSON.parse(value)});
      } catch(e) {
        // read error
      }
    }

    //The view of every item, same as in Table
    renderItem = ({ item }) => (
      <ListItem
          title={item.Varenavn}
          leftAvatar={{ height: 64, width: 32, resizeMode: 'contain', source: { uri: "https://bilder.vinmonopolet.no/cache/200x200-0/" + item.Varenummer + "-1.jpg" } }}
          subtitle={"Alkohol Pr. Krone: " + item.AlkoholPrKrone}
          chevron
          bottomDivider
          //Links to the vinmonopolet.no site so users easily can shop their favorites
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
                data={this.state.data}
                renderItem={this.renderItem}
                onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}

export default FavoriteTable;