import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { List } from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { styles } from '../../styles/filterGroup';

let filterData = require("./FilterData");

class FilterGroup extends Component {
    constructor(props) {
        super(props);
        // These states are for displaying data seperately from the store, for locally storing
        this.state = {
            distinctCountries: filterData.distinctCountries,
            distinctPackaging: filterData.distinctPackaging,
            distinctProductSelection: filterData.distinctProductSelection,
            selectedCountryFilterId: "",
            selectedPackagingFilterId: "",
            selectedProductSelectionFilterId: "",
            selectedSortingId: 0,
            selectedCountryFilter: "",
            selectedPackagingFilter: "",
            selectedProductSelectionFilter: "",
            yearMinFilterInt: 1930,
            yearMaxFilterInt: 2019,
            yearMinFilterString: "",
            yearMaxFilterString: "",
            priceMinFilter: 0,
            priceMaxFilter: 10000,
            modalVisible: false,
        };
        this.selectButton = this.selectButton.bind(this);
    }

    selectButton(filterGroup, name, i) {
        // For countries
        if (filterGroup === 0) {
            this.setState({ selectedCountryFilterId: i, selectedCountryFilter: name });
        } else if (filterGroup === 1) {
            // For packaging, e.g. glass, plastic
            this.setState({ selectedPackagingFilterId: i, selectedPackagingFilter: name });
        } else if (filterGroup === 2) {
            // Product selectiong, e.g. test selection, basic selection
            this.setState({ selectedProductSelectionFilterId: i, selectedProductSelectionFilter: name });
        } else if (filterGroup === 3) {
            // Sorting function
            this.setState({ selectedSortingId: i })
        }
        // Reset Pagination when selecting a filter
        this.props.paginationStore.reset();
    }

    renderFilters(filterGroup, buttonNames, selectedFilter) {
        // Function for displaying a button for each country filter
        const buttons = buttonNames.map((name, i) => {
            const buttonType = i === selectedFilter ? "solid" : "outline";
            return (
                <View key={i} style={styles.buttonContainer}>
                    <Button
                        key={i}
                        title={name}
                        type={buttonType}
                        style={styles.buttonStyle}
                        onPress={() => { this.selectButton(filterGroup, name, i); }}
                    />
                </View>
            );
        });
        return buttons;
    };

    handleYearSliderUpdate = values => {
        // Slider for years
        this.setState({
            yearMinFilterInt: values[0],
            yearMaxFilterInt: values[1],
            yearMinFilterString: values[0].toFixed(0),
            yearMaxFilterString: values[1].toFixed(0),
        });
    }
    handlePriceSliderUpdate = values => {
        // Slider for price
        this.setState({
            priceMinFilter: values[0],
            priceMaxFilter: values[1],
        });
    }

    resetFilters = () => {
        // Reset all filters including sorting
        this.setState({
            selectedCountryFilterId: "",
            selectedPackagingFilterId: "",
            selectedProductSelectionFilterId: "",
            selectedSortingId: 0,
            selectedCountryFilter: "",
            selectedPackagingFilter: "",
            selectedProductSelectionFilter: "",
            yearMinFilterInt: 1930,
            yearMaxFilterInt: 2019,
            yearMinFilterString: "",
            yearMaxFilterString: "",
            priceMinFilter: 0,
            priceMaxFilter: 10000,
            modalVisible: false,
        });
        // Reset filterStore
        this.props.filterStore.addCountryFilter("");
        this.props.filterStore.addPackagingFilter("");
        this.props.filterStore.addProductSelectionFilter("");
        this.props.filterStore.addYearMinFilter("");
        this.props.filterStore.addYearMaxFilter("");
        this.props.filterStore.addPriceMinFilter(0);
        this.props.filterStore.addPriceMaxFilter(10000);

        // Reset sortStore
        this.props.sortStore.addSortAfter("-AlkoholPrKrone")

        // Reset Pagination
        this.props.paginationStore.reset();
    }

