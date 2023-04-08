import React, { useState, useEffect } from 'react'
import { Grid, Paper, Table, styled, TableRow, TableCell, TableHead, TableBody, TableContainer, TablePagination, tableCellClasses, Typography, Box, Toolbar, IconButton, Menu, Container, Avatar, Tooltip, MenuItem, InputBase, alpha, TableSortLabel } from '@mui/material'
import InternshipType from "./InternshipType";
import fetchData from './FetchData';

interface DataTableProps {
    givenPageSize?: number;
    givenPage?: number;
    onPageChange?: (newPage: number) => void;
    onPageSizeChange?: (newPageSize: number) => void;
    filters?: string[]
  }

const DataTable = ({ givenPageSize = 10, givenPage = 0, onPageChange, onPageSizeChange, filters }: DataTableProps) => {
    const [data, setData] = useState<InternshipType[]>([]);
    useEffect(() => {
        console.log("DataTableTS has noticed change in filters. value= ", filters);
        fetchData(filters ?? [], setData);
    }, [filters])


    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'location', label: 'Location', minWidth: 170 },
        { id: 'notes', label: 'Notes', minWidth: 170 },
    ]
    const [page, setPage] = useState(givenPage)
    const [pageSize, setPageSize] = useState(givenPageSize)

    const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.green,
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }))
    const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }))

    return (
            <Grid>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column: any) => (
                                    <StyledTableCell key={column.id} align={column.align}>
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody  >
                            {data?.map((row: any) => {
                                return (
                                    <StyledTableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {columns.map((column: any) => {
                                            const value = row[column.id]
                                            const value2 = column.format && typeof value === 'number' ? column.format(value) : value
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
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
            </Grid>
    )
}
export { DataTable as default }
