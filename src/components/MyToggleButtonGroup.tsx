import React from "react"
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const MyToggleButtonGroup = ({ onClick }) => {
    const [filters, setFilters] = useState<string[]>([]);

    const handleFilterChange = (
        _event: React.MouseEvent<HTMLElement>,
        updatedFilters: string[],
    ) => {
        setFilters(updatedFilters);
        onClick(updatedFilters);
    };

    const buttonStyle = {
        border: 'none',
        borderRadius: '20px',
        padding: '11px 22px',
        cursor: 'pointer',
        textTransform: "none",
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "gray",
            backgroundColor: "#f6f6f6",
            boxShadow: `inset 0 0 5px #0e2b2c`,
        }

    };

    return (
        <ToggleButtonGroup
            aria-label="filters"
            value={filters}
            onChange={handleFilterChange}
            size="small"
        >
            <ToggleButton
                value="Front End"
                sx={buttonStyle}
            >
                Front End
            </ToggleButton>
            <ToggleButton
                value="Back End"
                sx={buttonStyle}
            >
                Back End
            </ToggleButton>
            <ToggleButton
                value="No Sponsorship"
                sx={buttonStyle}
            >
                No Sponsorship
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
