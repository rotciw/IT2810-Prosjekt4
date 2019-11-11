import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { View } from 'react-native';
import { styles } from '../../styles/searchBar';
import { SearchBar } from 'react-native-elements';

class HeaderSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarValue: "",
    };
  }

  handleChange = (text) => {
    // When typing on search bar, the value shall be shown, as well as updating the mobx store
    // so data can be fetched dynamically
    this.setState({
      searchBarValue: text
    });
    this.props.searchBarStore.addSearchBarValue(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          round
          platform="ios"
          cancelButtonTitle="Avbryt"
          placeholder="Navn, type, land.."
          onChangeText={this.handleChange}
          value={this.state.searchBarValue}
          containerStyle={styles.container}
        />
      </View>
    );
  }
}

export default inject("searchBarStore", "paginationStore")(observer(HeaderSearchBar));
