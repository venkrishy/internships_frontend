import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { MyAppBar } from './MyAppBar';
import { MyToggleButtonGroup } from './MyToggleButtonGroup';
import DataTableTS  from './DataTableTS';


const Internhive = () => {
    const [filters, setFilters] = useState<string[]>([]);
    console.log("Internhive Rendering");
    return (
        <>
            <MyAppBar />
            <Grid container spacing={1} style={{ marginLeft: ".5em", marginTop: ".5em", marginBottom: ".5em" }} columns={{ xs: 1, sm: 3 }}>
                <Grid item>
                    <MyToggleButtonGroup filters={filters} setFilters={setFilters} />
                </Grid>
            </Grid>
            <Grid>
                <DataTableTS givenPageSize={100} filters={filters} />
            </Grid>
        </>
    )
}
export { Internhive as default }
