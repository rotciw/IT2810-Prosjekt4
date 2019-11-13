import React, { Component, PureComponent } from 'react';
import { View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { observer, inject } from 'mobx-react';
import { styles } from '../../styles/table';
import ItemModal from '../itemModal/ItemModal';
import TableItem from '../tableItem/TableItem';

class Table extends Component {
    constructor(props) {
        super(props);
        // These states are used local state control within this component
        this.state = {
            isLoading: true,
            item: {}
        }
    }

    // Query to backend
    refreshQuery(keys = "", packaging = "", productSelection = "", country = "",
        yearMin = "", yearMax = "", priceMin = 0, priceMax = 10000,
        skipping = 0, sortAfter = "") {

        // Available queries to use, these are in norwegian as Vinmonopolets data was in Norwegian
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

    // Key for flatlist
    keyExtractor = (item, index) => index.toString()

    // For each item in the list, render a ListItem
    renderItem = ({ item }) => (
        <TableItem item={item}/>
    )

    renderFooter = (length) => {
        // Rendering the footer which is either no result or a loading icon
        if (length === 0) {
            return (
                <Text style={{ textAlign: "center", top: 50 }}>Ingen resultater</Text>
            )
        } else if (!this.state.isLoading) {
            return null
        } else {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }

    handleLoadMore = (fetchMore) => {
        // Handling dynamic pagination
        this.props.paginationStore.currentPage += 1;

        fetchMore({
            query: this.refreshQuery(
                this.props.searchBarStore.searchBarValue,
                this.props.filterStore.packagingFilter,
                this.props.filterStore.productSelectionFilter,
                this.props.filterStore.countryFilter,
                this.props.filterStore.yearMinFilter,
                this.props.filterStore.yearMaxFilter,
                this.props.filterStore.priceMinFilter,
                this.props.filterStore.priceMaxFilter,
                this.props.paginationStore.currentPage,
                this.props.sortStore.sortAfter
            ),
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.productQuery.length === 0) {
                    this.setState({ isLoading: false })
                    return prev;
                }
                this.setState({ isLoading: true })
                return {
                    // Concatenate the new feed results after the old ones
                    productQuery: prev.productQuery.concat(fetchMoreResult.productQuery),
                };
            }
        })
    };



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
                    this.props.paginationStore.firstPage,
                    this.props.sortStore.sortAfter
                )
            }>
                {({ loading, error, data, fetchMore }) => {
                    if (loading && !data) {
                        // When loading and no data, render an empty table
                        return (
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={[]}
                                renderItem={this.renderItem}
                                ListFooterComponent={this.renderFooter}
                            />
                        )
                    };
                    if (error) return (
                        <View style={styles.activity}>
                            <Text>`Error! ${error.message}`</Text>
                        </View>
                    );
                    return (
                        <View>
                            {/* List when there are data */}
                            <FlatList
                                contentContainerStyle={{ paddingBottom: Dimensions.get('window').height / 3.3 }}
                                keyExtractor={this.keyExtractor}
                                data={data.productQuery}
                                renderItem={this.renderItem}
                                ListFooterComponent={this.renderFooter(data.productQuery.length)}
                                onEndReached={() => { this.handleLoadMore(fetchMore) }}
                                onEndReachedThreshold={0.5}
                                initialNumToRender={8}
                                maxToRenderPerBatch={2}
                            />
                            {/* The modal with data we want to show */}
                            <ItemModal />
                        </View>
                    );
                }}
            </Query>
        );
    }

}

export default inject('sortStore',
    'filterStore',
    'searchBarStore',
    'paginationStore',
    'modalStore',
    'favoriteStore')(observer(Table));
