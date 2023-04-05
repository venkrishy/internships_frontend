import React, { useState, useEffect } from 'react'
import { Button, TextField, AppBar, Grid, Paper, Table, styled, TableRow, TableCell, TableHead, TableBody, TableContainer, TablePagination, tableCellClasses, Typography, Box, Toolbar, IconButton, Menu, Container, Avatar, Tooltip, MenuItem, InputBase, alpha, TableSortLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import useConfig from "./useConfig";
import MOCK_DATA from './MOCK_DATA.json';
import HiveIcon from '@mui/icons-material/Hive';
import makeStyles from '@mui/styles/makeStyles';
import logo from "/public/logo.png";
import { createInternHive, updateInternHive, deleteInternHive } from '../graphql/mutations'
import { listInternHives } from '../graphql/queries'
import { Amplify, API, graphqlOperation} from "aws-amplify";
import InternshipType from './InternshipType';

const DataTableTSCopy = ({ givenPageSize = 10, givenPage = 0, onPageChange, onPageSizeChange, onRowClick }: any) => {

    
    
    const config = useConfig();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    interface IColumn {
        align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
        id: "name_html" | "location_html" | "notes_html";
        label: string;
        minWidth: number;
    }
    const columns  : IColumn[] = [
        { id: 'name_html', label: 'Name', minWidth: 170 },
        { id: 'location_html', label: 'Location', minWidth: 170 },
        { id: 'notes_html', label: 'Notes', minWidth: 170 },
    ]
    const [rows, setRows] = useState<InternshipType[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string>(columns[0].id);

    const handleSort = (field :string) => {
        let sorted: InternshipType[] = [];
           
        if (sortColumn === field) {
          if (sortOrder === 'asc') {
            sorted = [...rows].sort((a, b) => a[field] > b[field] ? -1 : 1);
            setSortOrder('desc');
          } else {
            sorted = [...rows].sort((a, b) => a[field] < b[field] ? -1 : 1);
            setSortOrder('asc');
          }
        } else {
          sorted = [...rows].sort((a, b) => a[field] > b[field] ? 1 : -1);
          setSortOrder('asc');
          setSortColumn(field);
        }
    
        setRows(sorted);
      };

    useEffect(() => {
        if (config.app.LOAD_MOCK_JSON) {
            console.log("Loading Mock Data from MOCK_DATA.JSON file");
            setRows(MOCK_DATA.reverse());
        }
        else {
            let internships_endpoint: string = config.app.INTERNSHIPS_ENDPOINT;
            if (config.app.LOAD_FROM_LOCALHOST) {
                internships_endpoint = config.app.INTERNSHIPS_LOCALHOST_ENDPOINT;
                console.log("Loading from localhost");
            } else {
                console.log("Loading from dev server");
            }
            console.log("internships_endpoint", internships_endpoint);
            fetch(encodeURI(internships_endpoint)).then(resp => {
                return resp.json();
            }).then(data => {
                setRows(data.reverse());
            }).catch(error => {
                console.log(error);
            });
        }
    }, [])

    const [selected, setSelected] = useState([0])
    const [page, setPage] = useState(givenPage)
    const [pageSize, setPageSize] = useState(givenPageSize)
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
    const settings = ["Profile", "Account", "Dashboard", "Logout"];

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const useStyles = makeStyles((theme) => ({
        iconButton: {
          color: 'yellow',
        },
      }));
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar disableGutters>
                        <img src={logo} alt="logo"/>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                //display: { xs: 'flex', md: 'none' },
                                //flexGrow: 0,
                                fontFamily: 'Raleway',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                align: 'center',
                                flex: 1,

                            }}
                        >
                            InternHive
                        </Typography>

                        <Box>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid container spacing={1} style={{ marginLeft: ".5em", marginTop: ".5em", marginBottom: ".5em" }} columns={{ xs: 1, sm: 3 }}>
                <Grid item p="1">
                    <TextField
                        placeholder="Name"
                        type="search"
                        variant="outlined"
                        fullWidth
                        size="small"
                    //onChange={handleSearchFieldOnChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        placeholder="Location"
                        type="search"
                        variant="outlined"
                        fullWidth
                        size="small"
                    //onChange={handleSearchFieldOnChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        placeholder="Notes"
                        type="search"
                        variant="outlined"
                        fullWidth
                        size="small"
                    //onChange={handleSearchFieldOnChange}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" startIcon={<SearchIcon />} />
                </Grid>
            </Grid>
            <Grid>
                <TableContainer component={Paper}>
                    <Table  aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell key={column.id} align={column.align}>
                                       <TableSortLabel 
                                       active={sortColumn === column.id} 
                                       direction={sortColumn === column.id ? sortOrder : 'asc'} 
                                       onClick={() => handleSort(column)}
                                       >
                                        {column.label} direction={sortColumn === column.id} 
                                        </TableSortLabel>
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
export { DataTableTSCopy as default }
