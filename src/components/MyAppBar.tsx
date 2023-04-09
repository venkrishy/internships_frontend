import React from "react"
import {
    AppBar,
    Typography,
    Box,
    Toolbar,
    IconButton,
    Menu,
    Container,
    Avatar,
    Tooltip,
    MenuItem,
} from '@mui/material'
import logo from "/public/logo.png";
import { SearchBox } from "./SearchBox";
import { MultipleSelectCheckmarks } from "./MultipleSelectCheckmarks";



export const MyAppBar = () => {

    const settings = ["Profile", "Account", "Dashboard", "Logout"];
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <img src={logo} alt="logo" />
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
                        //width: '150px', 

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
        </AppBar>
    )

}