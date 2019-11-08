import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { inject, observer } from 'mobx-react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../../styles/searchBar';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarValue: "",
    };
  }

  handleSubmit(text) {
    this.setState({searchBarValue: text})
    this.props.searchBarStore.addSearchBarValue(text);

    //Reset pagination on search
    this.props.paginationStore.reset();
  }

  render() {
    let input;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => this.handleSubmit(text)}
                value={this.state.searchBarValue}
                placeholder="Navn, type, land.."
            />
        </View>
    );
  }
}

export default inject("searchBarStore", "paginationStore")(observer(SearchBar));
