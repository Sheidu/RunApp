import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { HeadCell, Order } from "../models/types";
import { Training } from "../models/Training";

const headCells: readonly HeadCell[] = [
  {
    id: 'date',
    label: 'Date',
    isSortable: true
  },
  {
    id: 'type',
    label: 'Type',
    isSortable: false
  },
  {
    id: 'distance',
    label: 'Distance (km)',
    isSortable: true
  }
];

interface SortableTableHeaderProps {
  order: Order;
  orderBy: string;
  onHeaderClick: (event: React.MouseEvent<unknown>, property: keyof Training) => void;
}

export function SortableTableHeader(props: SortableTableHeaderProps) {
    const onSort = (event: React.MouseEvent<unknown>, property: keyof Training) => {
      props.onHeaderClick(event, property);
    }
  
      return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                <TableCell key={headCell.id} sortDirection={props.orderBy === headCell.id ? props.order : false}>
                  {headCell.isSortable ? (          
                    <TableSortLabel 
                        active={props.orderBy === headCell.id}
                        direction={props.orderBy === headCell.id ? props.order : 'asc'}
                        onClick={(e) => onSort(e, headCell.id)}
                    >
                        {headCell.label}
                            {props.orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                  ) : headCell.label}
                </TableCell>
                ))}
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
        </TableHead>    
      );
    
}