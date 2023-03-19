import React, { useMemo} from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS }  from './columns'
import './table.css'

const SortingTable = () => {
    const columns = useMemo(() => GROUPED_COLUMNS, []) 
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns: columns,
        data: data
    },
    useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = tableInstance

    
    return (
        <table {... getTableProps}>
            <thead>
                {headerGroups.map((headerGroup, headRowIndex) => (
                    <tr {...headerGroup.getHeaderGroupProps} key={headRowIndex} >
                        {headerGroup.headers.map((column, headCellIndex) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={headCellIndex}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' ⬇️' : '⬆️') : ''}
                                </span>    
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps}>
                {rows.map( (row, bodyRowIndex) => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()} key={bodyRowIndex}>
                            {
                               row.cells.map((cell, bodyCellIndex) => {
                                return <td {...cell.getCellProps()} key={bodyCellIndex}>{cell.render('Cell')}</td>
                               }) 
                            }
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                {footerGroups.map( (footerGroup, footerRowIndex) => (
                    <tr {...footerGroup.getFooterGroupProps()} key={footerRowIndex}>
                        {footerGroup.headers.map( (column, footerCellIndex )=> (
                                <td {...column.getFooterGroupProps} key={footerCellIndex}>
                                    {column.render('Footer')}
                                </td>
                            ))
                        }
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}
export {SortingTable as default}