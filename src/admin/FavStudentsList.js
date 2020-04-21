import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getStudents } from '../core/apiCore';
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const Suisen = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();
  const loadStudents = () => {
      getStudents(darwin_uid, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStudents(data);
              setLoading(false)
          }
      });
  };


  useEffect(() => {
      loadStudents();
  }, []);


    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>
      <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>ID </th>
                    <th>学生</th>
                    <th>推薦1</th>
                    <th>推薦2</th>
                    <th>Fav</th>
                    
                    </tr>
                </thead> <tbody>{students.map((student,i) => 
           <tr>
                <td>
                  {student.studentid}
                </td>
                <td>
                {student.name}
                </td>
                <td>
                {student.recUsers.map((user, i) => <>{user.name},</>)}
                </td>
                <td>
                {student.pushUsers.map((user, i) => <>{user.name},</>)}
                </td>
                <td>
                {student.favUsers.map((user, i) => <>{user.name},</>)}
                </td>
         </tr>)}</tbody>
        </table>    
        </div>
      </Container>
      </SiteWrapper>
    );
};

export default Suisen;
