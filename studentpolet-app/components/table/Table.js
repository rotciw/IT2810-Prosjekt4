import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { observer, inject } from 'mobx-react';

class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            isLoading: false,
        }
    }

    refreshQuery(keys = "", packaging = "", productSelection = "", country = "",
        yearMin = "", yearMax = "", priceMin = 0, priceMax = 50000,
        skipping = 0, sortAfter = "") {

        // Availbale queries
        const GET_PRODUCTQUERY = gql`
            {
                productQuery(Keys: "${keys}",
                            Packaging: "${packaging}",
                            ProductSelection: "${productSelection}",
                            Country: "${country}",
                            YearMin: "${yearMin}",
                            YearMax: "${yearMax}",
                            PriceMin: ${priceMin},
                            PriceMax: ${priceMax},
                            Skipping: ${skipping},
                            SortAfter: "${sortAfter}") {
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
        return GET_PRODUCTQUERY;
    };

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.Varenavn}
            leftAvatar={{ source: { uri: "https://bilder.vinmonopolet.no/cache/250x250-0/" + item.Varenummer + "-1.jpg" } }}
            chevron
            bottomDivider
        />
    )

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            if (!this.state.isLoading){
                console.log("next page");
            }
        });
    };
    renderRefreshButton = () => {
        return(
            <View style={styles.refreshContainer}>
                <TouchableOpacity
                    onPress={this.handleLoadMore}
                    style={styles.refreshButton}
                >
                    <Icon
                        name='refresh'
                        color='#fff'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <Query query={
                this.refreshQuery(
                    this.props.searchBarStore.searchBarValue,
                    this.props.filterStore.packagingFilter,
                    this.props.filterStore.productSelectionFilter,
                    this.props.filterStore.countryFilter,
                    this.props.filterStore.yearMinFilter,
                    this.props.filterStore.yearMaxFilter,
                    this.props.filterStore.priceMinFilter,
                    this.props.filterStore.priceMaxFilter,
                    this.props.paginationStore.paginationPage,
                    this.props.sortStore.sortAfter
                )
            }>
                {({ loading, error, data }) => {
                    if (loading && !data) {
                        return(
                        <View style={styles.activity}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                        )
                    };
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
                            ListFooterComponent={this.renderRefreshButton}
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
    refreshContainer: {
        flex: 1,
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    refreshButton: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: '#2f95dc',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default inject('sortStore', 'filterStore', 'searchBarStore', 'paginationStore')(observer(Table));