import React from 'react';
import _ from 'lodash';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
  degree: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
});


export default ({ studentData }) =>
  <View style={styles.container}>
    <Title>Education</Title>
    <Text style={styles.school}>大学: {_.startCase(_.camelCase(studentData.university))}</Text>
    <Text style={styles.degree}>学歴: {_.startCase(_.camelCase(studentData.education_bg))}</Text>
    <Text style={styles.degree}>学部: {_.startCase(_.camelCase(studentData.faculty))}</Text>
    <Text style={styles.degree}>学科: {_.startCase(_.camelCase(studentData.major))}</Text>
    <Text style={styles.candidate}>卒業(年/月): {studentData.grad_year + "/" + studentData.grad_month}</Text>
  </View>
