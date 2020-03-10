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
  boldText: {
    fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  normalText: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
});

export default props => {
  const {interviewSlotData} = props;
  
  const interviewDetails = interviewSlotData.interviewItems[0]
  const studentDetails = interviewSlotData.student

  if(!interviewDetails) {
    return null
  }

  const interviewTime = interviewDetails.time
  const interviewCategory = interviewDetails.category
  const studentid = studentDetails.studentid
  const studentName = studentDetails.name

  return(
    <View style={styles.container}  wrap={false}>
      <View style={styles.normalWidth}>
        <Text style={styles.normalText}>{interviewTime}</Text>
      </View>
      <View style={styles.normalWidth}>
        <Text style={styles.normalText}>{interviewCategory}</Text>
      </View>
      <View style={styles.normalWidth}>
        <Text style={styles.boldText}>{studentid}</Text>
      </View>
      <View style={styles.tripleWidth}>
        <Text style={styles.boldText}>{studentName}</Text>
      </View>
      <View style={styles.oneHalfWidth}>
        <Text style={styles.normalText}>〇 ・ △ ・ ×</Text>
      </View>
      <View style={styles.oneHalfWidth}>
        <Text style={styles.normalText}>〇 ・ ×</Text>
      </View>
      <View style={styles.doubleWidth}>
        <Text style={styles.normalText}>
          日本語力:{"\n"}
          5・4・3・2・1{"\n"}
          入社希望:{"\n"}
          5・4・3・2・1{"\n"}
          スキルマッチ:{"\n"}
          5・4・3・2・1{"\n"}
          人物マッチ:{"\n"}
          5・4・3・2・1
        </Text>
      </View>
      <View style={styles.remainingWidth}>
        <Text />
      </View>
    </View>
  );
}