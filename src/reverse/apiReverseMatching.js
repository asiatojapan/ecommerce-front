import { API } from '../config';
import queryString from "query-string";


export const matchUser = (studentId, token) => {
    return fetch(`${API}/users/matching/${studentId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};