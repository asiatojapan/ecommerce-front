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
      <Title>Languages</Title>
      <Text style={styles.degree}>日本語: {_.upperCase(studentData.japanese)}  {studentData.jlpt ? "(JLPT: " + studentData.jlpt +")" : null}</Text>
      { 
        studentData.jlpt_next ? 
        <Text style={styles.degree}>次回のJLPT受験予約: {studentData.jlpt_next}</Text> :
        null
      }  
      <Text style={styles.degree}>英語: {_.upperCase(studentData.english)} </Text>
      { 
        studentData.other_languages ? 
        <Text style={styles.degree}>その他言語: {studentData.other_languages}</Text> :
        null
      }  
    </View>
  );
}
