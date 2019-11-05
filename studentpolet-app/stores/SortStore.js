class SortStore {
    // Observable with default values
    sortAfter = "-AlkoholPrKrone";
    activeButton = "Sorter etter"

    // Actions
    addSortAfter(value) {
        this.sortAfter = value;
    };

    addActiveButton(value) {
        this.activeButton = value;
    };
}

export default SortStore;