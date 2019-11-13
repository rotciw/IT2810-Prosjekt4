import React, { Component } from 'react';
import { View, FlatList, Dimensions, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import TableItem from '../tableItem/TableItem';
import { inject, observer } from 'mobx-react';

//List of favorites
class FavoriteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currItem: null
    }
    this.swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: '#D11A2A',
        color: "white",
        onPress: () => this.removeFavorite(this.state.currItem)
      }
    ]
  }


  keyExtractor = (item, index) => index.toString()

  removeFavorite = async (favorite) => {
    try {
      let data = await AsyncStorage.getItem('Favorites') || [];
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].Varenummer == favorite.Varenummer) {
          //Fjerner data om det allerede finnes
          data.splice(i, 1);
        }
      }
      await AsyncStorage.removeItem('Favorites');
      await AsyncStorage.setItem('Favorites', JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };

  //The view of every item, same as in Table
  renderItem = ({ item }) => (
    <Swipeout
      right={this.swipeoutBtns}
      onOpen={() => this.setState({ currItem: item })}>
      <TableItem item={item} />
    </Swipeout>
  )

  render() {
    return (
      <View>
        <NavigationEvents onWillFocus={() => this.props.favoriteStore.getData()} />
        <FlatList
          contentContainerStyle={{ paddingBottom: Dimensions.get('window').height / 3.3 }}
          keyExtractor={this.keyExtractor}
          data={this.props.favoriteStore.data}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.1}
        />
      </View>
    )
  }
}

export default inject('favoriteStore')(observer(FavoriteTable));