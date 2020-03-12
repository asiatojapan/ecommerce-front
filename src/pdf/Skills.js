import React from 'react';
import _ from 'lodash';

import Title from './Title';
import List, { Item } from './List';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
  },
  list: {
    fontSize: 9,
    flexDirection: 'row',
    width: 170,
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
});

const SkillEntry = ({ name, skills }) => (
   <View style={styles.item}>
      {skills.map((skill, i) => (
        <Text style={styles.itemContent} key={i} break>{_.trim(skill)} </Text>
      ))}
  </View>
);

export default props => {
  const { studentData } = props;
  return(
    <View>
    {studentData.it_skills.length > 0 ? <Title>Skills</Title> : null }
    <SkillEntry
      name="IT Skills"
      skills={studentData.it_skills}
    /> 
    {studentData.github == null ? null : <Text style={styles.itemContent}> Github: {studentData.github} </Text>  }
  </View>
  );
}
