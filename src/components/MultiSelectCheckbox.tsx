import React, { useState, useEffect } from 'react';
import { MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { alpha } from "@mui/material/styles";
import fetchData from './FetchData';

interface MultiSelectCheckboxProps {
  options: string[];
  onAdditionalChange: ( additionalFilters: string[]) => void
}

export const MultiSelectCheckbox = ({ options, onAdditionalChange } : MultiSelectCheckboxProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    const items = (typeof value === 'string' ? value.split(',') : value);
    setSelectedItems(items);
    console.log("MultiSelectCheckbox selectedItems=", items);
    onAdditionalChange(items);
  };


  return (
    <FormControl fullWidth variant="filled" sx={{
      m: 0,
      backgroundColor: alpha("#fff", 0.15),
      "&:hover": {
        backgroundColor: alpha("#fff", 0.25),
        minWidth: 300
      }

    }}>
      <InputLabel>More Filters</InputLabel>
      <Select
        multiple
        value={selectedItems}
        onChange={handleChange}
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedItems.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
