import React from 'react';
import _ from 'lodash';

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
import InterviewSlotHeader from './InterviewSlotHeader';
import InterviewSlot from './InterviewSlot';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
  },
  slotContainer: {
    marginBottom: 20,
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

const slotsOnFirstPage = 3
const slotsPerPage = 4

const interviewDataByPage = (interviewData, timePeriod) => {
  const timePeriodInterviewData = interviewData.map(slotData => {
    return {
      ...slotData,
      interviewItems: _.filter(slotData.interviewItems, _.matches({ 'time_period': timePeriod })),
    }
  })

  //Remove Students Without Any Interview Slots
  const filteredInterviewData = _.sortBy(
                                  _.filter(timePeriodInterviewData, 
                                      slotData => slotData.interviewItems.length > 0 )
                                  , slotData => slotData.interviewItems[0].time)

  if(filteredInterviewData.length <= slotsOnFirstPage) {
    return [filteredInterviewData]
  } else {
    const firstPageData = _.slice(filteredInterviewData, 0, slotsOnFirstPage)
    const subsequentPageData = _.chunk(_.slice(filteredInterviewData, slotsOnFirstPage, interviewData.length), slotsPerPage)
    return [firstPageData].concat(subsequentPageData)
  }
}

const InterviewPage = ({interviewPageData}) => (
  <View style={styles.container} wrap = {false}>
        <InterviewSlotHeader />
        {
          interviewPageData.map(interviewSlotData =>
            <InterviewSlot key={interviewSlotData._id} interviewSlotData={interviewSlotData} style={styles.slotContainer} />
          )
        }

  </View>
)

const InterviewSchedule = props => (
  <Page {...props} style={styles.page}>
    <Header interviewData={props.interviewData} />
    {
      interviewDataByPage(props.interviewData, props.timePeriod).map(interviewPageData =>
        <InterviewPage key={interviewPageData} interviewPageData={interviewPageData}/>)
    }
    <Text style={styles.footer}>STUDY GO WORK JAPAN</Text>
  </Page>
);

export default (props) => (
  <Document
    author="STUDY GO WORK JAPAN<"
    title={ props.interview }
  >
  </Document>
);