

const intialState = {
    isLoading: false
};

const reducers = (state = intialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOAD_OFFICE_LIST_STARTED':
            return {
                ...state,
                isLoading: true
            };
        case 'LOAD_OFFICE_LIST':
            return {
                ...state,
                isLoading: false,
                list: payload
            };
        case 'CREATE_OFFICE':
            return {
                ...state,
                isLoading: false,
                list: payload
            };
        case 'EDIT_OFFICE':
            return {
                ...state,
                isLoading: false,
                list: payload
            };
        case 'DELETE_OFFICE':
            return {
                ...state,
                isLoading: false,
                list: payload
            };
        case 'LOAD_FILTER_LIST':
            return {
                ...state,
                isLoading: false,
                list: payload
            };
        default:
            break;
    }

    return state;
};

export default reducers;
