import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

let filterData = require("./FilterData");

class FilterGroup extends Component {
    constructor(props) {
        super(props);
        // These states are for displaying data seperately from the store
        this.state = {
            distinctCountries: filterData.distinctCountries,
            distinctPackaging: filterData.distinctPackaging,
            distinctProductSelection: filterData.distinctProductSelection,
            selectedCountryFilter: "",
            selectedPackagingFilter: "",
            selectedProductSelectionFilter: "",
            yearMinFilter: 1930,
            yearMaxFilter: 2019,
        };
        this.selectButton = this.selectButton.bind(this);
    }

    selectButton(filterGroup, name, i) {
        if (filterGroup === 0) {
            this.setState({ selectedCountryFilter: i });
            this.props.filterStore.addCountryFilter(name);
        } else if (filterGroup === 1) {
            this.setState({ selectedPackagingFilter: i });
            this.props.filterStore.addPackagingFilter(name);
        } else if (filterGroup === 2) {
            this.setState({ selectedProductSelectionFilter: i });
            this.props.filterStore.addProductSelectionFilter(name);
        }
        // Reset Pagination when selecting a filter
        this.props.paginationStore.firstPage();
    }

    renderFilters(filterGroup, buttonNames, selectedFilter) {
        // Function for displaying a button for each country filter
        const buttons = buttonNames.map((name, i) => {
            const buttonStyle = i === selectedFilter ? "buttonStyle active" : "buttonStyle";
            return (
                <Button
                    onClick={() => { this.selectButton(filterGroup, name, i); }}
                    key={i}
                    id={i}
                    className={buttonStyle}
                    variant="outline-secondary"
                >
                    {name}
                </Button>
            );
        });
        return buttons;
    };

    handleYearSliderUpdate = (render, handle, value, un, percent) => {
        this.props.filterStore.addYearMinFilter(parseInt(value[0].toFixed(0)));
        this.props.filterStore.addYearMaxFilter(parseInt(value[1].toFixed(0)));
        this.setState({
            yearMinFilter: parseInt(value[0].toFixed(0)),
            yearMaxFilter: parseInt(value[1].toFixed(0)),
        });
        // Reset Pagination when selecting years
        this.props.paginationStore.firstPage();
    }

    handlePriceSliderUpdate = (render, handle, value, un, percent) => {
        this.props.filterStore.addPriceMinFilter(parseInt(value[0].toFixed(0)));
        this.props.filterStore.addPriceMaxFilter(parseInt(value[1].toFixed(0)));
        // Reset Pagination when selecting prices
        this.props.paginationStore.firstPage();
    }

    resetFilters = () => {
        this.setState({
            selectedCountryFilter: "",
            selectedPackagingFilter: "",
            selectedProductSelectionFilter: "",
        });
        // Reset filters
        this.props.filterStore.addCountryFilter("");
        this.props.filterStore.addPackagingFilter("");
        this.props.filterStore.addProductSelectionFilter("");
        this.props.filterStore.addYearMinFilter("");
        this.props.filterStore.addYearMaxFilter("");
        this.props.filterStore.addPriceMinFilter(1);
        this.props.filterStore.addPriceMaxFilter(50000);

        // Reset Pagination
        this.props.paginationStore.firstPage();
    }

    render() {
        return (
            <View style={styles.refreshContainer}>
                <TouchableOpacity
                    onPress={() => this.handleLoadMore(fetchMore)}
                    style={styles.filterButton}
                >
                    <Icon
                        type='material-community'
                        name='filter'
                        color='#fff'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    refreshContainer: {
        position: "absolute",
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        top: '89%',
        left: '75%',
    },
    filterButton: {
        height: 50,
        width: 50,
        borderRadius: 100,
        paddingTop: 7,
        backgroundColor: '#2f95dc',
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default inject("filterStore", "paginationStore")(observer(FilterGroup));