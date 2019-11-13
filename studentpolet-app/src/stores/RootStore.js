import FilterStore from './FilterStore';
import SearchBarStore from './SearchBarStore';
import SortStore from './SortStore';
import PaginationStore from './PaginationStore';
import { decorate, observable, action } from 'mobx';
import ModalStore from './ModalStore';
import FavoriteStore from './FavoriteStore';

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
    firstPage: observable,
    currentPage: observable,
    reset: action,
});

decorate(ModalStore, {
    modalVisible: observable,
    setModalVisible: action,
    setModalInvisible: action,
    modalItem: observable,
    setModalItem: action
})

decorate(FavoriteStore, {
    favoriteIcon: observable,
    setFavorite: action,
    data: observable,
    getData: action
})

class RootStore {
    // Construct all stores
    constructor() {
        this.filterStore = new FilterStore();
        this.sortStore = new SortStore();
        this.searchBarStore = new SearchBarStore();
        this.paginationStore = new PaginationStore();
        this.modalStore = new ModalStore();
        this.favoriteStore = new FavoriteStore();
    }
}

export default RootStore;