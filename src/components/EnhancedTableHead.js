import React from "react";
import {TableHead, TableRow, TableCell, TableSortLabel} from "@material-ui/core";
import PropTypes from "prop-types";

const headCells = [
    { id: 'officeID', numeric: true, disablePadding: false, label: 'Office ID' },
    { id: 'officeName', numeric: true, disablePadding: false, label: 'Office Name' },
    { id: 'officeType', numeric: true, disablePadding: false, label: 'Office Type' },
    { id: 'creditLimit', numeric: true, disablePadding: false, label: 'Credit Limit' },
    { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
    { id: 'contact', numeric: true, disablePadding: false, label: 'Contact' },
    { id: 'created', numeric: true, disablePadding: false, label: 'Created' },
    { id: 'Action', numeric: true, disablePadding: false, label: 'Action' },
];

export default function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{background: 'cadetblue'}}>
                {
                    headCells.map(headCell => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {
                                    orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null
                                }
                            </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number,
};