class ModalStore {
    //Observables
    modalVisible = false;

    setModalVisible() {
        this.modalVisible = true;
    }

    setModalInvisible() {
        this.modalVisible = false;
    }
}

export default ModalStore;