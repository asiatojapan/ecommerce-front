import React from 'react';
import _ from 'lodash';

import { Text, View, StyleSheet,  Font } from '@react-pdf/renderer';
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


export default ({ studentData }) =>
  <View style={styles.container}>
    <Title>Education</Title>
    <Text style={styles.school}>{_.startCase(_.camelCase(studentData.university))} (大学)</Text>
    <Text style={styles.degree}>{_.startCase(_.camelCase(studentData.education_bg))} (学歴)</Text>
    <Text style={styles.degree}>{_.startCase(_.camelCase(studentData.faculty))} (学部)</Text>
    <Text style={styles.degree}>{_.startCase(_.camelCase(studentData.major))} (学科)</Text>
    <Text style={styles.candidate}>{studentData.grad_year + "/" + studentData.grad_month} (卒業(年/月))</Text>
  </View>
