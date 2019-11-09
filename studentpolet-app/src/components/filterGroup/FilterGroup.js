import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { List, Checkbox } from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

let filterData = require("./FilterData");

class FilterGroup extends Component {
    constructor(props) {
        super(props);
        // These states are for displaying data seperately from the store
        this.state = {
            distinctCountries: filterData.distinctCountries,
            distinctPackaging: filterData.distinctPackaging,
            distinctProductSelection: filterData.distinctProductSelection,
            selectedCountryFilterId: "",
            selectedPackagingFilterId: "",
            selectedProductSelectionFilterId: "",
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
        if (filterGroup === 0) {
            this.setState({ selectedCountryFilterId: i, selectedCountryFilter: name });
        } else if (filterGroup === 1) {
            this.setState({ selectedPackagingFilterId: i, selectedPackagingFilter: name });
        } else if (filterGroup === 2) {
            this.setState({ selectedProductSelectionFilterId: i, selectedProductSelectionFilter: name });
        }
        // Reset Pagination when selecting a filter
        this.props.paginationStore.reset();
    }

    renderFilters(filterGroup, buttonNames, selectedFilter) {
        // Function for displaying a button for each country filter
        const buttons = buttonNames.map((name, i) => {
            const buttonType = i === selectedFilter ? "solid" : "outline";
            return (
                <Button
                    key={i}
                    title={name}
                    type={buttonType}
                    style={styles.buttonStyle}
                    onPress={() => { this.selectButton(filterGroup, name, i); }}
                />
            );
        });
        return buttons;
    };

    handleYearSliderUpdate = values => {
        this.setState({
            yearMinFilterInt: values[0],
            yearMaxFilterInt: values[1],
            yearMinFilterString: values[0].toFixed(0),
            yearMaxFilterString: values[1].toFixed(0),
        });
    }
    handlePriceSliderUpdate = values => {
        this.setState({
            priceMinFilter: values[0],
            priceMaxFilter: values[1],
        });
    }

    resetFilters = () => {
        this.setState({
            selectedCountryFilterId: "",
            selectedPackagingFilterId: "",
            selectedProductSelectionFilterId: "",
        });
        // Reset filters
        this.props.filterStore.addCountryFilter("");
        this.props.filterStore.addPackagingFilter("");
        this.props.filterStore.addProductSelectionFilter("");
        this.props.filterStore.addYearMinFilter("");
        this.props.filterStore.addYearMaxFilter("");
        this.props.filterStore.addPriceMinFilter(1);
        this.props.filterStore.addPriceMaxFilter(10000);

        // Reset Pagination
        this.props.paginationStore.reset();
    }

    setModalVisible(visible) {
        if (!visible) {
            this.props.filterStore.addYearMinFilter(this.state.yearMinFilterString);
            this.props.filterStore.addYearMaxFilter(this.state.yearMaxFilterString);
            this.props.filterStore.addPriceMinFilter(this.state.priceMinFilter);
            this.props.filterStore.addPriceMaxFilter(this.state.priceMaxFilter);
            this.props.filterStore.addCountryFilter(this.state.selectedCountryFilter);
            this.props.filterStore.addPackagingFilter(this.state.selectedPackagingFilter);
            this.props.filterStore.addProductSelectionFilter(this.state.selectedProductSelectionFilter);

            // Reset Pagination when selecting filters
            this.props.paginationStore.reset();
        }
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.filterButtonContainer} >
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    >
                    <ScrollView style={{marginTop: 22}}>
                        <View>
                            <List.Section title="Filters">
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
                                        sliderLength={Dimensions.get('window').width/1.5}
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
                                        sliderLength={Dimensions.get('window').width/1.5}
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
                            </List.Section>
                        </View>
                    </ScrollView>
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

const styles = StyleSheet.create({

    filterButtonContainer: {
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
    },
    applyButtonContainer: {
        position: "absolute",
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        top: '85%',
        left: '39%',
    },
    applyButton: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: '#2f95dc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterButtonGroup: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: 40,
    },
    buttonStyle: {
        margin: 5,
        borderColor: 'grey',
    },
    sliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10%',
    }
})


export default inject("filterStore", "paginationStore")(observer(FilterGroup));