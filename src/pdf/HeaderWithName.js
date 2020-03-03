import React from 'react';
import _ from 'lodash';
import logo from './Logo.png'
import { Link, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    marginBottom: 5,
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 20,
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
  logo: {
    height: 50
  }
});

export default props => {
  const { studentData } = props;
  return (
    <View style={styles.container} fixed>
      <Image style={styles.logo}
        src={logo}
      />
      <View style={styles.detailColumn}>
        <Text style={styles.name}>{studentData.studentid}　{studentData.name}</Text>
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
