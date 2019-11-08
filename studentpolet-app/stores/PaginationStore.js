class PaginationStore {
    // Observables
    firstPage = 0;
    currentPage = 0;

    // Actions
    reset() {
        this.currentPage = 0;
    }

}

export default PaginationStore;