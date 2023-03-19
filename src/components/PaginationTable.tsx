import React, { useMemo} from 'react'
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS }  from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'

const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, []) 
    const data = useMemo(() => MOCK_DATA, [])

    const defaultColumn = useMemo(() =>{
        return {
            Filter: ColumnFilter
        }
    },[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        defaultColumn,
        initialState: { pageIndex : 2}
    },  useFilters, useGlobalFilter, useSortBy, usePagination,)

    const { globalFilter } = state
    const { pageIndex, pageSize } = state

    
    return (
        <>
        <GlobalFilter filter = {globalFilter} setFilter={setGlobalFilter} />
        <table {... getTableProps}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps}>
                        {headerGroup.headers.map((column,headCellIndex) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={headCellIndex}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' ⬇️' : '⬆️') : ''}
                                </span> 
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps}>
                {page.map(row => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {
                               row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                               }) 
                            }
                        </tr>
                    )
                })}
            </tbody>
             
        </table>
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <span>
                | Go to Page: {' '}
                <input type='number' defaultValue={pageIndex + 1 }
                onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(pageNumber)
                }}
                style = {{width: '50px'}}
                />
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                    [10,25,50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>
                    ))
                }
            </select>
            
            <button onClick={() => gotoPage(0)} disabled = {!canPreviousPage}>{'<<'}</button>
            <button onClick= {() => previousPage()} disabled = {!canPreviousPage}>Previous</button>
            <button onClick = {() => nextPage()} disabled = {!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled = {!canNextPage}>{'>>'}</button>
        </div>
        </>
    )
}
export {PaginationTable as default}