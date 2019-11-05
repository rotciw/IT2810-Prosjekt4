import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default function Header(props) {
  return (
    <Text style={styles.headerText}>Studentpolet</Text>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});
