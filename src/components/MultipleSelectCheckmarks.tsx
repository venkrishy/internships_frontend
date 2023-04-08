import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { alpha } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


interface Variant {
  id: number;
  name: string;
}

const variants: Variant[] = [
  {
    id: 1,
    name: 'Machine Learning',
  },
  {
    id: 2,
    name: 'Quant',
  },
  {
    id: 3,
    name: 'Sponsership',
  },
  {
    id: 4,
    name: '2023',
  },
  {
    id: 5,
    name: '2024',
  },
  {
    id: 6,
    name: 'Graduate',
  },
];

export const MultipleSelectCheckmarks = () => {
  const [variantName, setVariantName] = React.useState([

  ]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
    const preventDuplicate = (value as Variant[]).filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    setVariantName(
      // On autofill we get a the stringified value.
      typeof preventDuplicate === 'string'
        ? preventDuplicate.split(',')
        : preventDuplicate


    );
  };

  return (
    <FormControl sx={{
      m: 0, width: 200,
      backgroundColor: alpha("#fff", 0.15),
      "&:hover": {
        backgroundColor: alpha("#fff", 0.25),
      },

    }}>
      <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={variantName}
        onChange={handleChange}
        input={<OutlinedInput label="Filter" />}
        renderValue={(selected) => selected.map((x) => x.name).join(', ')}
        MenuProps={MenuProps} 
      >
        {variants.map((variant) => (
          <MenuItem key={variant.id} value={variant}>
            <Checkbox checked={variantName.indexOf(variant) > -1} />
            <ListItemText primary={variant.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
