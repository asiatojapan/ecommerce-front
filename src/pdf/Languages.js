import React from 'react';
import _ from 'lodash';

import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import Title from './Title';
import ipaexg from './fonts/ipaexg.ttf'

Font.register( {
  family: 'Ipaexg',
  src: ipaexg,
});


const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: "Ipaexg",
    fontSize: 10,
  },
  degree: {
    fontFamily: "Ipaexg",
    fontSize: 10,
  },
  candidate: {
    fontFamily: "Ipaexg",
    fontSize: 10,
  },
});


export default props => {
  const { studentData } = props;
  return(
    <View style={styles.container}>
      <Title>Languages</Title>
      <Text style={styles.degree}>日本語: {_.upperCase(studentData.japanese)} (JLPT: {studentData.jlpt ? _.upperCase(studentData.jlpt) : "-"})</Text>
      <Text style={styles.degree}>英語: {_.upperCase(studentData.english)} </Text>
      {
      //Have not configured for other languages 
      }
      <Text style={styles.degree}>その他言語: { studentData.otherLanguages ? _.upperCase(studentData.otherLanguages) : "-" } </Text>
    </View>
  );
}
