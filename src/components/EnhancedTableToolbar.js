import React, {useState} from "react";
import PropTypes from "prop-types";
import {InputLabel, FormControl, OutlinedInput, Button, Grid} from "@material-ui/core";
import OfficeModal from "./OfficeModal";
import {connect} from "react-redux";
import {filterTable, loadOfficeList} from "../store/actions";

function EnhancedTableToolbar(props) {
    const [state, setState] = useState({
        isModalOpen: false,
        search:''
    });
    function handleModal() {
        setState({...state, isModalOpen: !state.isModalOpen})
    }
    function handleChange(e) {
        const {value} = e.target;
        setState({...state, search: value})
    }

    function resetTable() {
        setState({...state, search: ''})
        props.loadOfficeList()
    }
    function filterTable() {
        props.filterTable(state.search)
    }

    return (
        <Grid container spacing={1}>
            <Grid item md={2}>
                <FormControl variant="outlined" size={'small'}>
                    <InputLabel htmlFor="search">Office name / office Id</InputLabel>
                    <OutlinedInput
                        name="search"
                        value={state.search}
                        onChange={handleChange}
                        labelWidth={155}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4} md={1}>
                <Button onClick={filterTable} size={'small'} variant="contained" color="primary">
                    Search
                </Button>
            </Grid>
            <Grid item xs={4} md={1}>
                <Button onClick={resetTable} size={'small'} variant="contained">Reset</Button>
            </Grid>
            <Grid item xs={4} md={8} style={{ textAlign: 'right'}}>
                <Button onClick={handleModal} size={'small'} variant="contained" color="primary">
                    add
                </Button>
            </Grid>
            {
                state.isModalOpen &&
                <OfficeModal
                    isOpen={state.isModalOpen}
                    toggleModal={handleModal}
                />
            }
        </Grid>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default connect(null, { loadOfficeList, filterTable })(EnhancedTableToolbar);