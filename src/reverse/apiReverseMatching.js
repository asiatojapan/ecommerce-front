import { API } from '../config';
import queryString from "query-string";


export const matchUser = (studentId, token, filters = {}) => {
    const data = {
        filters,
    };
    // console.log(data.filters)
    return fetch(`${API}/users/matching/${studentId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};