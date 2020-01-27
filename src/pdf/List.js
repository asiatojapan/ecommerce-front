import React from 'react';

import { Text, View, StyleSheet,Font } from '@react-pdf/renderer'
import ipaexm from './fonts/ipaexm.ttf';
import ipaexg from './fonts/ipaexg.ttf';

Font.register({
  family: 'ipaexm',
  src: ipaexm
});

const styles = StyleSheet.create({
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    fontSize: 10,
    fontFamily: 'ipaexm',
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
