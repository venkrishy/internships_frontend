import React, { useState, useEffect } from 'react'
import { Grid, Paper, Table, styled, TableRow, TableCell, TableHead, TableBody, TableContainer, TablePagination, tableCellClasses, Typography, Box, Toolbar, IconButton, Menu, Container, Avatar, Tooltip, MenuItem, InputBase, alpha, TableSortLabel } from '@mui/material'
import InternshipType from "./InternshipType";
import fetchData from './FetchData';

interface DataTableProps {
    givenPageSize?: number;
    givenPage?: number;
    onPageChange?: (newPage: number) => void;
    onPageSizeChange?: (newPageSize: number) => void;
    filters: string[];
    additionalFilters: string[];
  }

const DataTable = ({ givenPageSize = 10, givenPage = 0, onPageChange, onPageSizeChange, filters, additionalFilters }: DataTableProps) => {
    const [data, setData] = useState<InternshipType[]>([]);
    useEffect(() => {
        const combinedFilters = filters.concat(additionalFilters);
        console.log("DataTableTS combinedFilters. value= ", combinedFilters);
        fetchData(combinedFilters ?? [], setData);
    }, [filters, additionalFilters])


    const columns = [
        { id: 'name', label: 'Name', width: '20%', minWidth: 170 },
        { id: 'location', label: 'Location', width: '30%', minWidth: 170 },
        { id: 'notes', label: 'Notes', width: '50%', minWidth: 170 },
    ]
    const [page, setPage] = useState(givenPage)
    const [pageSize, setPageSize] = useState(givenPageSize)

    const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.green,
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 10,
        },
    }))
    const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }))

    return (

                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column: any) => (
                                    <StyledTableCell width={column.width} key={column.id} align={column.align}>
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody  >
                            {data?.map((row: any) => {
                                return (
                                    <StyledTableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {columns.map((column: any) => {
                                            const value = row[column.id]
                                            const value2 = column.format && typeof value === 'number' ? column.format(value) : value
                                            return (
                                                <StyledTableCell width={column.width} key={column.id} align={column.align}>
                                                    <div dangerouslySetInnerHTML={{ __html: value2 }} />
                                                </StyledTableCell>
                                            )
                                        })}
                                    </StyledTableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table>
                    
                </TableContainer>
    )
}
export { DataTable as default }
