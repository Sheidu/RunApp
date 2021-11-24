import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { Component } from "react";
import { HeadCell, SortableTableHeaderProps } from "../models/types";
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

class SortableTableHeader extends Component<SortableTableHeaderProps, unknown> {
    constructor(props: SortableTableHeaderProps) {
      super(props);

      this.onSort = this.onSort.bind(this);
    }

    onSort(event: React.MouseEvent<unknown>, property: keyof Training) {
      this.props.onHeaderClick(event, property);
    }
  
    render() {
      return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                <TableCell key={headCell.id} sortDirection={this.props.orderBy === headCell.id ? this.props.order : false}>
                  {headCell.isSortable ? (          
                    <TableSortLabel 
                        active={this.props.orderBy === headCell.id}
                        direction={this.props.orderBy === headCell.id ? this.props.order : 'asc'}
                        onClick={(e) => this.onSort(e, headCell.id)}
                    >
                        {headCell.label}
                            {this.props.orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {this.props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  }

  export default SortableTableHeader