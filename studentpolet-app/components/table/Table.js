import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_PRODUCTQUERY = gql`
{
    productQuery(Keys: "",
                Packaging: "",
                ProductSelection: "",
                Country: "",
                YearMin: "",
                YearMax: "",
                PriceMin: 0,
                PriceMax: 50000,
                Skipping: 0,
                SortAfter: "") {
        Varenummer
        Varenavn
        Volum
        Pris
        Literpris
        Varetype
        Produktutvalg
        Smak
        Land
        Argang
        Alkohol
        AlkoholPrKrone
        Emballasjetype
        Vareurl
    }
}`;

class Table extends Component{

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.Varenavn}
            chevron
            bottomDivider
        />
    )

    render() {
        return (
            <Query query={GET_PRODUCTQUERY}>
                {({ loading, error, data }) => {
                    if (loading && !data) return(
                        <View style={styles.activity}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    );
                    if (error) return(
                        <View style={styles.activity}>
                            <Text>`Error! ${error.message}`</Text>
                        </View>
                    );
                    return (
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={data.productQuery}
                            renderItem={this.renderItem}
                        />
                    );
                }}
            </Query>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
  })

export default Table;