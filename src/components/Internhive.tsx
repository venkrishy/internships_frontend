import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { MyAppBar } from './MyAppBar';
import { MyToggleButtonGroup } from './MyToggleButtonGroup';
import DataTable from './DataTable';
import { MultiSelectCheckbox } from "./MultiSelectCheckbox";
import { alpha } from "@mui/material/styles";


const InternHive = () => {
    const [filters, setFilters] = useState<string[]>([]);
    const [additionalFilters, setAdditionalFilters] = useState<string[]>([]);
    console.log("Internhive Rendering");


    const handleFilterChange = (
        _event: React.MouseEvent<HTMLElement>,
        updatedFilters: string[],
    ) => {
        setFilters(updatedFilters);
        console.log("MyToggleButtonGroup updatedFilters=", updatedFilters);
    };

    const handleAdditionalFilterChange = (
        additionalFilters: string[],
    ) => {
        setAdditionalFilters(additionalFilters);
        console.log("InternHive additonalFilters=", additionalFilters);
    };


    return (
        <>
            <MyAppBar />
            <Grid container spacing={2} style={{ padding: "1em" }}>
                <Grid item xs={12} sm={6}>
                    <MyToggleButtonGroup filters={filters} onChange={handleFilterChange} />
                </Grid>
                <Grid item xs={12} sm={6} justifyContent="center" alignItems="center">
                    <MultiSelectCheckbox onAdditionalChange={handleAdditionalFilterChange} options={['Quant', 'Machine Learning', 'Graduate', '2023', '2024']} />
                </Grid>
            </Grid>
            <Grid container style={{ padding: "1em" }}>
                <Grid item xs={12}  >
                    <DataTable givenPageSize={100} filters={filters} additionalFilters={additionalFilters}/>
                </Grid>
            </Grid>

        </>
    )
}
export { InternHive as default }
