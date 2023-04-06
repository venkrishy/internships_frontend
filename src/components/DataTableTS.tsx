import React, { useState, useEffect } from 'react'
import { Button, TextField, AppBar, Grid, Paper, Table, styled, TableRow, TableCell, TableHead, TableBody, TableContainer, TablePagination, tableCellClasses, Typography, Box, Toolbar, IconButton, Menu, Container, Avatar, Tooltip, MenuItem, InputBase, alpha, TableSortLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import useConfig from "./useConfig";
import MOCK_DATA from './MOCK_DATA.json';
import InternshipType from "./InternshipType";
import HiveIcon from '@mui/icons-material/Hive';
import makeStyles from '@mui/styles/makeStyles';

import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { ListInternHivesQuery, ModelInternHiveFilterInput } from "../API";
import { MyAppBar } from './MyAppBar';


const DataTableTS = ({ givenPageSize = 25, givenPage = 0, onPageChange, onPageSizeChange, onRowClick }: any) => {

    const config = useConfig();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [rows, setRows] = useState<InternshipType[]>([]);
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'location', label: 'Location', minWidth: 170 },
        { id: 'notes', label: 'Notes', minWidth: 170 },
    ]
    const [selected, setSelected] = useState([0])
    const [page, setPage] = useState(givenPage)
    const [pageSize, setPageSize] = useState(givenPageSize)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

    const styles = {
        button: {
            borderRadius: '20px',
            bgcolor: 'transparent',
            color: '#606060',
            height: '100%',
            lineHeight: '80%',
            padding: '10px',
            '&:hover': {
                bgcolor: '#ccc'
            }
        }
    };

    async function fetchData() {
        try {
            let filter: ModelInternHiveFilterInput = { name: { contains: "Amazon" } };
            const allInternships = await API.graphql<GraphQLQuery<ListInternHivesQuery>>({ query: queries.listInternHives });

            console.log("allInternships", allInternships);


            const result2 = allInternships.data?.listInternHives?.items;
            const result3: InternshipType[] = !result2 ? [] : result2?.map((item) => {
                return {
                    name: item ? item?.name : "",
                    location: item ? item?.location : "",
                    notes: item ? item?.notes : "",
                }
            })
            setRows(result3);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleAllButtonClick = () => {
        fetchData();
    };
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage)
        onPageChange && onPageChange(newPage)
    }
    const handleChangeRowsPerPage = (event: any) => {
        setPageSize(parseInt(event.target.value, 10))
        setPage(0)
        onPageSizeChange && onPageSizeChange(parseInt(event.target.value, 10))
    }
    const isSelected = (id: number) => selected.indexOf(id) !== -1

    const handleClick = (event: any, id: number) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected: Array<number> = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }
        setSelected(newSelected)
    }

    const handleFilterButtonClick = async (searchString: string) => {
        let filter: ModelInternHiveFilterInput = { notes: { contains: searchString } };
        const filteredInternships = await API.graphql<GraphQLQuery<ListInternHivesQuery>>({
            query: queries.listInternHives,
            variables: { filter: filter },
        });

        const result2 = filteredInternships.data?.listInternHives?.items;
        const result3 = !result2 ? [] : result2?.map((item) => {
            return {
                name: item ? item?.name : '',
                location: item ? item?.location : '',
                notes: item ? item?.notes : '',
            };
        });
        setRows(result3);
    };
    const handleFilterClick = (filter: string) => {
        setSelectedFilters((prevFilters) => {
            if (prevFilters.includes(filter)) {
                return prevFilters.filter((f) => f !== filter);
            } else {
                return [...prevFilters, filter];
            }
        });
    };

    const isRowVisible = (row: any) => {
        if (selectedFilters.length === 0) {
            return true;
        }
        return selectedFilters.some((filter) => row.notes.includes(filter));
    };
    return (
        <>
            <MyAppBar />
            <Grid container spacing={1} style={{ marginLeft: ".5em", marginTop: ".5em", marginBottom: ".5em" }} columns={{ xs: 1, sm: 3 }}>
                <Grid item>
                    <Button variant={selectedFilters.includes('Front End') ? 'contained' : 'outlined'}
                        onClick={() => handleFilterButtonClick('Front End')} sx={styles.button} >Front End</Button>
                </Grid>
                <Grid item>
                    <Button variant={selectedFilters.includes('No Sponsership') ? 'contained' : 'outlined'}
                        onClick={() => handleFilterButtonClick('No sponsership')} sx={styles.button} >No Sponsership</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" sx={styles.button} onClick={() => handleAllButtonClick()}>All</Button>
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
                                const isItemSelected = isSelected(row.id)
                                const labelId = `enhanced-table-checkbox-${row.id}`
                                return (
                                    <StyledTableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
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
