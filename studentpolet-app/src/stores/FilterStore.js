class FilterStore {
    // Observables
    countryFilter = "";
    packagingFilter = "";
    productSelectionFilter = "";
    yearMinFilter = "";
    yearMaxFilter = "";
    priceMinFilter = 0;
    priceMaxFilter = 10000;

    // Actions
    addCountryFilter(value) {
        this.countryFilter = value;
    };
    addPackagingFilter(value) {
        this.packagingFilter = value;
    };
    addProductSelectionFilter(value) {
        this.productSelectionFilter = value;
    };
    addYearMinFilter(value) {
        this.yearMinFilter = value;
    };
    addYearMaxFilter(value) {
        this.yearMaxFilter = value;
    };
    addPriceMinFilter(value) {
        this.priceMinFilter = value;
    };
    addPriceMaxFilter(value) {
        this.priceMaxFilter = value;
    };
}

export default FilterStore;