import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, StatusBar } from 'react-native';
import FavoriteTable from '../components/favoriteTable/FavoriteTable'
import Header from '../components/header/Header'
import HeaderSearchBar from '../components/headerSearchBar/HeaderSearchBar'


export default function FavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}> FAVORITTER </Text>
      <View style={{backgroundColor: 'white'}}>
        <FavoriteTable />
      </View>
    </SafeAreaView>
  );
}

FavoriteScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D2D',
    marginTop: StatusBar.currentHeight,
  },
  headerText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 25,
    lineHeight: 60,
    fontWeight: 'bold',
  }
});
