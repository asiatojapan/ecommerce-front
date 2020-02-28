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
});

const SkillEntry = ({ name, skills }) => (
  <View>
    <Text style={styles.title}>{name}</Text>
    <List>
      {[...skills, ""].map((skill, i) => (
        <Item key={i}>{_.trim(skill)}</Item>
      ))}
    </List>
  </View>
);

export default props => {
  const { studentData } = props;
  return(
  <View>
    <Title>Skills</Title>
    <SkillEntry
      name="IT Skills"
      skills={studentData.it_skills}
    />
  </View>
  );
}
