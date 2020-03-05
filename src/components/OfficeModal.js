import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, TextField, Grid, Button} from '@material-ui/core';
import {connect} from "react-redux";
import { createOffice, editOffice } from '../store/actions/index';


const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textField: {
        width: '100%'
    },
    footer: {
        marginTop: '3rem',
        textAlign: 'right'
    },
    footerButton: {
        marginRight: '1rem'
    },
    error: {
        marginTop: '1rem',
        color: 'red'
    }
}));

function OfficeModal({isOpen, toggleModal, isEdit, editOffice, createOffice, selectedRow}) {
    const [state, setState] = useState({
        formData: {
            officeName: '',
            officeType: '',
            creditLimit: '',
            email: '',
            contact: '',
        },
        isError: false
    });

    useEffect(function () {
        if (isEdit){
            setState({...state, formData: selectedRow})
        }
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setState({...state, formData: {...state.formData, [name]: value}})
    }

    function handleSubmit() {
        const {id, officeName, officeType, creditLimit, contact} = state.formData;

        if (!officeName || !officeType || !creditLimit || !contact || !email){
            setState({...state, isError: true})
        } else {
            if (isEdit){
                editOffice(id, state.formData);
                toggleModal();
            } else {
                createOffice(state.formData);
                toggleModal();
            }
        }
    }

    const classes = useStyles();
    const {officeName, officeType, creditLimit, contact, email} = state.formData;

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isOpen}
                onClose={toggleModal}
            >
                <div className={classes.paper}>
                    <h3>{isEdit ? 'Edit Office' : 'Add Office'}</h3>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField type={'text'} className={classes.textField} name={'officeName'} value={officeName} onChange={handleChange} label="Office name" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField type={'text'} className={classes.textField} name={'officeType'} value={officeType} onChange={handleChange} label="Office type" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField type={'number'} className={classes.textField} name={'creditLimit'} value={creditLimit} onChange={handleChange} label="Credit limit" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField type={'email'} className={classes.textField} name={'email'} value={email} onChange={handleChange} label="email" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField type={'number'} className={classes.textField} name={'contact'} value={contact} onChange={handleChange} label="Contact" />
                            </Grid>
                        </Grid>
                        <div className={classes.error}>{state.isError && 'All fields are required'}</div>
                        <div className={classes.footer}>
                            <Button type={'button'} onClick={toggleModal} className={classes.footerButton} variant="contained">cancel</Button>
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default connect(null, { createOffice, editOffice })(OfficeModal)