import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';
import {  matchUser } from './apiReverseMatching';
import {  readStudent  } from '../core/apiCore';
import { open } from "./open";
import { sales_rep } from "./sales_rep";
import Checkbox2 from "../core/Checkbox";
import  AddRec from './AddRec';
import  AddPreRec from './AddPreRec';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Page,
  Grid,
} from "tabler-react";
import { Table } from "../admin/ManageStudents";
import { logout } from "../actions/session";
import moment from "moment"

const mapStateToProps = ({ session }) => ({
session
});

const mapDispatchToProps = dispatch => ({
logout: () => dispatch(logout())
});

interface RouterProps {
  match: any;
}

type Props = RouterProps;

const MatchingStudent = ({ config = null, logout, session, match }: Props) => {

    const [filteredResults, setFilteredResults] = useState([]);

    const [users, setUsers] = useState([]);
    const data = users

    const [student, setStudent] = useState({});
    const [error, setError] = useState(false);

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const [sortConfig, setSortConfig] = React.useState(config);
    const [loading, setLoading] = useState(true)

    const [myFilters, setMyFilters] = useState({
      filters: { tantou: [], open: []}
    });

    const handleFilters = (filters, filterBy) => {
        setLoading(true)
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        loadUsers(myFilters.filters);
        setMyFilters(newFilters);
    };

    const topUniCheck = (topUni, topUniNeeds) => {
      if (topUniNeeds === true && topUni === true) {
        return "✴︎" 
      }
      if (topUniNeeds === false) {
        return "✴︎" 
      }
      else {
        return ""
      }
    }



    const sortedItems = React.useMemo(() => {
      let sortableItems = [...users];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
        // console.log(a[sortConfig.key])
          //console.log(sortConfig.key)
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [users, sortConfig]);

    const requestSort = key => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      //console.log(key)
      setSortConfig({ key, direction });
    }



    const loadSingleStudent = () => {
        readStudent(match.params.studentId, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setStudent(data);
                // console.log(data)
            }
        });
    };


    const loadUsers = (newFilters) => {
        //console.log(newFilters)
        matchUser(match.params.studentId, darwin_myTk, newFilters).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
                setFilteredResults(data);
                setLoading(false)
            }
        });
    };

  useEffect(() => {
    loadSingleStudent();
    loadUsers(myFilters.filters);
    }, []);

  
   
    return (
      <SiteWrapper>
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
      <Page.Content>
      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item"><a className="link" href="/admin/students">All Students</a></li>
        <li className="breadcrumb-item"><a className="link" href={`/student/${student._id}`}> {student.studentid} {student.name} </a></li>
         <li className="breadcrumb-item active" aria-current="page">Matching</li>
      </ol>   
      <Grid.Row>

    <Grid.Col width={12} lg={9} sm={12}>
      <div class="list-list" style={{padding: "0"}}> 
      <div className="card-header" style={{justifyContent: "space-between"}}>
           <h3 className="m-0"><a className="link" _target="blank" href={`/student/${student._id}`}>　{student.studentid}  {student.name} ({student.age}) ({student.skypeTantou}) </a></h3>
      <div>

      <a type="button" className="unlikeBtn resumeGradient smaller" 
                      href={`/admin/student/update/${student._id}`}>
                  編集
            </a>
      </div>
      </div>
          <div className="card-body" style={{padding: "0px"}}>
        <div className="table-responsive">
        <table className="table card-table table-striped">
         <tbody>
            <tr>
            <td><span class="text-muted">国籍/大学</span></td>
            <td>{student.country}・{student.university} { student.topUni? "上位大学" : null}・{student.educationBgTags ? student.educationBgTags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (student.educationBgTags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">卒業</span></td>
            <td>{student.grad_year}/{student.grad_month}
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">日本語・英語</span></td>
            <td>{student.japanese}・{student.english}
            </td>
            </tr>


            <tr>
            <td><span class="text-muted">タグ</span></td>
            <td>{student.tags ? student.tags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (student.tags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">学部</span></td>
            <td>{student.faculty}・{student.major}
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">IT Skill</span></td>
            <td> {student.it_skills ?
                        student.it_skills.map((tag,i) => (
                          <span className="list-inline-item" key={i}>{tag}{i != (student.it_skills.length-1) ? ',' : ''}</span>)) : null}
            </td>
            </tr>
            
        
        </tbody>
            </table>
            <hr style={{margin: 0}}/>
            <div style={{padding: "30px"}}> 
            {student.comments}
            </div>
          </div>
          </div>
          </div>
          
      </Grid.Col>


      <Grid.Col width={12} lg={3} sm={3}>
      <div class="list-list" style={{padding: "10px", fontSize: "10px"}}> 
      <Checkbox2 categories={sales_rep}
                               handleFilters={filters =>
                                   handleFilters(filters, "tantou")} />
       </div>  
       <div class="list-list" style={{padding: "10px"}}> 
       Open:
      <Checkbox2 categories={open}
                               handleFilters={filters =>
                                   handleFilters(filters, "open")} />
       </div>       
      </Grid.Col>                      
      </Grid.Row>
            <div class="list-list" style={{padding: "10px", fontSize: "10px"}}> 
            <div class="table-responsive-sm">
              <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th>
                        <button
                          onClick={() => requestSort('name')}
                        >
                          Name
                        </button>
                        </th>
                        <th>担当</th>
                        <th>国籍</th>
                        <th>日本語</th>
                        <th>学歴</th>
                        <th>国籍</th>
                        <th>上位</th>
                        <th>日本語</th>
                        <th>学歴</th>
                        <th>学歴</th>
                        <th><button　onClick={() => requestSort('tagsMatchPercent')}> タグ％
                       </button></th>
                        <th>
                        <button　onClick={() => requestSort('otherTagsPoints')}> M?
                       </button>
                        </th>
                        <th>推薦</th>
                        </tr>
                    </thead> <tbody>
                      {sortedItems.map((user,i) => 
                  <tr>
                    <td><div style={{width: "100px"}}> {user.name}</div></td>
                      <td><div style={{width: "50px"}}> {user.tantou}</div></td>
                    <td><div style={{width: "150px"}}>{user.tags.map((t, i) => <span style={{fontSize: "10px"}}>{t}, </span> )}</div> </td>
                    <td><div style={{width: "150px"}}>{user.countryTags.map((t, i) => <span style={{fontSize: "10px"}}>{t}, </span> )}</div> </td>
                    <td> <div style={{width: "50px"}}>{user.japaneseTags.map((t, i) => <span style={{fontSize: "10px"}}>{t}, </span> )}</div> </td>
                    <td> <div style={{width: "100px"}}>{user.educationBgTags.map((t, i) => <span style={{fontSize: "10px"}}>{t}, </span> )}</div> </td>
                    <td> {topUniCheck(student.topUni, user.topUniNeeds)}  </td>
                    <td> { user.countryTagsMatch !== 0 ? "●": null} </td>
                    <td> { user.japaneseTagsMatch !== 0 ? "●": null} </td>
                    <td> { user.educationBgTagsMatch !== 0 ? "●": null} </td>
                    <td> {user.tagsMatchPercent}</td>
                    <td> {user.otherTagsPoints}</td>
                    <td>
                    <p><AddPreRec student={student} userIdFromTable={user}/> 
                    </p>
                    <AddRec student={student} userIdFromTable={user}/> </td>
               </tr>)}

            </tbody>
            </table>  
         </div>
         </div>
      </Page.Content>
    </SiteWrapper>
    );
};

export default MatchingStudent;
