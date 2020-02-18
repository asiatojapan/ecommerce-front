import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../auth";
import { List } from 'antd';
import { getInterviews, deleteInterview, deleteInterviewItem } from "./apiAdmin";
import { Link } from "react-router-dom";
import SiteWrapper from '../templates/SiteWrapper'
import { useTable, useSortBy, useFilters, useGlobalFilter,useRowSelect, usePagination } from 'react-table'
import matchSorter from 'match-sorter'
import DropdownButton from 'react-bootstrap/DropdownButton';
import UpdateInterview from "./UpdateInterview";
import UpdateInterviewItem from "./UpdateInterviewItem";
import Table2 from 'react-bootstrap/Table';

import AddInterviewItem from "./AddInterviewItem";
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
import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid rgba(0, 40, 100, 0.12);

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid rgba(0, 40, 100, 0.12);
      border-right: 1px solid rgba(0, 40, 100, 0.12);

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

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
    <span>
    <input
    value={globalFilter || ''}
    onChange={e => {
      setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
    }}
    placeholder={`検索`}
    className="form-control" 
    style={{marginBottom: "1rem"}}
    />
    </span>
  )
}


function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <div>
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      style={{width: "100%"}}
      placeholder={`Search ${count}`}
    />
    </div>
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

const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}


export const Table = function ({ columns, data, selectedRows, updateMyData, onSelectedRowsChange }) {


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
    state,
    rows,
    preGlobalFilteredRows,
    setGlobalFilter,
    } = useTable({
      columns,
      data,
      defaultColumn,
      updateMyData,
    filterTypes,
    },
   useFilters, useGlobalFilter, useSortBy,useRowSelect,
)

return (
  <div>
  <GlobalFilter
    preGlobalFilteredRows={preGlobalFilteredRows}
    globalFilter={state.globalFilter}
    setGlobalFilter={setGlobalFilter}
  />
  <div style={{background:"#fff"}}>
  <table {...getTableProps()}>
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
  </table>
  </div>

 
  </div>
)
}


const ManageInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const { user, token } = isAuthenticated();

  const loadInterviews = () => {
      getInterviews().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setInterviews(data);
          }
      });
  };

  const destroy = interviewId => {
      deleteInterview(interviewId, user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              loadInterviews();
          }
      });
  };


  const destroyItem = (interviewId, itemId) => {
    deleteInterviewItem(interviewId, user._id, token, itemId).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            loadInterviews();
        }
    });
};

const updateMyData = (rowIndex, columnId, value) => {
  setInterviews(old =>
    old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        }
      }
      return row
    })
  )
}


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
    Header: 'Student',
    Filter: SelectColumnFilter,
    accessor: (text, i) =>
    <div>{text.students.map((student,i)=> <div>{student.studentid}</div>)}</div>
    },
    {
    Header: 'Company',
    Filter: SelectColumnFilter,
    accessor: (text, i) =>
    <div>{text.companies.map((user,i)=> <div>{user.name}</div>)}</div>
    },
    {
    Header: 'InterviewType',
    accessor: "interviewType",
    Filter: SelectColumnFilter,
    },
    {
    Header: 'Company Skype',
    accessor: "companyStatus",
    Filter: SelectColumnFilter,
    },
    {
    Header: 'Student Skype',
    accessor: "studentStatus",
    Filter: SelectColumnFilter,
    },
    { 
      Header: 'Interview',
      Filter: "",
      accessor: (text, i) =>
      <div>{text.interviewItems.length == null ? "" : 
        <div>{text.interviewItems.map((item, i) => 
        <div>{item.time_period}/{item.time}/{item.category}/ {item.result} 
        <UpdateInterviewItem interviewItemId={item._id} interviewId={text._id} />
        <button className="btn btn-outline-danger btn-sm" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroyItem(text._id, item._id) } } >
                削除
            </button>
            </div>)} 
        </div>}
      </div>
    },
    {
      Header: 'Status',
      accessor: "status",
      Filter: SelectColumnFilter,
      },
    {
      Header: "Actions",
      Filter: "",
      accessor: (text, i) =>
      <div>
      <DropdownButton id="btn-sm dropdown-primary-button" title="Actions" size="sm" variant="secondary">
        <Dropdown.Item> <AddInterviewItem interviewId={text._id} /></Dropdown.Item>
        <Dropdown.Item> <UpdateInterview interviewId={text._id} />
       </Dropdown.Item>
        <Dropdown.Item >  <a onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(text._id) } } >
                Delete
            </a></Dropdown.Item>
      </DropdownButton></div>
      ,
      filterable : true
    },

],

  []
);
  
 const data = interviews

 const [originalData] = React.useState(data)
  useEffect(() => {
      loadInterviews();
  }, []);

    return (
      <SiteWrapper>
        <Container>
      <div class="card-header"><h3 class="card-title"> Interviews </h3>
      <div class="card-options">
     <Link to={`/admin/create/interview`} className="btn btn-sm btn-secondary"> + Add Interview </Link> <br/>
     </div>
     </div>
     <Styles>
     <Table columns={columns} data={data} updateMyData={updateMyData} />
     
    </Styles>
      </Container>
    </SiteWrapper>
    );
};

export default ManageInterviews;
