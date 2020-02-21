import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../auth";
import { getStudents } from '../core/apiCore';
import { deleteStudent, getCheckStudents } from "./apiAdmin";
import { Link } from "react-router-dom";
import { useTable, useSortBy, useFilters, useGlobalFilter,useRowSelect } from 'react-table'
import matchSorter from 'match-sorter'
import SiteWrapper from '../templates/SiteWrapper'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Table2 from 'react-bootstrap/Table';
import ImportStudents from "./ImportStudents";

import {
  Dropdown,
  Container,
} from "tabler-react";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length

  return (

        <input
          value={globalFilter || ''}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          }}
          placeholder={`検索`}
          className="form-control" 
          style={{marginBottom: "1rem"}}
          />
  )
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      style={{width: "100%"}}
      placeholder={`Search ${count}`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
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
      style={{width: "100%"}}
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

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

export const Table = function ({ columns, data, selectedRows, onSelectedRowsChange }) {

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    state,
    rows,
    flatColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: {
        selectedRowPaths: selectedRows
      },
    filterTypes,
    },
   useFilters, useGlobalFilter, useSortBy,useRowSelect,
)

  useEffect(() => {
    onSelectedRowsChange(selectedFlatRows);
    }, [onSelectedRowsChange, selectedFlatRows]);

  // Render the UI for your table
  return (
    <div>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={state.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    <div style={{background:"#fff"}}>
    <Table2 bordered hover size="sm" style={{fontSize: "12px"}} cellspacing="0" {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.canFilter ? column.render('Filter') : null}
                  {column.isSorted ? (column.isSortedDesc ? ' ↑' : ' ↓') : ''}
                  </span>
                  </th>
               
              ))}
            </tr>
          ))}
        
      </thead>
      
      <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
          )
        })}
        
      </tbody>
    </Table2>
    </div>

   
    </div>
  )
}

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = isAuthenticated();
  const loadStudents = () => {
      getStudents().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStudents(data);
              setLoading(false)
          }
      });
  };

  const destroy = studentId => {
      deleteStudent(studentId, user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              loadStudents();
          }
      });
  };


  const columns = React.useMemo(
   () => [
     // Let's make a column for selection
     {
       id: "selection",
       // The header can use the table's getToggleAllRowsSelectedProps method
       // to render a checkbox
       Header: ({ getToggleAllRowsSelectedProps }) => (
         <div>
           <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
         </div>
       ),
       // The cell can use the individual row's getToggleRowSelectedProps method
       // to the render a checkbox
       Cell: ({ row }) => (
         <div>
           <input type="checkbox" {...row.getToggleRowSelectedProps()} />
         </div>
       )
     },
     {
      Header: 'Info',
      columns: [
    {
          Header: 'StudentID',
          id: 'sid',
          sortType: 'basic',
          filter: 'fuzzyText',
          accessor: "studentid"
        },
    {
          Header: 'Name',
          accessor: 'name',
          id: 'name',
        },
    {
      Header: 'Age',
      accessor: 'age',
      id: 'age',
      sortType: 'basic',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: '国籍',
      accessor: 'country',
      id: 'country',
      sortType: 'basic',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: '大学',
      accessor: 'university',
      id: 'uni',
      sortType: 'basic',
      Filter: SelectColumnFilter,
      filter: 'includes'
    } ]},
   
    {
      Header: 'Like',
      columns: [
    {
      Header: 'Faved',
      Filter: "",
      accessor: "favoritesCount",
     
    },
    {
      Header: 'Faved',
      Filter: "",
      accessor: (text, i) =>
      <div> {text.favUsers.length == null? "" : 
      <div> {text.favUsers.map((t, i) => <span class="badge bg-blue">{t.name}</span>)}</div> }
    </div> 
    } ]  }
    ,
    {
      Header: '面接',
      columns: [

    {
      Header: '面接',
      Filter: "",
      accessor: (text, i) =>
      <div> {text.interviews.length == null? "" : text.interviews.length}
    </div>
    
    },
     ] },



    {
      Header: 'フェーズ',
      accessor: "status",
      Filter: SelectColumnFilter,
    },

    {
      Header: "Actions",
      Filter: "",
      accessor: (text, i) =>
      <DropdownButton id="btn-sm dropdown-primary-button" title="Actions" size="sm" variant="secondary">
        <Dropdown.Item to={`/student/${text._id}`}>View </Dropdown.Item>
        <Dropdown.Item to={`/admin/student/update/${text._id}`} >Update</Dropdown.Item>
        <Dropdown.Item >  <a onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(text._id) } } >
                Delete
            </a></Dropdown.Item>
      </DropdownButton>,
      filterable : true
    }
  ],
    []
  );

  const data = students

  const [selectedRows, setSelectedRows] = useState([]);

  const selectedRowKeys = Object.values(selectedRows);

  const clickList = e => {
      getCheckStudents(selectedRows.map(
                          d => d.original._id), "リスト");
                          window.location.reload();
  };

  const clickInvite = e => {
      getCheckStudents(selectedRows.map(
                          d => d.original._id), "来日可否");
                          window.location.reload();
  };

  const clickYes = e => {
    getCheckStudents(selectedRows.map(
                        d => d.original._id), "来日決定");
                        window.location.reload();
};

const clickPending = e => {
  getCheckStudents(selectedRows.map(
                      d => d.original._id), "Shortlist");
                      window.location.reload();
};

  const clickFailed = e => {
      getCheckStudents(selectedRows.map(
                          d => d.original._id), "NG");
                            window.location.reload();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
      loadStudents();
  }, []);


    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>
       <div class="card-header"><h3 class="card-title">Students </h3>
       <div class="card-options">
       <Button className="btn btn-sm btn-secondary ml-2" variant="primary" onClick={handleShow}>
        フェーズ
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton> フェーズ変更
        </Modal.Header>
        <Modal.Body>
        <div class="btn-list">
        <button className="btn btn-primary" onClick={() => { if (window.confirm('Are you sure you wish add this phase?')) clickList() } } >リスト掲載</button>
        <button className="btn btn-primary" onClick={() => { if (window.confirm('Are you sure you wish add this phase?')) clickInvite() } } >来日可否</button>
        <button className="btn btn-primary" onClick={() => { if (window.confirm('Are you sure you wish add this phase?')) clickYes() } } >来日決定</button>
        <button className="btn btn-primary" onClick={() => { if (window.confirm('Are you sure you wish add this phase?')) clickPending() } } >Shortlist</button>
        <button className="btn btn-primary" onClick={() => { if (window.confirm('Are you sure you wish add this phase?')) clickFailed() } } >NG</button>
        </div>
        </Modal.Body>
      </Modal>
       <Link to={`/admin/create/student`} className="btn btn-sm btn-secondary"> + Add Students </Link> <br/>

       <ImportStudents/>
        </div>
        </div>
        <div>
         <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
       </div> </Container>
      </SiteWrapper>
    );
};

export default ManageStudent;
