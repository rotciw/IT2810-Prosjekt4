import React from 'react';
import {
  Text,
  Image,
  View,
} from 'react-native';
import { styles } from '../../styles/header.js';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/wine_glass.png')} />
      <Text style={styles.headerText}>STUDENTPOLET</Text>
    </View>
  );
}