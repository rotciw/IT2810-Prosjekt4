import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import Swipeout from 'react-native-swipeout';
import TableItem from '../tableItem/TableItem';
import { inject, observer } from 'mobx-react';


//List of favorites
class FavoriteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currItem: null
    }
    this.swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
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
        <FlatList
          contentContainerStyle={{ paddingBottom: 35 }}
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