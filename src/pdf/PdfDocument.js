import React, {memo} from 'react';
import {   Document,
  Page,
  Text,
  View,
  StyleSheet, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const MyDoc = ({student}) => (
  <Document>
      <Page size="A4" style={styles.page}>
          <View style={styles.section}>
              <Text>{student.name}</Text>
          </View>
          <View style={styles.section}>
              <Text>Section #2</Text>
          </View>
      </Page>
  </Document>
)


const Link = ({student}) => {
    return (
      <div>
        <PDFDownloadLink document={<MyDoc student={student}/>} fileName="somename.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </div>
    );
};

export const PdfDocument = memo(Link, (prevProps, newProps) => {
    return true
})
