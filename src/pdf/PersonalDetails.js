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
      <Title>Personal Details</Title>
      <Text style={styles.school}>{_.startCase(_.camelCase(studentData.country))} (国籍・地域)</Text>
      <Text style={styles.degree}>{_.capitalize(studentData.gender)} (性別)</Text>
      <Text style={styles.candidate}>{studentData.age} (年齢)</Text>
    </View>
  );
}