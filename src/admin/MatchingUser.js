import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';
import { moveRecOne, moveRecTwo, readUser, matchStudent, recordRecOne, moveFavorites } from './apiAdmin';
import {  getFavStudents  } from '../core/apiCore';
import AddRec from "./AddRec";
import AddPreRec from "./AddPreRec";
import AddPush from "./AddPush";
import AddHide from "./AddHide";
import AddInterview from "./AddInterview";
import SiteWrapper from '../templates/SiteWrapper'
import {
  Page,
  Grid,
} from "tabler-react";
import { Table } from "./ManageStudents";
import { logout } from "../actions/session";
import moment from "moment";
import UpdateStudentRatings from "./UpdateStudentRatings"

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


function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}



const MatchingUser = ({ logout, session, match }: Props) => {
    const [students, setStudents] = useState([]);
    const data = students

    const [user1, setUser1] = useState({});
    const [error, setError] = useState(false);

    const { darwin_uid, darwin_myTk } = isAuthenticates();


    const loadSingleUser = () => {
        readUser(match.params.userId, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setUser1(data);
               //  console.log(data)
            }
        });
    };


    const loadFavStudents = () => {
        getFavStudents(match.params.userId, darwin_myTk).then(data => {
            setItems(data);
            // console.log(data)
        });
    };

    const loadStudents = () => {
        matchStudent(match.params.userId, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStudents(data);
                setLoading(false);
            }
        });
    };


  const recordRec = () => {
    setLoading(true);
    recordRecOne(match.params.userId, darwin_myTk).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setLoading(false); 
            window.location.reload(false);
        }
    });
  };


  const destroyRec = () => {
      setLoading(true);
      moveRecOne(match.params.userId, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setLoading(false); 
              window.location.reload(false);
          }
      });
  };


  const destroyRecTwo = () => {
    setLoading(true);
    moveRecTwo(match.params.userId, darwin_myTk).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setLoading(false); 
            window.location.reload(false);
        }
    });
};