    setModalVisible = (visible) => {
        // Set a visible modal, which is diplaying all filtering and sorting options
        if (!visible) {
            this.props.filterStore.addYearMinFilter(this.state.yearMinFilterString);
            this.props.filterStore.addYearMaxFilter(this.state.yearMaxFilterString);
            this.props.filterStore.addPriceMinFilter(this.state.priceMinFilter);
            this.props.filterStore.addPriceMaxFilter(this.state.priceMaxFilter);
            this.props.filterStore.addCountryFilter(this.state.selectedCountryFilter);
            this.props.filterStore.addPackagingFilter(this.state.selectedPackagingFilter);
            this.props.filterStore.addProductSelectionFilter(this.state.selectedProductSelectionFilter);

            let sortId = this.state.selectedSortingId;
            let sortBy = "";
            if (sortId === 0) sortBy = '-AlkoholPrKrone';
            else if (sortId === 1) sortBy = 'AlkoholPrKrone';
            else if (sortId === 2) sortBy = '-Alkohol';
            else if (sortId === 3) sortBy = 'Alkohol';
            else if (sortId === 4) sortBy = '-Pris';
            else if (sortId === 5) sortBy = 'Pris';
            this.props.sortStore.addSortAfter(sortBy)

            // Reset Pagination when selecting filters
            this.props.paginationStore.reset();
        }
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={styles.filterButtonContainer}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                    // With onRequestClose, the user can press back button (android only)
                >
                    <ScrollView>
                        <View>
                            <List.Section title="Sortering">
                                <List.Accordion
                                    title="Sorter etter"
                                    left={props => <List.Icon {...props} icon="sort" />}
                                >
                                    <View style={styles.filterButtonGroup}>
                                        {this.renderFilters(3, ['Alkohol pr. krone (høy til lav)', 'Alkohol pr. krone (lav til høy)', 'Alkoholprosent (høy til lav)', 'Alkoholprosent (lav til høy)', 'Pris (høy til lav)', 'Pris (lav til høy)'], this.state.selectedSortingId)}
                                    </View>
                                </List.Accordion>
                            </List.Section>
                            <List.Section title="Filtrering">
                                <List.Accordion
                                    title="Land"
                                    left={props => <List.Icon {...props} icon="crosshairs-gps" />}
                                >
                                    <View style={styles.filterButtonGroup}>
                                        {this.renderFilters(0, this.state.distinctCountries, this.state.selectedCountryFilterId)}
                                    </View>
                                </List.Accordion>

                                <List.Accordion
                                    title="Årgang"
                                    left={props => <List.Icon {...props} icon="calendar-range" />}
                                >
                                    <View style={styles.sliderContainer}>
                                        <Text>{this.state.yearMinFilterInt} - {this.state.yearMaxFilterInt}</Text>
                                        <MultiSlider
                                            values={[this.state.yearMinFilterInt, this.state.yearMaxFilterInt]}
                                            sliderLength={Dimensions.get('window').width / 1.5}
                                            onValuesChange={this.handleYearSliderUpdate}
                                            min={1930}
                                            max={2019}
                                        />
                                    </View>
                                </List.Accordion>

                                <List.Accordion
                                    title="Pris"
                                    left={props => <List.Icon {...props} icon="currency-usd" />}
                                >
                                    <View style={styles.sliderContainer}>
                                        <Text>{this.state.priceMinFilter} - {this.state.priceMaxFilter}</Text>
                                        <MultiSlider
                                            values={[this.state.priceMinFilter, this.state.priceMaxFilter]}
                                            sliderLength={Dimensions.get('window').width / 1.5}
                                            onValuesChange={this.handlePriceSliderUpdate}
                                            min={0}
                                            max={10000}
                                            step={100}
                                        />
                                    </View>
                                </List.Accordion>

                                <List.Accordion
                                    title="Emballasjetype"
                                    left={props => <List.Icon {...props} icon="package" />}
                                >
                                    <View style={styles.filterButtonGroup}>
                                        {this.renderFilters(1, this.state.distinctPackaging, this.state.selectedPackagingFilterId)}
                                    </View>
                                </List.Accordion>

                                <List.Accordion
                                    title="Produktutvalg"
                                    left={props => <List.Icon {...props} icon="bottle-wine" />}
                                >
                                    <View style={styles.filterButtonGroup}>
                                        {this.renderFilters(2, this.state.distinctProductSelection, this.state.selectedProductSelectionFilterId)}
                                    </View>
                                </List.Accordion>
                                <View style={styles.resetFilters}>
                                    <Button
                                        title='Nullstill filtrering'
                                        type='outline'
                                        onPress={this.resetFilters} />
                                </View>
                            </List.Section>
                        </View>
                    </ScrollView>
                    {/*  Apply button inside filter modal */}
                    <View style={styles.applyButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                            style={styles.applyButton}
                        >
                            <Icon
                                type='material'
                                name='done'
                                color='#fff'
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* Filterbutton */}
                <TouchableOpacity
                    onPress={() => this.setModalVisible(true)}
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


export default inject("filterStore", "paginationStore", "sortStore")(observer(FilterGroup));