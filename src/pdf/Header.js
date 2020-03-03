import React from 'react';
import _ from 'lodash';

import { Link, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Lato Bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
});

export default props => {
  const { studentData } = props;
  return (
    <View style={styles.container} fixed>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>{studentData.studentid}</Text>
        <Text style={styles.subtitle}>Study Go Work JAPAN</Text>
        {
          // <Text style={styles.subtitle}>{studentData.tags.map(tag => "| " + _.trim(tag)) + " "}</Text>
        }
      </View>
      {
        /*
          <View style={styles.linkColumn}>
            <Text style={styles.subtitle}>Study Go Work JAPAN</Text>
          </View>
        */
      }
    </View>
  );
}