const destroyFavorites = () => {
  setLoading(true);
  moveFavorites(match.params.userId, darwin_myTk).then(data => {
      if (data.error) {
          console.log(data.error);
      } else {
          setLoading(false); 
          window.location.reload(false);
      }
  });
};


  useEffect(() => {
    loadSingleUser();
    }, []);

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        loadFavStudents();
    }, []);


    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);
  
    const [items, setItems] = useState([]);


    const columns = React.useMemo(
     () => [
       // Let's make a column for selection
       {
        Header: 'New',
        id: 'new',
        Filter: '',
        accessor: (text, i) => <> 
           {moment(text.createdAt).format("MM/DD")} </>
      },
       {
             Header: 'ID',
             accessor: "studentid",
             Filter: "",
             id: "studentid"
          
           },
       {
             Header: 'Name',
             Filter: "",
             accessor: (text, i) => 
             <> <Link to={`/student/${text._id}`} target="_blank">{text.name} </Link>  <br/>
              { text.inJapan === true ? <span className="badge bg-red">日本在住 </span>: null }  <br/>
              { text.forNextMonth === true ? <span className="badge bg-yellow"> 翌月Only </span>: null }  <br/>
              {text.ratings}
              </> ,
             id: "name"
           },

          {
            Header: 'タグ',
            Filter: "",
            accessor: (text, i) =>
            <div style={{width: "100px"}}>{text.tags.map((t, i) => <span className="badge bg-blue m-1">{t}</span> )}
            <div style={{fontSize: "10px"}} >{text.university} </div>
            <div style={{fontSize: "10px"}} >{text.grad_year} / {text.grad_month} </div>
            <div class="tooltip2">コメント
              <span class="tooltiptext">{text.comments}</span>
            </div>
            </div> 
          },
          
          {
            Header: '国籍',
            Filter: "",
             accessor: "countryTags",
             id: "countryTags"
          },
          {
            Header: '日本語',
            Filter: "",
             accessor: "japanese",
             id: "japanese"
          },
         
          {
            Header: '国籍',
            Filter: "",
            accessor: (text, i) =>
            <div>
            { text.countryTagsMatch !== 0 ? "●": null}
            </div>
          },

          {
            Header: '日本語',
            Filter: "",
            accessor: (text, i) =>
            <div>
            { text.japaneseTagsMatch !== 0 ? "●": null}
            </div>
          },
          {
            Header: '学歴',
            Filter: "",
            accessor: (text, i) =>
            <div>
            { text.educationBgTagsMatch !== 0 ? "●": null}
            </div>
          },

          {
            Header: '上位大学',
            Filter: "",
            accessor: (text, i) =>
            <div>
            { text.topUni === true ? "●": null }
            </div>
          },

          {
            Header: 'タグ%',
            Filter: SelectColumnFilter,
            accessor: "tagsMatchPercent",
            id: "tagsMatch"
          },
          {
            Header: 'M?',
            Filter: SelectColumnFilter,
            accessor: "otherTagsPoints"
          },
          {
            Header: 'Job',
            Filter: SelectColumnFilter,
            accessor: (text, i) =>
            <div style={{width: "140px"}}> {text.jobPoints.length == null ? null : 
            <> {text.jobPoints.map((t, i) => <>{t.jobName} [{t.points}] <br/> </>)}</> }
          </div> 
          },

          {
            Header: 'Faved',
            Filter: "",
            accessor: (text, i) =>
            <div style={{width: "80px"}}>  {text.favUsers.length == null? "" : 
            <div> {text.favUsers.map((t, i) => <span className="badge bg-blue m-1">{t.name}</span>)}</div> }
             {text.result ? <> 
            { text.result.filter(text => text.type === "検討リスト").map((e)=> <span className="badge bg-secondary m-1"> {moment(e.eventPeriod).format("YY/MM")} </span> )} </> : null }
         
          </div> 
          },

          {
            Header: '推薦', 
            Filter: "",
            accessor: (text, i) =>
            <div>
            <p><AddPreRec student={text} userIdFromTable={match.params.userId} /></p>
            <AddRec student={text} userIdFromTable={match.params.userId} />
            {text.result ? <> 
            { text.result.filter(text => text.type === "推薦1").map((e)=> <span className="badge bg-secondary m-1"> {moment(e.eventPeriod).format("YY/MM/DD")} </span> )} </> : null }
            </div>
          },
  {
          Header: '推薦2', 
          Filter: "",
          accessor: (text, i) =>
          <div>
          <AddPush student={text} userIdFromTable={match.params.userId} />
          {text.result ? <> 
            { text.result.filter(text => text.type === "推薦2").map((e)=> <span className="badge bg-secondary m-1"> {moment(e.eventPeriod).format("YY/MM/DD")} </span> )} </> : null }
          </div>
        },
          {
            Header: '面接',
            Filter: "",
            accessor: (text, i) =>
            <div>
              <AddInterview student={text} userIdFromTable={match.params.userId}  />
            </div>
          },

          {
            Header: 'Hide',
            Filter: "",
            accessor: (text, i) =>
            <div>
            <AddHide student={text} userIdFromTable={match.params.userId} />
            </div>
          },

    ],
      []
    );

  
   
    return (
      <SiteWrapper>
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
      <Page.Content>
      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item"><a className="link" href="/admin/users">All Users</a></li>
        <li className="breadcrumb-item"><a className="link" href={`/admin/profile/${user1._id}`}>{user1.name} </a></li>
         <li className="breadcrumb-item active" aria-current="page">Matching</li>
      </ol>   
    
      <div class="list-list" style={{padding: "0"}}> 
      <div className="card-header" style={{justifyContent: "space-between"}}>
           <h3 className="mb-0">{user1.name}</h3>
      <div>

            <button className="likeBtn smaller mr-2" 
                     onClick={() => { if (window.confirm('Are you sure you wish to remove all 推薦1? ')) destroyRec()} } >
                  推薦1一括削除
            </button>

            <button className="likeBtn smaller mr-2" 
                     onClick={() => { if (window.confirm('Are you sure you wish to remove all 推薦2? ')) destroyRecTwo()} } >
                  推薦2一括削除
            </button>

            <button className="likeBtn smaller mr-2" 
                     onClick={() => { if (window.confirm('Are you sure you wish to remove all 検討リスト? ')) destroyFavorites()} } >
                  検討リスト削除
            </button>

            <a type="button" className="likeBtn smaller mr-2" 
                      href={`/admin/recommends/${user1._id}`}>
                  メール用
            </a>
    
             <a type="button" className="unlikeBtn resumeGradient smaller" 
                      href={`/admin/user/update/${user1._id}`}>
                  編集
            </a>
      </div>
      </div>
          <div className="card-body" style={{padding: "0px"}}>
        <div className="table-responsive">
        <table className="table card-table table-striped">
         <tbody>
            <tr>
            <td><span class="text-muted">タグ</span></td>
            <td>{user1.tags ? user1.tags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.tags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">国籍</span></td>
            <td>{user1.countryTags ? user1.countryTags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.countryTags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">学歴</span></td>
            <td>{user1.educationBgTags ? user1.educationBgTags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.educationBgTags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">日本語</span></td>
            <td>{user1.japaneseTags ? user1.japaneseTags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.japaneseTags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

        </tbody>
        </table>
       </div>
       </div>
       </div>
      
  
        <div class="list-list" style={{padding: "10px"}}> 
          <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
        </div>
      </Page.Content>
    </SiteWrapper>
    );
};

export default MatchingUser;
