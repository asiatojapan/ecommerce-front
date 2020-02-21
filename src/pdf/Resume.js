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
  footer: {
    fontSize: 12,
    fontFamily: 'Lato Bold',
    textAlign: 'center',
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
});

const Resume = props => (
  <Page {...props} style={styles.page}>
    <Header studentData={props.studentData} />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        {
          props.studentData.videoImg ? 
            <Image
              src={props.studentData.videoImg}
              style={styles.image}
            /> :
            null
        }
        <PersonalDetails studentData={props.studentData} />
        <Education studentData={props.studentData} />
        <Languages studentData={props.studentData} />
        <Skills studentData={props.studentData} />
      </View>
      <Experience studentData={props.studentData} />
    </View>
    <Text style={styles.footer}>STUDY GO WORK JAPAN</Text>
  </Page>
);

export default (props) => (
  <Document
    author="STUDY GO WORK JAPAN<"
    title={ props.student.studentid }
  >
    <Resume size="A4" studentData={props.student} />
  </Document>
);