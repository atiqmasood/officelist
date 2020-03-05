import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { loadOfficeList, deleteOffice } from "../store/actions";
import OfficeModal from "./OfficeModal";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        marginTop: '1rem'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function OfficeTableList(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        isModalOpen: false,
        selectedRow: {}
    });
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        props.loadOfficeList();
    }, []);

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    function handleRequestSort (event, property) {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    function handleChangePage (event, newPage) {
        setPage(newPage);
    };

    function handleChangeRowsPerPage (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleModal(selectedRow) {
        setState({...state, isModalOpen: !state.isModalOpen, selectedRow})
    }

    function deleteRow(row) {
        props.deleteOffice(row);
    }

    const isSelected = name => selected.indexOf(name) !== -1;
    const rows = props.officeList;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows && rows.length}
                        />
                        <TableBody>
                            {stableSort((rows || []), getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.officeName);

                                    return (
                                        <TableRow
                                            style={{background: `${index % 2 === 0 && 'aliceblue'}`}}
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell align="right">{row.id}</TableCell>
                                            <TableCell align="right">{row.officeName}</TableCell>
                                            <TableCell align="right">{row.officeType}</TableCell>
                                            <TableCell align="right">{row.creditLimit}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.contact}</TableCell>
                                            <TableCell align="right">{row.created}</TableCell>
                                            <TableCell align={'right'} style={{ display: 'flex' }}>
                                                <IconButton onClick={() => handleModal(row)} aria-label="edit">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => deleteRow(row)} aria-label="delete">
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={(rows && rows.length) || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {
                state.isModalOpen &&
                <OfficeModal
                    isOpen={state.isModalOpen}
                    toggleModal={handleModal}
                    isEdit={true}
                    selectedRow={state.selectedRow}
                />
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        officeList: state.reducers.list
    };
};

export default connect(mapStateToProps, { loadOfficeList, deleteOffice })(OfficeTableList);