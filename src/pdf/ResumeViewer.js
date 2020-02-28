import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import Resume from "./PersonalResume";
import ReactPDF, {
    Text,
    Document,
    Font,
    Page,
    StyleSheet,
    Image,
    View,
  } from '@react-pdf/renderer';

export default (props) => (
    <PDFViewer>
    <Document
  author="STUDY GO WORK JAPAN"
  title={ props.studentid }
>
  <Resume size="A4" studentData={props.student} />
</Document>
</PDFViewer>
  );
