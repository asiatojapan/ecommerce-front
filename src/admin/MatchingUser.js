import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';
import { deleteUser,readUser, matchStudent } from './apiAdmin';
import { getStudents, getFavStudents, createOrder } from '../core/apiCore';
import AddRec from "./AddRec";
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
        accessor: (text, i) => <> {text.newOnList ? "新"　: null} </>
      },
       {
             Header: 'StudentID',
             accessor: "studentid",
             id: "studentid"
          
           },
       {
             Header: 'Name',
             Filter: "",
             accessor: (text, i) => 
             <Link to={`/student/${text._id}`} target="_blank">{text.name} </Link>,
             id: "name"
           },

          {
            Header: 'タグ',
            Filter: "",
            accessor: (text, i) =>
            <div> {text.tags.map((t, i) => <span className="badge bg-blue m-1">{t}</span>)}</div> 
          },
          
          {
            Header: '国籍',
            Filter: SelectColumnFilter,
             accessor: "countryTags",
             id: "countryTags"
          },
          {
            Header: '日本語',
            Filter: SelectColumnFilter,
             accessor: "japanese",
             id: "japanese"
          },
          {
            Header: '学歴',
            Filter: SelectColumnFilter,
             accessor: "educationBgTags",
             id: "educationBgTags"
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
            Header: 'Otherタグ',
            Filter: SelectColumnFilter,
            accessor: "otherTagsPoints",
            id: "otherTagsPoints"
          },

          {
            Header: 'タグ%',
            Filter: SelectColumnFilter,
            accessor: "tagsMatchPercent",
            id: "tagsMatch"
          },


          {
            Header: '推薦', 
            Filter: "",
            accessor: (text, i) =>
            <div>
            <AddRec student={text} userIdFromTable={match.params.userId} />
            </div>
          },
  {
          Header: '推薦2', 
          Filter: "",
          accessor: (text, i) =>
          <div>
          <AddPush student={text} userIdFromTable={match.params.userId} />
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
      <div class="list-list"> 
            <div class="card-body">
                <h3 class="h3 mt-0 mb-4">{user1.name}</h3>
                <p class="mb-0">
                <b>タグ</b>: {user1.tags ? user1.tags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.tags.length-1) ? ',' : ''}</span>
                  ) : null} 
                  
                </p>

                <p class="mb-0">
                 <b>国籍</b> : {user1.countryTags ? user1.countryTags.map((tag, i) => 
                   <span className="list-inline-item">{tag}{i != (user1.countryTags.length-1) ? ',' : ''}</span>
                  ) : null} 
                </p>

                <p class="mb-0">
                 <b>学歴</b> : {user1.countryTags ? user1.educationBgTags.map((tag, i) => 
                   <span className="list-inline-item">{tag}{i != (user1.educationBgTags.length-1) ? ',' : ''}</span>
                  ) : null} 
                </p>

                <p class="mb-0">
                 <b> 日本語</b> : {user1.japaneseTags ? user1.japaneseTags.map((tag, i) => 
                   <span className="list-inline-item">{tag}{i != (user1.japaneseTags.length-1) ? ',' : ''}</span>
                  ) : null} 
                </p>
                
                </div>
        </div>
        <div class="list-list"> 
        <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
        </div>
      </Page.Content>
    </SiteWrapper>
    );
};

export default MatchingUser;
