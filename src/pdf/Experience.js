import React from 'react';

import Title from './Title';
import List, { Item } from './List';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import ipaexg from './fonts/ipaexg.ttf'

Font.register( {
  family: 'Ipaexg',
  src: ipaexg,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  entryContainer: {
    marginBottom: 10,
  },
  date: {
    fontFamily: "Ipaexg",
    fontSize: 11,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontFamily: "Ipaexg",
    fontSize: 10,
  },
  details: {
    fontFamily: "Ipaexg",
    fontSize: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
  },
  title: {
    fontFamily: "Ipaexg",
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
  },
});

const ExperienceEntry = ({ japaneseTitle, englishTitle, details }) => {
  const title = `${japaneseTitle} (${englishTitle})`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}> </Text>
        </View>
      </View>
      <List>
          <Text style={styles.details}>{details}</Text>
        
      </List>
    </View>
  );
};

const experienceData = (studentData) => [
  {
    japaneseTitle: '研究テーマ',
    englishTitle: 'Research Theme',
    details: studentData.research,
  },
  {
    japaneseTitle: 'インターンシップ',
    englishTitle: 'Internship',
    details: studentData.internship,
  },
  {
    japaneseTitle: 'その他PR',
    englishTitle: 'Additional Comments',
    details: studentData.other_pr,
  },
  {
    japaneseTitle: '日本で働きたい理由',
    englishTitle: 'Why Work in Japan?',
    details: studentData.why_work_in_japan,
  }
];

const Experience = ({studentData}) => (
  <View style={styles.container}>
    <Title>Experience</Title>
    {experienceData(studentData).map(({ japaneseTitle, englishTitle, details }) => (
      <ExperienceEntry
        japaneseTitle={japaneseTitle}
        englishTitle={englishTitle}
        details={details}
        key={englishTitle}
      />
    ))}
  </View>
);

export default Experience;
