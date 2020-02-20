import React from 'react';

import { Text, StyleSheet, Font } from '@react-pdf/renderer';
import ipaexg from './fonts/ipaexg.ttf'

Font.register( {
  family: 'Ipaexg',
  src: ipaexg,
});

const styles = StyleSheet.create({
  title: {
    fontFamily: "Ipaexg",
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default Title;
