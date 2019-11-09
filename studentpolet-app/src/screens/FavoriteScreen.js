import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FavoriteTable from '../components/favoriteTable/FavoriteTable'


export default function FavoriteScreen() {
  return (
    <ScrollView style={styles.container}>
      <FavoriteTable />
    </ScrollView>
  );
}

FavoriteScreen.navigationOptions = {
  title: 'Favorite',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
