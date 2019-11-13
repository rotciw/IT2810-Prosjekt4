import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { inject } from 'mobx-react';
import { styles } from '../../styles/tableItem';
import { Ionicons } from '@expo/vector-icons';

class TableItem extends PureComponent {
    handlePress(item) {
        // Show a modal, and check favorite state
        // Sets the item for modalStore so it can be used in other components such as ItemModal
        this.props.modalStore.setModalVisible()
        this.props.modalStore.setModalItem(item)
        this.props.favoriteStore.setFavorite(item)
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.handlePress.bind(this, this.props.item)}>
                    <View style={styles.itemContainer}>
                        <Image
                            style={styles.itemImage}
                            source={{ uri: "https://bilder.vinmonopolet.no/cache/200x200-0/" + this.props.item.Varenummer + "-1.jpg" }}
                        />
                        <View style={styles.itemText}>
                            <Text
                                style={styles.title}>
                                {this.props.item.Varenavn}
                            </Text>
                            <Text
                                style={styles.subtitle}>
                                Alkohol Pr. Krone: {this.props.item.AlkoholPrKrone}
                            </Text>
                        </View>
                        <View
                            style={styles.chevron}>
                            <Ionicons
                                name="ios-arrow-forward"
                                color="#D8D8D8"
                                size={16}
                            />
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
}

export default inject('modalStore', 'favoriteStore')(TableItem);