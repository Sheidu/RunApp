import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Component } from "react";
import SortableTableHeader from "./SortableTableHeader";
import { EnmTrainingTypes, EnmTrainingTypesLabel, TrainingsTableProps, TrainingsTableState } from "../models/types";
import { getComparator, stableSort } from "../utils/utils";
import { Training } from "../models/Training";

class TrainingsTable extends Component<TrainingsTableProps, TrainingsTableState> {
    constructor(props: TrainingsTableProps) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'date'
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(event: React.MouseEvent<unknown>,
        property: keyof Training) {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        });
    }
    
    render() {
        const typeUnknown = EnmTrainingTypes.UNKNOWN;
        const filter: EnmTrainingTypes = Number(this.props.filter);
        const selectAll = (filter === typeUnknown);
        const trainingsFilter = (type: EnmTrainingTypes) => (item: Training) : boolean => item.type === type;
        const filteredTrainings = (selectAll) 
                                    ? this.props.trainings
                                    : this.props.trainings.filter(trainingsFilter(filter));

        return (
            <TableContainer component={Paper} sx={{marginTop:2}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <SortableTableHeader order={this.state.order} orderBy={this.state.orderBy} onHeaderClick={this.onSort} />
                <TableBody>
                  {stableSort<Training>(filteredTrainings, getComparator(this.state.order, this.state.orderBy))
                    .map( (t) => (
                    <TableRow>
                      <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                      <TableCell>{EnmTrainingTypesLabel.get(t.type)}</TableCell>
                      <TableCell>{t.distance}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => this.props.onEdit(t)}>Edit</Button>
                      </TableCell>
                      <TableCell><Button variant="outlined" onClick={() => this.props.onDelete(t)}>X</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>            
        );
    }
}

export default TrainingsTable