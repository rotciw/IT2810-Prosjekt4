import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Image style={{width: 30, height: 30}} source={require('../../assets/images/wine_glass.png')}/>
      <Text style={styles.headerText}>Studentpolet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: -30,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
