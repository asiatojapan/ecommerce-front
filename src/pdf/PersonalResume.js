import React from 'react';

import ReactPDF, {
  Text,
  Document,
  Font,
  Page,
  StyleSheet,
  Image,
  View,
} from '@react-pdf/renderer';
import Header from './Header';
import PersonalDetails from './PersonalDetails';
import Education from './Education';
import Languages from './Languages';
import Experience from './Experience';
import Skills from './Skills';
import PrivateInfo from './PrivateInfo';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
    marginRight: 20,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    '@media max-width: 400': {
      width: '100%',
      paddingRight: 0,
    },
    '@media orientation: landscape': {
      width: 200,
    },
  },
  row: { 
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#555',
    borderBottomStyle: 'solid',
  },
  col: {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: "70%",
    paddingRight: 15,
  },
  colLeft: {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: "30%",
    paddingRight: 15,
  },
  footer: {
    fontSize: 8,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginTop: 0,
    padding: 5,
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
  logo: {
    width: 20
  }
});

const Resume = props => (
  <Page {...props} style={styles.page}>
    <Header studentData={props.studentData} />
    <View style={styles.row}>
        <View style={styles.colLeft}>
          <PersonalDetails studentData={props.studentData} />
        </View>
        <View style={styles.col}>
          <Education studentData={props.studentData} />
        </View>
        </View>
        <View style={styles.row}>
          <View style={styles.colLeft}>
        <Languages studentData={props.studentData} />
        </View>
        <View style={styles.col}>
        <Skills studentData={props.studentData} /> 
        </View> 
    </View>
    <View style={styles.row}>
      <Experience studentData={props.studentData} />
    </View>
    <Text style={styles.footer}>
      STUDY GO WORK JAPAN</Text>
  </Page>
);

export default (props) => (
  <Document
    author="STUDY GO WORK JAPAN"
  >
  </Document>
);