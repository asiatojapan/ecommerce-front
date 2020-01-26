import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from "../auth";
import { List } from 'antd';
import { getInterviews } from "./apiAdmin";
import { Link } from "react-router-dom";
import { useTable, useSortBy, useFilters, useGlobalFilter,useRowSelect, usePagination } from 'react-table'
import matchSorter from 'match-sorter'

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

  <div className="mv2">
  <div class="flex">
  <div class="w-10">
    <div class="pa0 pa2 mb2 db w-100">Search:</div>
  </div>
  <div class="w-90 v-mid">
  <input
    value={globalFilter || ''}
    onChange={e => {
      setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
    }}
    placeholder={`検索`}
    className="ba b--black-20 pa2 mb2 db w-100"
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

export const Table = function ({ columns, data }) {

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
    state: { pageIndex, pageSize, selectedRowIds },
    } = useTable({
    columns,
    data,
    defaultColumn,
    filterTypes,
    },
   useFilters, useGlobalFilter, useSortBy, usePagination,useRowSelect
  )

  return (
    <div>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={state.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    <table class="f6 w-100 mw center ba b--light-gray" cellspacing="0" {...getTableProps()}>
      <thead class="bg-black">
        {headerGroups.map(headerGroup => (
          <tr className="stripe-dark" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th class="fw6 tl pa3 bg-white" {...column.getHeaderProps()}>
              {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
        <tr>
        </tr>
      </thead>
      <tbody class="lh-copy" {...getTableBodyProps()}>
        {page.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr className="stripe-dark" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td class="pa3" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
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
          accessor: (text, i) =>
                <div>{text.students.map((student,i)=> <div>{student.studentid}</div>)}</div>
        },
        {
              Header: 'User',
              accessor: (text, i) =>
                    <div>{text.users.map((user,i)=> <div>{user.name}</div>)}</div>
            },
    {
      Header: 'Phase',
      accessor: "phase"
    },
    {
      Header: '時間',
      accessor: "time"
    },
    {
      Header: '結果',
      accessor: "result"
    },
    {
      Header: "Actions",
      accessor: (text, i) =>
      <div>
      <Link to={`/admin/profile/${text._id}`}> View </Link> |
      <Link to={`/admin/user/update/${text._id}`}> Update </Link>

      </div>,
      filterable : true
    }
],

  []
);

 const data = interviews


  useEffect(() => {
      loadInterviews();
  }, []);

    return (
      <AdminMenu>
      <div>
        <div class="cf ph3 ph4-ns pv4 mb3 bb b--black-10 black-70">
              <div class="tl pa2 fl">
                      <div class="f3 f2-ns lh-solid">Interviews</div>
                    </div>
          </div>
      </div>
      <div class="ph4-ns">
      <Table columns={columns} data={data} />
      </div>
      </AdminMenu>
    );
};

export default ManageInterviews;
