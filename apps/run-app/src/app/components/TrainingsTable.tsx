import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useMemo, useState } from "react";
import { SortableTableHeader } from "./SortableTableHeader";
import { Order } from "../models/types";
import { getComparator, stableSort } from "../utils/utils";
import { Training, EnmTrainingTypes } from "../models/Training";
import { TrainingsTableRow } from "./TrainingsTableRow";

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
  const sortedTrainings = useMemo(() => 
    stableSort<Training>(filteredTrainings, getComparator(order.order, order.orderBy as keyof Training)),
    [filteredTrainings, order.order, order.orderBy]
  );

  return (
            <TableContainer component={Paper} sx={{marginTop:2}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <SortableTableHeader order={order.order} orderBy={order.orderBy} onHeaderClick={onSort} />
                <TableBody>
                  {sortedTrainings.map( (t) => (
                    <TrainingsTableRow dataModel={t} onEdit={props.onEdit} onDelete={props.onDelete}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>            
  );
}