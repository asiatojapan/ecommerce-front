import React from 'react';
import _ from 'lodash';

import { Link, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import ipaexg from './fonts/ipaexg.ttf'

Font.register( {
  family: 'Ipaexg',
  src: ipaexg,
});

const styles = StyleSheet.create({
  container: {
    fontFamily: "Ipaexg",
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    fontFamily: "Ipaexg",
    flexDirection: 'column',
    flexGrow: 9,
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontFamily: "Ipaexg",
    fontSize: 24,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: "Ipaexg",
    fontSize: 10,
    justifySelf: 'flex-end',
    textTransform: 'uppercase',
  },
  link: {
    fontFamily: "Ipaexg",
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
});

export default props => {
  const { studentData } = props;
  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>事前確認用エントリーシート {studentData.studentid}</Text>
        <Text style={styles.subtitle}>{studentData.tags.map(tag => "| " + _.trim(tag)) + " "}</Text>
      </View>
      <View style={styles.linkColumn}>
        <Text style={styles.subtitle}>JOB博 in Study Go Work JAPAN</Text>
      </View>
    </View>
  );
}
