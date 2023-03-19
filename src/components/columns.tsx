import { format } from 'date-fns'

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id' as const,
        disableFilters:true

    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name'  as const,
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name' as const,
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth' as const,
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy')},
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country' as const,
    },
    {
        Header: 'Phone',
        Footer: 'Id',
        accessor: 'phone' as const,
    },
    
]

export const GROUPED_COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id' as const
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name'  as const
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name' as const
            }
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Date of Birth',
                Footer: 'Date of Birth',
                accessor: 'date_of_birth' as const
            },
            {
                Header: 'Country',
                Footer: 'Country',
                accessor: 'country' as const
            },
            {
                Header: 'Phone',
                Footer: 'Id',
                accessor: 'phone' as const
            } 
        ]

    }
]
