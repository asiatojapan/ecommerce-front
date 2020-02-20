import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Ipaexg from "./fonts/ipaexg.ttf"

Font.register({ family: 'Ipaexg', src: Ipaexg });

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Ipaexg',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>へ</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);


const Resume = (props) => (
  <PDFViewer>
    <MyDocument studentData={props.studentData} />
  </PDFViewer>
);


export default Resume;
