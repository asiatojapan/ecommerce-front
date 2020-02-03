import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from "../auth";
import { getStudents } from '../core/apiCore';
import { deleteStudent, getCheckStudents } from "./apiAdmin";
import { Link } from "react-router-dom";
import { useTable, useSortBy, useFilters, useGlobalFilter,useRowSelect, usePagination, useMountedLayoutEffect } from 'react-table'
import matchSorter from 'match-sorter'
import SiteWrapper from '../templates/SiteWrapper'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import ImportStudents from "./ImportStudents";
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
    <div class="card-body border-bottom py-3">
                      <div class="mb-0">
                        <div class="mx-2 ">
                        <input
                          value={globalFilter || ''}
                          onChange={e => {
                            setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                          }}
                          placeholder={`検索`}
                          className="form-control"
                          />
                      </div>
                    </div>
                  </div>
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
      placeholder={`Search ${count} records...`}
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
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    state,
    flatColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, selectedRowPaths  },
    } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: {
        selectedRowPaths: selectedRows
      },
    filterTypes,
    },
   useFilters, useGlobalFilter, useSortBy, usePagination,useRowSelect,
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
    <div class="table-responsive">
    <table class="table card-table table-striped table-vcenter"  cellspacing="0" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')}
              <span>
              {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
              </span>
              </th>
            ))}
          </tr>
        ))}
        <tr>
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
    </div>

    <div class="flex items-center justify-center">
    <ul class="pagination modal-1">
      <li><a onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</a></li>
      <li><a onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</a></li>
      <li><a onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</a></li>
      <li><a onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</a></li>
    </ul>
    <div class="mv2">
    <span>
       Go to page:{' '}
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          gotoPage(page)
        }}
        style={{ width: '100px' }}
      />
    </span>{' '}
    <select
      value={pageSize}
      onChange={e => {
        setPageSize(Number(e.target.value))
      }}
    >
      {[10, 20, 30, 40, 50].map(pageSize => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
      </div>
    </div>
    </div>
  )
}

const ManageStudent = () => {
  const [students, setStudents] = useState([]);

  const { user, token } = isAuthenticated();
  const loadStudents = () => {
      getStudents().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStudents(data);
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
          Header: 'StudentID',
          accessor: 'studentid',
          id: 'sid',
          sortType: 'basic'
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
    },
    {
      Header: 'おすすめ',
      accessor: (text, i) =>
      <div> {text.rec_users.length == null? "" : text.rec_users.length}
    </div>
    },

    {
      Header: 'Faved',
      accessor: (text, i) =>
      <div> {text.favorites.length == null? "" : text.favorites.length}
    </div>
    },


    {
      Header: '面接',
      accessor: (text, i) =>
      <div> {text.interviews.length == null? "" : text.interviews.length}
    </div>
    },


    {
      Header: 'フェーズ',
      accessor: "status"
    },

    {
      Header: "Actions",
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

  const clickYes = e => {
      getCheckStudents(selectedRows.map(
                          d => d.original._id), "来日");
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
    <Page.Content>
    <Grid.Row>
    <Grid.Col width={12}>
       <Card>
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
        <button className="btn btn-primary" onClick={() => { if (window.confirm('Are you sure you wish add this phase?')) clickYes() } } >来日</button>
        <button className="btn btn-primary" onClick={() => { if (window.confirm('Are you sure you wish add this phase?')) clickFailed() } } >NG</button>
        </div>
        </Modal.Body>
      </Modal>
       <Link to={`/admin/create/student`} className="btn btn-sm btn-secondary"> + Add Students </Link> <br/>

       <ImportStudents/>
        </div>
        </div>
         <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
       </Card>
   </Grid.Col>
    </Grid.Row>
  </Page.Content>
      </SiteWrapper>
    );
};

export default ManageStudent;
