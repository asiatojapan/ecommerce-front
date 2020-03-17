import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { isAuthenticates } from "../auth";
import { deleteUser, getUsers } from "./apiAdmin";
import { Link } from "react-router-dom";
import SiteWrapper from '../templates/SiteWrapper'
import { useTable, useSortBy, useFilters, useGlobalFilter,useRowSelect, usePagination } from 'react-table';
import matchSorter from 'match-sorter';
import Table2 from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ImportUsers from "./ImportUsers";
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


  // Render the UI for your table
  return (

    <div>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={state.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    <div style={{background:"#fff"}}>
    <Table2 bordered hover size="sm"  cellspacing="0" {...getTableProps()}>
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

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { darwin_uid, darwin_myTk } = isAuthenticates();
  const [loading, setLoading] = useState(true)

  const loadUsers = userId => {
      getUsers(darwin_uid, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setUsers(data);
              setLoading(false)
          }
      });
  };

  const destroy = userId => {
      setLoading(true)
      deleteUser(userId, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setLoading(false)
              loadUsers();
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
          Header: 'Name',
          accessor: 'name',
          id: 'name',
        },
    {
      Header: 'Email',
      accessor: 'email',
      id: 'email',
      sortType: 'basic',
    },
    {
      Header: '特別',
      accessor: (text) =>
      <div>
      {text.specialPlan === true ? <span class="badge bg-green"> O </span> : <span class="badge bg-red"> X </span>}
      </div>,
      id: "sp",
      Filter: "",
    },
    {
      Header: 'Role',
      accessor: (text) =>
      <div>
      {text.role === 0 ? <span class="badge bg-green"> User </span> : text.role === 1 ? <span class="badge bg-blue"> Admin </span> : <span class="badge bg-red">  Unregistered </span> }
      </div>,
      id: "role",
      Filter: "",
    },
    
    {
      Header: 'Phase',
      accessor: (text) =>
      <div>
      {text.round === "Phase I" ? 
      <span class="badge bg-green"> Phase I </span> : 
      text.round === "Phase II" ? 
      <span class="badge bg-blue"> Phase II </span> : 
      text.round === "Phase III" ? 
      <span class="badge bg-red">  Phase III </span> :
      <span class="badge bg-red">  Phase IV </span> }
      </div>,
      Filter: "",
    },

    {
      Header: 'おすすめ',
      Filter: "",
      accessor: (text, i) =>
      <div> {text.rec_students.length}</div>
    },

    {
      Header: 'Fav',
      Filter: "",
      accessor: (text, i) =>
      <div> {text.favorites.length}</div>
    },

    {
      Header: '面接数',
      Filter: "",
      accessor: (text, i) =>
      <div> {text.interviews.filter(x => x.status == "選考").length}</div>
    },
    {
      Header: '担当',
      accessor: 'salesRep[0].name',
      Filter: SelectColumnFilter,
      id: "tantou",

    },
    {
      Header: 'Created At',
      accessor: (text) =>
      <div>
      { moment(text.createdAt).format('MM-DD-YY')}
      </div>,
      id: 'created_at',
      Filter: "",
    },
    {
      Header: 'Last Login',
      accessor: (text) =>
      <div>
      { moment(text.last_login_date).format('MM-DD-YY')}
      </div>,
      id: 'login_at',
      Filter: "",
    },
  
    {
      Header: 'Login Count',
      accessor: 'login_count',
      Filter: "",
    },
    {
      Header: "Actions",
      Filter: "",
      accessor: (text, i) =>
      <DropdownButton id="btn-sm dropdown-primary-button" title="Actions" size="sm" variant="secondary">
        <Dropdown.Item to={`/admin/profile/${text._id}`}>View </Dropdown.Item>
        <Dropdown.Item >  <a onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(text._id) } } >
                Delete
            </a></Dropdown.Item>
      </DropdownButton>
      ,
      filterable : true
    },
],

  []
);

 const data = users


  useEffect(() => {
      loadUsers();
  }, []);

    return (
    <SiteWrapper>
       <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>
      <div class="card-header"><h3 class="card-title"> Users </h3>
      <div class="card-options">
      <ImportUsers/>
      <Link to="/forgotpassword">
       <a className="btn btn-sm btn-secondary">Forgot password</a>
      </Link>
     <Link to={`/admin/create/user`} className="btn btn-sm btn-secondary"> + Add Users </Link> <br/>
     </div>
     </div>
      <Table columns={columns} data={data} />
       </Container>
    </SiteWrapper>
    );
};

export default ManageUsers;
