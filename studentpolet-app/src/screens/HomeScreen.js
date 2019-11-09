import React from 'react';
import { SafeAreaView } from 'react-native';
import Table from '../components/table/Table'
import Header from '../components/header/Header';
import SearchBar from '../components/searchBar/SearchBar';
import FilterGroup from '../components/filterGroup/FilterGroup';
import { styles } from '../styles/homeScreen';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchBar />
      <Table />
      <FilterGroup />
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

