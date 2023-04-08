import React from "react"
import {
    IconButton, InputBase, Box
} from '@mui/material'
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBox = () => {
    return (
        <Box 
            sx={{
                position: "relative",
                borderRadius: "4px",
                backgroundColor: alpha("#fff", 0.15),
                "&:hover": {
                    backgroundColor: alpha("#fff", 0.25),
                },
                marginRight: 2,
                marginLeft: 0,
                width: "20%",
            }}
        >
            <IconButton
                sx={{
                    position: "absolute",
                    marginLeft: 1,
                    p: "4px",
                    zIndex: 1,
                    color: "inherit",
                }}
            >
                <SearchIcon />
            </IconButton>
            <InputBase
                placeholder="Search…"
                sx={{
                    color: "inherit",
                    paddingLeft: `calc(1em + ${2 * 8}px)`, // Increase padding to avoid overlap
                    "&:focus": {
                        backgroundColor: alpha("#fff", 0.25),
                    },
                }}
                inputProps={{ "aria-label": "search" }}
            />
        </Box>
    )
}