class PaginationStore {
    // Observables
    paginationPage = 0;
    prevButtonDisabled = true;
    nextButtonDisabled = false;
    tableIsEmpty = false;

    // Actions
    incrementPage() {
        if (this.paginationPage >= 0) {
            this.prevButtonDisabled = false;
        }
        this.paginationPage++;
    }

    decrementPage() {
        if (this.paginationPage <= 1) {
            this.prevButtonDisabled = true;
        }
        this.paginationPage--;
    }

    firstPage() {
        this.prevButtonDisabled = true;
        this.paginationPage = 0;
    }

    tableEmpty() {
        this.nextButtonDisabled = true;
        this.tableIsEmpty = true;
    }

    tableNotEmpty() {
        this.nextButtonDisabled = false;
        this.tableIsEmpty = false;
    }

}

export default PaginationStore;