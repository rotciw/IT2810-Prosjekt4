import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { inject, observer } from 'mobx-react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
    }
})

export default inject("searchBarStore", "paginationStore")(observer(SearchBar));
