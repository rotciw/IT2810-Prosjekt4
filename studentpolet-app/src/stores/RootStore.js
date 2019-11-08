import FilterStore from './FilterStore';
import SearchBarStore from './SearchBarStore';
import SortStore from './SortStore';
import PaginationStore from './PaginationStore';
import { decorate, observable, action } from 'mobx';

// decorate the store variables with their types
decorate(FilterStore, {
    countryFilter: observable,
    packagingFilter: observable,
    productSelectionFilter: observable,
    yearMinFilter: observable,
    yearMaxFilter: observable,
    priceMinFilter: observable,
    priceMaxFilter: observable,
    addCountryFilter: action,
    addPackagingFilter: action,
    addProductSelectionFilter: action,
    addYearMinFilter: action,
    addYearMaxFilter: action,
    addPriceMinFilter: action,
    addPriceMaxFilter: action,
});

decorate(SortStore, {
    sortAfter: observable,
    activeButton: observable,
    addSortAfter: action,
    addActiveButton: action
});

decorate(SearchBarStore, {
    searchBarValue: observable,
    addSearchBarValue: action,
});

decorate(PaginationStore, {
    paginationPage: observable,
    prevButtonDisabled: observable,
    nextButtonDisabled: observable,
    tableIsEmpty: observable,
    incrementPage: action,
    decrementPage: action,
    firstPage: action,
    tableEmpty: action,
    tableNotEmpty: action
});

class RootStore {
    // Construct all stores
    constructor() {
        this.filterStore = new FilterStore();
        this.sortStore = new SortStore();
        this.searchBarStore = new SearchBarStore();
        this.paginationStore = new PaginationStore();
    }
}

export default RootStore;