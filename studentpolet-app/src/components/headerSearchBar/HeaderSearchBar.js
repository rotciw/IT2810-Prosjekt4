import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { View, TextInput } from 'react-native';
import { styles } from '../../styles/searchBar';
import { SearchBar } from 'react-native-elements';

class HeaderSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarValue: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      searchBarValue: event
    });
    this.props.searchBarStore.addSearchBarValue(event);
  }

  render() {
    return (
      <SearchBar
        round
        lightTheme
        placeholder="Navn, type, land.."
        containerStyle={styles.container}
        inputStyle={styles.inputStyle}
        onChangeText={this.handleChange}
        value={this.state.searchBarValue}
      />
    );
  }
}

export default inject("searchBarStore", "paginationStore")(observer(HeaderSearchBar));
