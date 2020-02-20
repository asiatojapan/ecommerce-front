import React from 'react';

import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import ipaexg from './fonts/ipaexg.ttf'

Font.register( {
  family: 'Ipaexg',
  src: ipaexg,
});

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
    fontFamily: "Ipaexg",
    fontSize: 10,
  },
});

const List = ({ children }) => children;

export const Item = ({ children }) => (
  <View style={styles.item}>
    <Text style={styles.bulletPoint}>•</Text>
    <Text style={styles.itemContent}>{children}</Text>
  </View>
);

export default List;
