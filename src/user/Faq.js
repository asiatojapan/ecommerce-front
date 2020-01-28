import React, { useState, useEffect } from 'react';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Page,
  Dropdown,
  Icon,
  Grid,
  Card,
  Text,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";

const Faq = () => {

return (
  <SiteWrapper>

  <Page.Content>
  <div className="my-3 my-md-5">
  <Container>
 FAQ <br/>
 Roles: <br/>
 1) Admin <br/>
 2) Registered Users <br/>
 3) Unregistered Users <br/>
 4) Students <br/>
 <br/>

 For Registered Users <br/>
 Phase I: Companies who started the process <br/>
 What can be seen: <br/>
 - リスト掲載　学生　with buttons <br/>
 - Schedule <br/>

 Phase II: Companies who have already selected <br/>
 - リスト掲載　学生　without buttons <br/>
 - My own students <br/>

 Phase III: After 来日決定　 <br/>
 - 来日学生 with buttons and names <br/>
 - Allow companies to choose more students from 来日 and then put them into unconfirm mode. <br/>
 - 営業 will push them into interview. <br/>

 Phase IV: Before Interviews <br/>
 - interview students with full resume, time. <br/>

For Students: <br/>
- allow students to read the company profile and see their companies interview. <br/>
- edit their ranking and ratings <br/>
- ask if they want to join sgwj again. <br/>


      </Container>
      </div>
      </Page.Content>
</SiteWrapper>
);
};

export default Faq;
