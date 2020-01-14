import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from "../auth";
import { List } from 'antd';
import { deleteUser, getUsers } from "./apiAdmin";
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

  <div className="mb4">
  <form class="bg-near-white center pa4 br2-ns">
  <fieldset class="cf bn ma0">
  <legend class="pa0 f5 f4-ns mb3 black-80">Search Users</legend>
    <div class="cf">
    <input
      value={globalFilter || ''}
      onChange={e => {
        setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`検索`}
      className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-100-m w-100-l br2-ns br--left-ns"
      />
      </div>
  </fieldset>
</form>
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

function Table({ columns, data }) {

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
   useFilters, useGlobalFilter, useSortBy, usePagination,useRowSelect,
   hooks => {
        hooks.flatColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ])
      })

  // Render the UI for your table
  return (
    <div>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={state.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    <table class="f6 w-100 mw center" cellspacing="0" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white" {...column.getHeaderProps()}>
              {column.render('Header')}
              <div></div>
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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td class=" pr3 bb b--black-20" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
    <div className="mt2 center pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
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
  )
}

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { user, token } = isAuthenticated();


  const [ likedstudents, setLikedstudents ] =  useState([]);


  const loadUsers = () => {
      getUsers().then(data => {
      setLikedstudents(data.liked_students);
          if (data.error) {
              console.log(data.error);
          } else {
              setUsers(data);
          }
      });
  };

  const destroy = userId => {
      deleteUser(user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              loadUsers();
          }
      });
  };

  const columns = [
    {
          Header: 'ID',
          accessor: (text, i) =>
                <div>{i+1}</div>
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
      Header: 'Role',
      accessor: (text) =>
      <div>
      {text.role === 1 ? "Admin" : "Registered User"}
      </div>,
      id: 'role',
      sortType: 'basic',
    },

    {
      Header: "Actions",
      accessor: (text, i) =>
      <div>
      <Link to={`/admin/profile/${text._id}`}> View </Link> |
      <Link to={`/admin/user/update/${text._id}`}> Update </Link>
      <a onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(text._id) } } className="f6 link dim br2 ph2 pv1 mb1 mt1 dib white bg-dark-red">
            Delete
        </a>
      </div>,
      filterable : true
    }
];

 const data = users


  useEffect(() => {
      loadUsers();
  }, []);

    return (
      <AdminMenu>
      <div class="cf">
        <div class="fl w-100 w-75-ns pa2">
        <legend class="fw7 f3">Users</legend>
        </div>
        <div class="fl w-100 w-25-ns pa2 tr">
          <Link to={`/admin/create/user`} className="f6 link dim br2 ph3 pv2 mb2 dib white bg-near-black">+ Add Users </Link>
        </div>
      </div>
      <Table columns={columns} data={data} />
      </AdminMenu>
    );
};

export default ManageUsers;
