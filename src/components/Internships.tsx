import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, Column, useFilters, useGlobalFilter, useSortBy } from 'react-table';
import { ColumnFilter } from './ColumnFilter';
import { GlobalFilter } from './GlobalFilter';
import useConfig from './useConfig';
import MOCK_DATA from './MOCK_DATA2.json';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';

interface href_type {
    anchor_text: string,
    link_target: string
}
interface UserData { name: string, name_html: string, location: string, location_html: string, closed: boolean, notes: string, notes_html: string, notes_hrefs: href_type[] };

function InternshipsComponent() {
    const config = useConfig();
  const [data, setData] = useState<UserData[]>([]);

    useEffect(() => {
    const fetchData = async () => {
        if (config.app.LOAD_MOCK_JSON) {
            console.log("Loading Mock Data from MOCK_DATA.JSON file");
            setData(MOCK_DATA.reverse())
        } 
        else {
            let internships_endpoint: string = config.app.INTERNSHIPS_ENDPOINT;
            if (config.app.LOAD_FROM_LOCALHOST) {
                internships_endpoint = config.app.INTERNSHIPS_LOCALHOST_ENDPOINT;
                console.log("Loading from localhost");
            } else {
                console.log("Loading from dev server");
            }
            console.log("internships_endpoint", internships_endpoint);
            const result = await axios.get<UserData[]>(internships_endpoint);
            setData(result.data);
        }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as const,
      },
      {
        Header: 'Location',
        accessor: 'location' as const,
      },
      {
        Header: 'Notes',
        accessor: 'notes' as const,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const defaultColumn = useMemo(() =>{
    return {
        Filter: ColumnFilter
    }
    },[])

    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
    } = useTable({
    columns,
    data,
    defaultColumn
    }, useFilters, useGlobalFilter, useSortBy)

  const { globalFilter } = state

  return (
    <>
    <GlobalFilter filter = {globalFilter} setFilter={setGlobalFilter} />
    <BTable striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, headCellIndex) => (
              <th className="text-center" {...column.getHeaderProps(column.getSortByToggleProps())} key={headCellIndex}>
              {column.render('Header')}
              <span>
                  {column.isSorted ? (column.isSortedDesc ? ' ⬇️' : '⬆️') : ''}
              </span> 
              <div>{column.canFilter ? column.render('Filter') : null}</div>
          </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
    return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}> {cell.render('Cell')}  </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </BTable>
    </>
  );
}

export {InternshipsComponent as default}