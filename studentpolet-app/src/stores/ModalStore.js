class ModalStore {
    //Observables
    modalVisible = false;
    modalItem = {}

    setModalVisible() {
        this.modalVisible = true;
    }

    setModalInvisible() {
        this.modalVisible = false;
    }

    setModalItem(item) {
        this.modalItem = item;
    }
}

export default ModalStore;