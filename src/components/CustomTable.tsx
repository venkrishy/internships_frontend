import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

interface RowData {
  id: number;
  [key: string]: any;
}

interface Column {
  id: string;
  label: string;
  minWidth: number;
}

interface CustomTableProps {
  data: RowData[];
  columns: Column[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data, columns }) => {
    const [sortedData, setSortedData] = useState<RowData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string>(columns[0].id);
  
    useEffect(() => {
      setSortedData(data);
    }, [data]);
  
    const handleSort = (field: string) => {
      let sorted: RowData[] = [];
  
      if (sortColumn === field) {
        if (sortOrder === 'asc') {
          sorted = [...sortedData].sort((a, b) => a[field] > b[field] ? -1 : 1);
          setSortOrder('desc');
        } else {
          sorted = [...sortedData].sort((a, b) => a[field] < b[field] ? -1 : 1);
          setSortOrder('asc');
        }
      } else {
        sorted = [...sortedData].sort((a, b) => a[field] > b[field] ? 1 : -1);
        setSortOrder('asc');
        setSortColumn(field);
      }
  
      setSortedData(sorted);
    };
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={sortColumn === col.id}
                    direction={sortColumn === col.id ? sortOrder : 'asc'}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={`${item.id}-${col.id}`}>{item[col.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default CustomTable;