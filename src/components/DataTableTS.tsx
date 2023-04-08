import React, { useState, useEffect } from 'react'
import { Grid, Paper, Table, styled, TableRow, TableCell, TableHead, TableBody, TableContainer, TablePagination, tableCellClasses, Typography, Box, Toolbar, IconButton, Menu, Container, Avatar, Tooltip, MenuItem, InputBase, alpha, TableSortLabel } from '@mui/material'
import useConfig from "./useConfig";
import InternshipType from "./InternshipType";
import { MyToggleButtonGroup } from "./MyToggleButtonGroup";
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { ListInternHivesQuery, ModelInternHiveFilterInput } from "../API";
import { MyAppBar } from './MyAppBar';
import { forEach } from 'core-js/core/array';


const DataTableTS = ({ givenPageSize = 25, givenPage = 0, onPageChange, onPageSizeChange, onRowClick }: any) => {

    const config = useConfig();
    const [rows, setRows] = useState<InternshipType[]>([]);
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

    useEffect(() => {
        fetchData([]);
    }, [])

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage)
        onPageChange && onPageChange(newPage)
    }
    const handleChangeRowsPerPage = (event: any) => {
        setPageSize(parseInt(event.target.value, 10))
        setPage(0)
        onPageSizeChange && onPageSizeChange(parseInt(event.target.value, 10))
    }
    
    const searchValuesMap = new Map<string, string[]>([
        ['Front End', ['Front', 'front', 'Frontend', 'frontend', 'Front End', 'front end']],
        ['Back End', ['Back End', 'BackEnd', 'Bankend', 'Back', 'back']],
        ['No Sponsorship', ['No Sponsorship', 'Sponsorship required']],
    ]);

    function getFinalSearchValues(searchStrings: string[], searchValuesMap: Map<string, string[]>): string[] {
        const finalSearchValues: string[] = [];

        for (const searchString of searchStrings) {
            for (const [searchKey, searchValues] of searchValuesMap) {
                if (searchString.includes(searchKey)) {
                    finalSearchValues.push(...searchValues);
                }
            }
        }

        return finalSearchValues;
    }

    async function fetchData(searchStrings: string[]) {
        const finalSearchValues = getFinalSearchValues(searchStrings, searchValuesMap);

        const filter = {
            or: finalSearchValues.map((value) => ({ notes: { contains: value } })),
        };

        const { data } = await API.graphql<GraphQLQuery<ListInternHivesQuery>>({
            query: queries.listInternHives,
            variables: { filter },
        });

        const result3 = (data?.listInternHives?.items ?? []).map((item) => ({
            name: item?.name ?? '',
            location: item?.location ?? '',
            notes: item?.notes ?? '',
        }));

        setRows(result3);
    }

    const toggleButtonClickCallback = (filters: string[]) => {
        console.log(`Inside DataTableTS callback: ${filters}`)
        fetchData(filters);
    }

    return (
        <>
            <MyAppBar />
            <Grid container spacing={1} style={{ marginLeft: ".5em", marginTop: ".5em", marginBottom: ".5em" }} columns={{ xs: 1, sm: 3 }}>
                <Grid item>
                    <MyToggleButtonGroup onClick={toggleButtonClickCallback} />
                </Grid>
            </Grid>
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
                            {rows.slice(page * pageSize, page * pageSize + pageSize).map((row: any) => {
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={pageSize}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
        </>
    )
}
export { DataTableTS as default }
