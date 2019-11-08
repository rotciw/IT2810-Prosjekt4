import React from 'react';
import {  SafeAreaView } from 'react-native';
import Table from '../components/table/Table'
import { styles } from '../styles/homeScreen';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Table/>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

