import axios from 'axios';

export const loadOfficeList = () => dispatch => {
    axios.get('http://localhost:4000/api/list').then(response => {
        dispatch({
            type: 'LOAD_OFFICE_LIST',
            payload: response.data
        });
    }).catch(err => {
            console.log("handle error", err);
        })
};
export const createOffice = (data) => dispatch => {
    axios.post('http://localhost:4000/api/create', {office: data}).then(response => {
        dispatch({
            type: 'CREATE_OFFICE',
            payload: response.data
        });
    }).catch(err => {
            console.log("handle error", err);
        })
};
export const editOffice = (id, data) => dispatch => {
    axios.put(`http://localhost:4000/api/edit/${id}`, {office: data}).then(response => {
        dispatch({
            type: 'EDIT_OFFICE',
            payload: response.data
        });
    }).catch(err => {
            console.log("handle error", err);
        })
};
export const deleteOffice = (data) => dispatch => {
    axios.delete(`http://localhost:4000/api/delete/${data.id}`).then(response => {
        dispatch({
            type: 'DELETE_OFFICE',
            payload: response.data
        });
    }).catch(err => {
            console.log("handle error", err);
        })
};
export const filterTable = (data) => dispatch => {
    axios.post(`http://localhost:4000/api/filter`, {filterData: data}).then(response => {
        dispatch({
            type: 'LOAD_FILTER_LIST',
            payload: response.data
        });
    }).catch(err => {
            console.log("handle error", err);
        })
};