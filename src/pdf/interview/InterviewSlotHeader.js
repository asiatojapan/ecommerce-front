import React from 'react';
import _ from 'lodash';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Title from '../Title';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  normalWidth: {
    flexBasis: 50,
  },
  oneHalfWidth: {
    flexBasis: 75,
  },
  doubleWidth: {
    flexBasis: 100,
  },
  tripleWidth: {
    flexBasis: 150,
  },
  remainingWidth: {
    flexGrow: 1,
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

export default () => {
  return(
    <View style={styles.container}>
      <View style={styles.normalWidth}>
        <Title>Time</Title>
      </View>
      <View style={styles.normalWidth}>
        <Title>Type</Title>
      </View>
      <View style={styles.normalWidth}>
        <Title>ID</Title>
      </View>
      <View style={styles.tripleWidth}>
        <Title>Name</Title>
      </View>
      <View style={styles.oneHalfWidth}>
        <Title>合否</Title>
      </View>
      <View style={styles.oneHalfWidth}>
        <Title>合否{"\n"}(最終)</Title>
      </View>
      <View style={styles.doubleWidth}>
        <Title>チェック{"\n"}(５が高い)</Title>
      </View>
      <View style={styles.remainingWidth}>
        <Title>メモ</Title>
      </View>
    </View>
  );
}