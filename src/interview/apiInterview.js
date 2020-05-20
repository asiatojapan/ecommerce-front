import { API } from "../config";

export const getInterviewsByCompany = (userId, token) => {
    return fetch(`${API}/interviews/by/company/${userId}`, {
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
