import React from 'react';
import _ from 'lodash';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  degree: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    fontFamily: 'Lato Italic',
    fontSize: 10,
  },
});

export default props => {
  const { studentData } = props;
  return(
    <View style={styles.container}>
      <Title>Personal Details</Title>
      <Text style={styles.school}>国籍・地域: {_.startCase(_.camelCase(studentData.country))} </Text>
      <Text style={styles.degree}>性別: { _.capitalize(studentData.gender)}</Text>
      <Text style={styles.candidate}>年齢: {studentData.age}</Text>
    </View>
  );
}