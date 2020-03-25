import React from 'react';

import Title from './Title';
import List, { Item } from './List';
import _ from 'lodash';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  entryContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    fontFamily: 'Lato Italic',
  },
  detailContainer: {
    width: '100%',
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
    fontSize: 10,
  },
  details: {
    fontSize: 10,
    fontFamily: 'Lato',
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
    fontSize: 14,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Lato Bold',
  },
});

const ExperienceEntry = ({ japaneseTitle, englishTitle, details }) => {

  if (!details) {
    return null;
  }

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
      <View style={styles.detailContainer}>
          {details.split('\n').map((item, key) => {
            if(item.length == 0) {
              return <Text key={key}>{"\n"}</Text>;
            }

            return <Text style={styles.details} key={key}>{_.startCase(item)}</Text>
          })}
      </View>
    </View>
  );
};

const experienceData = (studentData) => [
  {
    japaneseTitle: '学歴備考',
    englishTitle: 'Experience',
    details: studentData.qualification,
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
  } 
];

const Experience = ({studentData}) => (
  <View style={styles.container}>
    {
      
      //<Title>学歴備考 (Experience)</Title>
    }
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
