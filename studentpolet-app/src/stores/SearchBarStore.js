class SearchBarStore {
    // Observable
    searchBarValue = "";

    // Action
    addSearchBarValue(value) {
        this.searchBarValue = value;
    };
}

export default SearchBarStore;