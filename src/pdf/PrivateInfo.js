import React from 'react';
import _ from 'lodash';

import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
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

export default props => {
  const { studentData } = props;
  return(
    <View style={styles.container}>
      <Image
        src={studentData.videoImg}
      />
      <Text style={styles.school}>名前: { studentData.name } </Text>
      <Text style={styles.degree}>Email: { studentData.email}</Text>
      <Text style={styles.candidate}>住所: {studentData.address}</Text>
      <Text style={styles.candidate}>Skype: {studentData.skype}</Text>
    </View>
  );
}