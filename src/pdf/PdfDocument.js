import React, {memo} from 'react';
import {   Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer'

  const styles = StyleSheet.create({
    title: {
      margin: 20,
      fontSize: 25,
      textAlign: 'center',
      backgroundColor: '#e4e4e4',
      textTransform: 'uppercase',
    },
    body: {
      flexGrow: 1,
    },
    row: {
      flexGrow: 1,
      flexDirection: 'row',
    },
    block: {
      flexGrow: 1,
    },
    text: {
      width: '60%',
      margin: 10,
      textAlign: 'justify',
    },
    fill1: {
      width: '40%',
      backgroundColor: '#e14427',
    },
    fill2: {
      flexGrow: 2,
      backgroundColor: '#e6672d',
    },
    fill3: {
      flexGrow: 2,
      backgroundColor: '#e78632',
    },
    fill4: {
      flexGrow: 2,
      backgroundColor: '#e29e37',
    },
  });

const MyDoc = ({student}) => (

  <Document>
   <Page size="A4">
     <View style={styles.body}>
       <View style={styles.row}>
         <Text style={styles.text}>{student.name}
           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
           aliquip ex ea commodo consequat. Duis aute irure dolor in
           reprehenderit in voluptate velit esse cillum.
         </Text>
         <View style={styles.fill1} />
       </View>
       <View style={styles.row}>
         <View style={styles.fill2} />
         <Text style={styles.text}>
           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
           aliquip ex ea commodo consequat. Duis aute irure dolor in
           reprehenderit in voluptate velit esse cillum.
         </Text>
       </View>
       <View style={styles.row}>
         <Text style={styles.text}>
           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
           aliquip ex ea commodo consequat. Duis aute irure dolor in
           reprehenderit in voluptate velit esse cillum.
         </Text>
         <View style={styles.fill3} />
       </View>
       <View style={styles.row}>
         <View style={styles.fill4} />
         <Text style={styles.text}>
           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
           aliquip ex ea commodo consequat. Duis aute irure dolor in
           reprehenderit in voluptate velit esse cillum.
         </Text>
       </View>
     </View>
   </Page>
  </Document>
)


const Link = ({student}) => {
    return (
      <div>
        <PDFDownloadLink document={<MyDoc student={student}/>} fileName={student.studentid + " Resume.pdf"}>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Resume')}
        </PDFDownloadLink>
      </div>
    );
};

export const PdfDocument = memo(Link, (prevProps, newProps) => {
    return true
})
