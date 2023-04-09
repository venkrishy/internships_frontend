import React, { useState } from 'react';
import { MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { alpha } from "@mui/material/styles";

interface MultiSelectCheckboxProps {
  options: string[];
}

export const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({ options }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth sx={{
      m: 0,
      backgroundColor: alpha("#fff", 0.15),
      "&:hover": {
        backgroundColor: alpha("#fff", 0.25),
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
