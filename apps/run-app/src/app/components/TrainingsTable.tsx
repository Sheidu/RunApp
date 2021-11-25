import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useState } from "react";
import { SortableTableHeader } from "./SortableTableHeader";
import { EnmTrainingTypesLabel, Order } from "../models/types";
import { getComparator, stableSort } from "../utils/utils";
import { Training, EnmTrainingTypes } from "../models/Training";

interface TrainingsTableProps {
  filter: EnmTrainingTypes;
  trainings: Training[];
  onEdit: (selectedTraining: Training) => void;
  onDelete: (selectedTraining: Training) => void;
}

export function TrainingsTable(props:TrainingsTableProps) {
  const [order, setOrder] = useState({
    order: 'asc' as Order,
    orderBy: 'date'
  });

  const onSort = (event: React.MouseEvent<unknown>, property: keyof Training) => {
        const isAsc = order.orderBy === property && order.order === 'asc';
        setOrder({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        });
  }
    
  const typeUnknown = EnmTrainingTypes.UNKNOWN;
  const filter: EnmTrainingTypes = Number(props.filter);
  const selectAll = (filter === typeUnknown);
  const trainingsFilter = (type: EnmTrainingTypes) => (item: Training) : boolean => item.type === type;
  const filteredTrainings = (selectAll) ? props.trainings : props.trainings.filter(trainingsFilter(filter));

  return (
            <TableContainer component={Paper} sx={{marginTop:2}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <SortableTableHeader order={order.order} orderBy={order.orderBy} onHeaderClick={onSort} />
                <TableBody>
                  {stableSort<Training>(filteredTrainings, getComparator(order.order, order.orderBy as keyof Training))
                    .map( (t) => (
                    <TableRow>
                      <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                      <TableCell>{EnmTrainingTypesLabel.get(t.type)}</TableCell>
                      <TableCell>{t.distance}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => props.onEdit(t)}>Edit</Button>
                      </TableCell>
                      <TableCell><Button variant="outlined" onClick={() => props.onDelete(t)}>X</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>            
  );
}