import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { MyAppBar } from './MyAppBar';
import { MyToggleButtonGroup } from './MyToggleButtonGroup';
import DataTable  from './DataTable';


const InternHive = () => {
    const [filters, setFilters] = useState<string[]>([]);
    console.log("Internhive Rendering");
    const handleFilterChange = (
        _event: React.MouseEvent<HTMLElement>,
        updatedFilters: string[],
    ) => {
        setFilters(updatedFilters);
        console.log("MyToggleButtonGroup updatedFilters=", updatedFilters);
    };
    return (
        <>
            <MyAppBar />
            <Grid container spacing={1} style={{ marginLeft: ".5em", marginTop: ".5em", marginBottom: ".5em" }} columns={{ xs: 1, sm: 3 }}>
                <Grid item>
                    <MyToggleButtonGroup filters={filters} setFilters={setFilters} onChange={handleFilterChange} />
                </Grid>
            </Grid>
            <Grid>
                <DataTable givenPageSize={100} filters={filters} />
            </Grid>
        </>
    )
}
export { InternHive as default }
